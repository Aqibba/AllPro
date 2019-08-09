// 引入koa的路由
import Router from 'koa-router'
// 引入Redis
import Redis from 'koa-redis'
// 引入nodeMailer, 开启服务的邮箱可以给其他注册用的邮箱发送验证码
import nodeMailer from 'nodemailer'
// 引入 用户模型, 验证模型, 邮箱模型, axios模型
import User from '../dbs/models/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'

// 定义一个前缀,访问所有这个文件时候会有 users这个前缀
let router = new Router({prefix: '/users'})
// 获取Redis的客户端
let Store = new Redis().client
// 定义注册接口
router.post('/signup', async (ctx) => {
  // 获取用户在此接口上传的数据
  const {username, password, email, code} = ctx.request.body;
  // 在redis中获取nodemail发送的验证码
  if (code) {
    // 取出保存的验证码和过期时间
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    // 输入框中的验证码和redis中存储的验证码是否相同
    if (code === saveCode) {
      // 时间是否过期
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
    // 没有填写验证码时
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }
  // 查询用户名是否被注册
  let user = await User.find({username})
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '已被注册'
    }
    return
  }
  // 创建有个新用户
  let nuser = await User.create({username, password, email})
  if (nuser) {
    // 成功注册, 并自动登录
    let res = await axios.post('/users/signin', {username, password})
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})
// 登录接口
router.post('/signin', async (ctx, next) => {
  // 调用passport的loacl策略
  return Passport.authenticate('local', function (err, user, info, status) {
    // passport中存在错误的时候, 返回错误信息
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    // 未出现错误的时候, 判断用户是否存在
    } else {
      // 有这个用户的时候
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        }
        // 登录
        return ctx.login(user)
        // 没有这个用户的时候
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})
// 验证码
router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username
  // 获取验证码过期时间
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  // 如果这个过期时间存在, 并未超出过期时间
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟内1次'
    }
    return false
  }
  // 发送邮件
  let transporter = nodeMailer.createTransport({
    // 主机的服务
    host: 'Email.smtp.host',
    // 监听的端口是否为587, 如果不是就监听其他端口
    port: 587,
    secure: false,
    // 创建SMTP服务的用户和授权码
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })
  // 对外发送信息
  let ko = {
    // 发送的验证码
    code: Email.smtp.code(),
    // 过期时间
    expire: Email.smtp.expire(),
    // 发给哪个邮箱
    email: ctx.request.body.email,
    // 开启了SMTP服务的邮箱
    user: ctx.request.body.username
  }
  // 邮件中显示的内容
  let mailOptions = {
    from: `"认证邮件" <${Email.smtp.user}>`,
    to: ko.email,
    // 主题
    subject: '注册码',
    html: `您的邀请码是${ko.code}`
  }
  // 发送
  await transporter.sendMail(mailOptions, (error, info) => {
    // 发送出现错误
    if (error) {
      return console.log(error)
    // 成功之后存储 发送的烟瘴吗 过期时间 邮箱
    } else {
      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延时，有效期1分钟'
  }
})
// 退出
router.get('/exit', async (ctx, next) => {
  // 注销
  await ctx.logout()
  // 二次验证, 查看是否成功注销
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})
// 获取用户名
router.get('/getUser', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const {username, email} = ctx.session.passport.user
    ctx.body = {
      user: username,
      email
    }
  } else {
    ctx.body = {
      user:'',
      email:''
    }
  }
})

export default router
