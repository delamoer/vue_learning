<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://vitejs.dev" target="_blank" rel="noopener">Vite documentation</a>
      and
      <a href="https://vuejs.org" target="_blank" rel="noopener">Vue 3 documentation</a>.
    </p>
    <h3>Tooling</h3>
    <ul>
      <li><a href="https://vitejs.dev" target="_blank" rel="noopener">Vite（构建工具）</a></li>
      <li><a href="https://github.com/vitejs/vite-plugin-vue" target="_blank" rel="noopener">@vitejs/plugin-vue</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">Vue Router</a></li>
      <li><a href="https://pinia.vuejs.org" target="_blank" rel="noopener">Pinia（状态管理）</a></li>
      <li><a href="https://vueuse.org" target="_blank" rel="noopener">VueUse（组合式工具集）</a></li>
    </ul>
  </div>
</template>

<script>
// ★ Vue 3 Options API 写法与 Vue 2 完全相同
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
