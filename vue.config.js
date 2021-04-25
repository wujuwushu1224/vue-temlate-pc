// Vue.config.js
const path = require('path')
const target = 'http://172.28.20.5:9015'
module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录
  lintOnSave: false, // eslint-loadear 是否在保存的时候检查
  devServer: {
    proxy: {
      '/api': {
        target,
        changeOrigin: true, // 允许websockets跨域
        // ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    } // 代理转发配置，用于调试环境
  }
}
