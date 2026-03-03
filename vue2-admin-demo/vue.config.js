const { defineConfig } = require('@vue/cli-service')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

module.exports = defineConfig({
  transpileDependencies: true,

  // 生产环境关闭 source map
  productionSourceMap: false,

  devServer: {
    port: 8084,
    open: true,
    // 代理：将 /api 请求转发到后端
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },

  css: {
    loaderOptions: {
      sass: {
        // 自动注入全局变量和 mixin，无需每个组件手动 @import
        additionalData: `
          @import "@/styles/variables.scss";
          @import "@/styles/mixins.scss";
        `
      }
    }
  },

  chainWebpack(config) {
    // 动态 HTML 标题
    config.plugin('html').tap(args => {
      args[0].title = process.env.VUE_APP_TITLE || 'Vue Admin'
      return args
    })

    // 生产环境去除 console
    if (isProd) {
      config.optimization.minimizer('terser').tap(options => {
        options[0].terserOptions.compress.drop_console = true
        return options
      })
    }

    // @ 别名
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
  }
})
