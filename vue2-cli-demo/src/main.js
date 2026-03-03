import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 全局样式（reset + base + transition）
import '@/styles/index.scss'

// 全局配置
Vue.config.productionTip = false
Vue.config.devtools = process.env.VUE_APP_ENABLE_DEVTOOLS === 'true'

// 日志器（开发调试）
import logger from '@/utils/logger'
logger.info(`应用启动 | 环境: ${process.env.VUE_APP_ENV_LABEL} | API: ${process.env.VUE_APP_API_BASE_URL}`)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
