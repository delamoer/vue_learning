import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import router from './router'
import store from './store'

import '@/styles/index.scss'

import permission from '@/directives/permission'

// 全局注册自定义指令
Vue.directive('permission', permission)

// 使用 Element UI（中文语言包为默认）
Vue.use(ElementUI, { size: 'small' })

// 关闭生产环境提示
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
