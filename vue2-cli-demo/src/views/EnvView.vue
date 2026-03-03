<template>
  <div class="env-view">
    <h1>🔑 环境变量与模式</h1>
    <p class="subtitle">演示 .env 文件的工作原理和 process.env 的使用方式</p>

    <!-- 当前环境标注 -->
    <div class="env-banner card" :style="{ borderColor: envColor }">
      <div class="env-indicator" :style="{ background: envColor }"></div>
      <div>
        <div class="env-name">当前环境：{{ envLabel }}</div>
        <div class="env-node">NODE_ENV = {{ nodeEnv }}</div>
      </div>
    </div>

    <!-- 所有环境变量展示 -->
    <div class="card mt-md">
      <h2>📋 当前所有 VUE_APP_* 变量</h2>
      <p class="tip">
        只有以 <code>VUE_APP_</code> 开头的变量才会被注入到客户端代码中
      </p>
      <div class="vars-grid">
        <div v-for="v in envVars" :key="v.key" class="var-row">
          <span class="var-key font-mono">{{ v.key }}</span>
          <span class="var-eq">=</span>
          <span class="var-val font-mono" :class="v.type">{{ v.value }}</span>
        </div>
      </div>
    </div>

    <!-- .env 文件对比 -->
    <div class="card mt-md">
      <h2>📄 .env 文件内容对比</h2>
      <div class="grid-3">
        <div v-for="env in envFiles" :key="env.name" class="env-file">
          <div class="file-name">{{ env.name }}</div>
          <div class="code-block">
            <pre>{{ env.content }}</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 代码示例 -->
    <div class="card mt-md">
      <h2>💡 在代码中使用环境变量</h2>
      <div class="code-block">
        <pre>{{ codeExample }}</pre>
      </div>
    </div>

    <!-- 规则速查 -->
    <div class="card mt-md">
      <h2>⚠️ 变量命名规则</h2>
      <table class="rules-table">
        <thead>
          <tr>
            <th>变量名</th>
            <th>客户端可见？</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rule in namingRules" :key="rule.name">
            <td class="font-mono">{{ rule.name }}</td>
            <td>
              <span :class="rule.visible ? 'badge-green' : 'badge-red'" class="rule-badge">
                {{ rule.visible ? '✅ 可见' : '❌ 不可见' }}
              </span>
            </td>
            <td>{{ rule.note }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EnvView',
  data() {
    return {
      envFiles: [
        {
          name: '.env.development',
          content: `NODE_ENV=development
VUE_APP_API_BASE_URL=http://localhost:3000/api
VUE_APP_ENV_LABEL=Development
VUE_APP_ENABLE_MOCK=true
VUE_APP_LOG_LEVEL=debug`
        },
        {
          name: '.env.production',
          content: `NODE_ENV=production
VUE_APP_API_BASE_URL=https://api.example.com
VUE_APP_ENV_LABEL=Production
VUE_APP_ENABLE_MOCK=false
VUE_APP_LOG_LEVEL=error`
        },
        {
          name: '.env.staging',
          content: `NODE_ENV=production
VUE_APP_API_BASE_URL=https://staging-api.example.com
VUE_APP_ENV_LABEL=Staging
VUE_APP_ENABLE_MOCK=false
VUE_APP_LOG_LEVEL=info`
        }
      ],
      namingRules: [
        { name: 'VUE_APP_API_URL', visible: true, note: 'VUE_APP_ 前缀，注入到客户端' },
        { name: 'NODE_ENV', visible: true, note: 'Vue CLI 内置，始终可访问' },
        { name: 'BASE_URL', visible: true, note: 'Vue CLI 内置（publicPath 的值）' },
        { name: 'DB_PASSWORD', visible: false, note: '无 VUE_APP_ 前缀，仅 Node.js 进程可访问' },
        { name: 'SECRET_KEY', visible: false, note: '无 VUE_APP_ 前缀，不会暴露给浏览器' }
      ],
      codeExample: `// src/api/index.js
const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL  // ✅
})

// 条件代码
if (process.env.VUE_APP_ENABLE_MOCK === 'true') {
  // 仅开发环境加载 mock 数据
  require('@/mock')
}

// 模板中也可使用（通过 computed）
export default {
  computed: {
    apiBase() { return process.env.VUE_APP_API_BASE_URL }
  }
}`
    }
  },
  computed: {
    nodeEnv() { return process.env.NODE_ENV },
    envLabel() { return process.env.VUE_APP_ENV_LABEL },
    envColor() { return process.env.VUE_APP_ENV_COLOR || '#666' },
    envVars() {
      return [
        { key: 'NODE_ENV',               value: process.env.NODE_ENV,                   type: 'type-node' },
        { key: 'BASE_URL',               value: process.env.BASE_URL,                   type: 'type-builtin' },
        { key: 'VUE_APP_APP_TITLE',      value: process.env.VUE_APP_APP_TITLE,          type: 'type-app' },
        { key: 'VUE_APP_VERSION',        value: process.env.VUE_APP_VERSION,            type: 'type-app' },
        { key: 'VUE_APP_API_BASE_URL',   value: process.env.VUE_APP_API_BASE_URL,       type: 'type-app' },
        { key: 'VUE_APP_ENV_LABEL',      value: process.env.VUE_APP_ENV_LABEL,          type: 'type-app' },
        { key: 'VUE_APP_ENABLE_MOCK',    value: process.env.VUE_APP_ENABLE_MOCK,        type: 'type-app' },
        { key: 'VUE_APP_LOG_LEVEL',      value: process.env.VUE_APP_LOG_LEVEL,          type: 'type-app' },
        { key: 'VUE_APP_ENABLE_DEVTOOLS',value: process.env.VUE_APP_ENABLE_DEVTOOLS,    type: 'type-app' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
h1 { font-size: $font-size-xxl; color: $primary; margin-bottom: $spacing-xs; }
.subtitle { color: $text-muted; margin-bottom: $spacing-md; }
h2 { color: $info; font-size: $font-size-lg; margin-bottom: $spacing-sm; }

.env-banner {
  @include flex-vcenter;
  gap: $spacing-md;
  padding: $spacing-md;
  border-width: 2px;

  .env-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .env-name { font-size: $font-size-lg; font-weight: 700; color: #e6edf3; }
  .env-node { font-size: $font-size-sm; color: $text-muted; font-family: 'Consolas', monospace; }
}

.vars-grid {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.var-row {
  @include flex-vcenter;
  gap: $spacing-sm;
  padding: 6px $spacing-sm;
  border-radius: $radius-sm;
  background: rgba(255,255,255,0.02);
  font-size: $font-size-sm;

  .var-key { color: $info; width: 220px; flex-shrink: 0; }
  .var-eq  { color: $text-muted; }
  .var-val {
    color: $success;
    &.type-node    { color: $primary; }
    &.type-builtin { color: $warning; }
  }
}

.env-file {
  .file-name {
    font-family: 'Consolas', monospace;
    font-size: $font-size-sm;
    color: $warning;
    margin-bottom: $spacing-xs;
    font-weight: 600;
  }
}

.rules-table {
  width: 100%;
  border-collapse: collapse;
  font-size: $font-size-sm;

  th {
    background: rgba(255,255,255,0.04);
    border: 1px solid $border-color;
    padding: 8px 12px;
    color: $info;
    text-align: left;
  }

  td {
    border: 1px solid $border-color;
    padding: 8px 12px;
    color: $text-muted;
  }

  tr:nth-child(even) td { background: rgba(255,255,255,0.02); }
}

.rule-badge {
  padding: 2px 8px;
  border-radius: 10px;
  font-size: $font-size-xs;
  font-weight: 600;
}
.badge-green { background: rgba($success, 0.12); color: $success; }
.badge-red   { background: rgba($danger, 0.12);  color: $danger;  }
</style>
