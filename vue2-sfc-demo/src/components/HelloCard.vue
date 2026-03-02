<template>
  <div class="card">
    <!-- 展示父组件传入的 username -->
    <h2 class="title">你好，{{ username }}！</h2>
    <p class="desc">这是一个 .vue 单文件组件（由 Vue CLI + Webpack 编译）</p>
    <button class="btn" @click="handleClick">点我打招呼</button>
    <p v-if="greeted" class="greeting">👋 {{ username }} 说：你好世界！</p>
  </div>
</template>

<script>
export default {
  name: 'HelloCard',

  props: {
    username: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      greeted: false
    }
  },

  methods: {
    handleClick() {
      this.greeted = true
      this.$emit('greet', this.username)
    }
  }
}
</script>

<!-- scoped：样式只作用于本组件，不影响 App.vue 的同名 .title -->
<style scoped>
.card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  margin: 16px 0;
  text-align: left;
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}

/* 与 App.vue 同名的 .title，scoped 隔离，互不干扰 */
.title {
  color: #0f172a;
  font-size: 1.1rem;
  margin-bottom: 6px;
}

.desc {
  color: #64748b;
  font-size: 0.82rem;
  margin-bottom: 14px;
}

.btn {
  background: #6366f1;
  color: white;
  border: none;
  padding: 8px 18px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.btn:hover {
  background: #4f46e5;
}

.greeting {
  margin-top: 12px;
  color: #10b981;
  font-weight: 600;
}
</style>