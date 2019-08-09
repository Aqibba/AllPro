// 封装axios方便前后台端通信
import axios from 'axios'
// 创建axios实例
const instance = axios.create({
  // 设置基础的URL, 判断当前的环境变量是不是本机, 如果host没有设置默认设置为本机, 环境变量的端口号是否设置, 没有设置就是3000
  baseURL:`http://${process.env.HOST||'localhost'}:${process.env.PORT||3000}`,
  // 超时
  timeout:2000,
  headers:{

  }
})

export default instance
