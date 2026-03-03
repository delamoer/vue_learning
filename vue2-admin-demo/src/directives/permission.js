/**
 * v-permission 自定义指令
 *
 * 用法：
 *   <el-button v-permission="['admin', 'superAdmin']">删除</el-button>
 *
 * 效果：当前用户角色不在数组中时，移除该 DOM 元素
 *
 * 知识点：自定义指令 bind 钩子 + Vuex store 访问
 */

import store from '@/store'

const permission = {
  // bind：指令第一次绑定到元素时调用
  bind(el, binding) {
    const { value: requiredRoles } = binding

    if (!requiredRoles || !requiredRoles.length) return

    const userRoles = store.getters['auth/roles']

    // 判断当前用户是否具备任一所需角色
    const hasPermission = userRoles.some(role => requiredRoles.includes(role))

    if (!hasPermission) {
      // 没有权限：将元素从 DOM 中移除（而非仅隐藏，防止用户通过 CSS 绕过）
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}

export default permission
