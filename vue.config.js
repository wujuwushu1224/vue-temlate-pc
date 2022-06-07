const path = require('path')
let baseUrl = process.env.VUE_APP_URL
console.log('------baseUrl--------')
console.log(baseUrl)

function resolve(dir) {
  return path.join(__dirname, dir)
}
// 导入compression-webpack-plugin
// const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  publicPath: './',
  // 输出目录
  outputDir: 'dist',
  lintOnSave: false,
  // 是否为生产环境构建生成 source map？

  productionSourceMap: false,
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
    config.externals({
      // 用cdn方式引入
      // vue: 'Vue',
      // 'element-ui': 'ElementUI',
      // echarts: 'echarts',
    })
  },
  configureWebpack: {
    performance: {
      hints: 'warning',
      //入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js')
      },
    },
    resolve: {
      // alias 配置
      alias: {
        '@': resolve('src'),
      },
    },
  },
  // CSS 相关选项
  css: {
    extract: true,
    // 是否开启 CSS source map？
    sourceMap: false,
    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/index.scss";`,
      },
    }, // 为所有的 CSS 及其预处理文件开启 CSS Modules。
  },

  // 在多核机器下会默认开启。
  // parallel: require('os').cpus().length > 1,
  // PWA 插件的选项。
  pwa: {},
  // 配置 webpack-dev-server 行为。
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: baseUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
