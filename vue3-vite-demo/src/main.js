// ★ Vue 3 入口写法
// 对比 Vue 2：new Vue({ render: h => h(App) }).$mount('#app')
// Vue 3 改为：createApp(App).mount('#app')
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
