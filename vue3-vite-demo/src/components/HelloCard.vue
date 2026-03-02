<template>
  <div class="card">
    <!-- 功能与 vue2-sfc-demo/HelloCard.vue 完全一致 -->
    <h2 class="title">你好，{{ username }}！</h2>
    <p class="desc">这是一个 .vue 单文件组件（由 Vite + @vitejs/plugin-vue 编译）</p>
    <button class="btn" @click="handleClick">点我打招呼</button>
    <p v-if="greeted" class="greeting">👋 {{ username }} 说：你好世界！</p>
  </div>
</template>

<script>
export default {
  name: 'HelloCard',

  // ★ Vue 3 新增：建议显式声明组件向外 emit 的事件
  // Vue 2 中不需要这一行，这是 Vue 3 的规范改进
  emits: ['greet'],

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

<!-- scoped 在 Vite 中原理完全相同，效果一致 -->
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
  margin-top: 10px;
  color: #6366f1;
  font-size: 0.9rem;
}
</style>
