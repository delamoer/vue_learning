<template>
  <div id="app">
    <h1 class="title">🎉 Vue 2 SFC 启动成功！</h1>
    <p class="subtitle">欢迎来到单文件组件的世界（Vue CLI + Webpack）</p>

    <!-- 使用子组件，通过 prop 传入 username -->
    <HelloCard username="Alice" @greet="onGreet" />
    <HelloCard username="Bob"   @greet="onGreet" />

    <p v-if="lastGreeter" class="log">📋 最近打招呼的是：{{ lastGreeter }}</p>
  </div>
</template>

<script>
import HelloCard from './components/HelloCard.vue'

export default {
  name: 'App',
  components: { HelloCard },
  data() {
    return {
      lastGreeter: ''
    }
  },
  methods: {
    onGreet(name) {
      this.lastGreeter = name
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Segoe UI', 'PingFang SC', sans-serif;
  max-width: 600px;
  margin: 60px auto;
  text-align: center;
  padding: 0 20px;
}

.title {
  font-size: 1.8rem;
  color: #6366f1;
  margin-bottom: 8px;
}

.subtitle {
  color: #94a3b8;
  margin-bottom: 32px;
  font-size: 0.95rem;
}

.log {
  margin-top: 16px;
  color: #6366f1;
  font-size: 0.9rem;
}
</style>
