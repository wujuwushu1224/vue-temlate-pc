let baseUrl = ''
var env = process.env.NODE_ENV

console.log(env)

switch (env) {
  case 'development':
    baseUrl = 'http://172.28.20.5:9015' //这里是本地的请求url
    break
  case 'testing': 
    baseUrl = 'http://172.28.20.5:8080' // 测试环境打包url
    break
  case 'beta':
    baseUrl = 'http://10.28.20.5:9015' //预生产环境打包url
    break
  case 'production':
    baseUrl = 'http://www.xxx.com' //生产环境url
    break
}
console.log(baseUrl)
module.exports = {
  baseUrl,
}
