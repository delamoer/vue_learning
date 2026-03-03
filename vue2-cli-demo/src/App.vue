<template>
  <div id="app">
    <AppHeader />
    <main class="main-content">
      <transition name="page" mode="out-in">
        <router-view :key="$route.path" />
      </transition>
    </main>
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'

export default {
  name: 'App',
  components: { AppHeader }
}
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: #e6edf3;
}

.main-content {
  flex: 1;
  padding: $spacing-lg;
  max-width: $content-max-width;
  width: 100%;
  margin: 0 auto;

  @include mobile {
    padding: $spacing-md;
  }
}
</style>
