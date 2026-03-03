const { defineConfig } = require('@vue/cli-service')

const isProd = process.env.NODE_ENV === 'production'

module.exports = defineConfig({
  // ① 应用基础路径
  publicPath: '/',

  // ② 生产环境关闭 source map（减小包体积）
  productionSourceMap: !isProd,

  // ③ 开发服务器配置
  devServer: {
    port: 8083,
    open: false
  },

  // ④ 自动转译 node_modules（按需）
  transpileDependencies: false,

  // ⑤ CSS 配置：全局注入 Sass 变量
  css: {
    loaderOptions: {
      sass: {
        // 每个组件的 <style lang="scss"> 自动注入全局变量和 mixin
        additionalData: `
          @import "@/styles/variables.scss";
          @import "@/styles/mixins.scss";
        `
      }
    }
  },

  // ⑥ Webpack 链式配置
  chainWebpack(config) {
    // 设置 HTML 标题
    config.plugin('html').tap(args => {
      args[0].title = process.env.VUE_APP_APP_TITLE || 'Vue CLI Demo'
      return args
    })

    // 生产环境配置
    if (isProd) {
      // 删除 console（生产包中）
      config.optimization.minimizer('terser').tap(args => {
        args[0].terserOptions = {
          ...args[0].terserOptions,
          compress: {
            ...args[0].terserOptions?.compress,
            drop_console: true,
            drop_debugger: true
          }
        }
        return args
      })
    }
  }
})
