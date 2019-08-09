export default {
  dbs: 'mongodb://127.0.0.1:27017/mtreg',
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379
    }
  },
  // smtp 服务
  smtp: {
    // 主机
    get host() {
      return 'smtp.qq.com'
    },
    // 开启服务的账号
    get user() {
      return '379205186@qq.com'
    },
    // 开启服务账号的授权码
    get pass() {
      return 'zwytfunzcuwxbgch'
    },
    // 生成邮箱验证码
    get code() {
      return () => {
        // 将随机生成的随机数转换成为16进制字符串,截取四位转为大写,当做验证码
        return Math.random().toString(16).slice(2, 6).toUpperCase()
      }
    },
    // 过期时间
    get expire() {
      return () => {
        return new Date().getTime() + 60 * 60 * 1000
      }
    }
  }
}
