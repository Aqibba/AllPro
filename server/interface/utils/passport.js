// 验证文件

// koa-passort和本地策略
import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
// 用户模型
import UserModel from '../../dbs/models/users'

passport.use(new LocalStrategy(async function(username, password, done) {
  // 查询条件
  let where = {
    username
  }
  // 查找数据
  let result = await UserModel.findOne(where)
  // 当查出的用户名不为空时
  if (result != null) {
    // 当查询出的密码和输入框中的密码相同时
    if (result.password === password) {
      return done(null, result)
    // 查询出的密码和输入的密码不一致
    } else {
      return done(null, false, '密码错误')
    }
  // 查询不到输入的用户名
  } else {
    return done(null, false, '用户不存在')
  }
}))
// 序列化, 用户通过登录验证之后将用户的信息存储在session中
passport.serializeUser(function(user, done) {
  done(null, user)
})
// 反序列化, 在每次请求的时候从session中读取用户的信息
passport.deserializeUser(function(user, done) {
  return done(null, user)
})

export default passport
