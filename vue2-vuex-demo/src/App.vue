<!-- App.vue -->
<template>
  <div id="app">
    <NavBar />
    <main class="main-content">
      <router-view />
    </main>

    <!-- 全局 Toast 提示 -->
    <transition name="toast">
      <div
        v-if="toast.show"
        class="toast"
        :class="'toast-' + toast.type"
      >{{ toast.msg }}</div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'App',
  components: { NavBar },
  computed: {
    ...mapState(['toast'])
  }
}
</script>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: #f5f7fa;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: #333;
  line-height: 1.6;
}

#app { min-height: 100vh; display: flex; flex-direction: column; }

.main-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px;
  width: 100%;
  flex: 1;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 28px;
  border-radius: 24px;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  z-index: 9999;
  color: #fff;
}
.toast-success { background: #22c55e; }
.toast-error   { background: #ef4444; }
.toast-warning { background: #f59e0b; }

.toast-enter-active, .toast-leave-active { transition: all .3s ease; }
.toast-enter, .toast-leave-to { opacity: 0; bottom: 16px; }

/* 通用卡片样式 */
.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.08);
  padding: 24px;
  margin-bottom: 20px;
}
.card-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
}

/* 按钮 */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity .15s, transform .1s;
}
.btn:hover   { opacity: .88; }
.btn:active  { transform: scale(.97); }
.btn-primary { background: #3b82f6; color: #fff; }
.btn-danger  { background: #ef4444; color: #fff; }
.btn-success { background: #22c55e; color: #fff; }
.btn-outline { background: transparent; border: 1.5px solid #3b82f6; color: #3b82f6; }
.btn-sm { padding: 5px 12px; font-size: 0.8rem; }
.btn:disabled { opacity: .5; cursor: not-allowed; }
</style>
