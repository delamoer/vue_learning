<template>
  <div class="style-view">
    <h1>🎨 CSS 预处理器与样式系统</h1>
    <p class="subtitle">Sass 变量可视化、Mixin 效果演示、::v-deep 深度穿透</p>

    <!-- 颜色变量 -->
    <div class="card mt-md">
      <h2>🌈 颜色变量（variables.scss）</h2>
      <div class="color-grid">
        <div v-for="color in colors" :key="color.key" class="color-card">
          <div class="color-swatch" :style="{ background: color.value }"></div>
          <div class="color-info">
            <span class="color-name">{{ color.key }}</span>
            <span class="color-hex">{{ color.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 间距变量 -->
    <div class="card mt-md">
      <h2>📏 间距变量（$spacing-*）</h2>
      <div class="spacing-demo">
        <div v-for="sp in spacings" :key="sp.name" class="spacing-row">
          <span class="sp-name font-mono">{{ sp.name }}</span>
          <div class="sp-bar" :style="{ width: sp.px + 'px' }"></div>
          <span class="sp-val">{{ sp.px }}px</span>
        </div>
      </div>
    </div>

    <!-- Mixin 演示 -->
    <div class="card mt-md">
      <h2>🔧 Mixin 演示</h2>
      <div class="grid-2">

        <!-- ellipsis -->
        <div>
          <h3>@include ellipsis</h3>
          <div class="demo-ellipsis">
            这是一段很长的文字内容，超出容器宽度后会被省略号截断，不会换行
          </div>
          <div class="code-block"><pre>@include ellipsis</pre></div>
        </div>

        <!-- flex-center -->
        <div>
          <h3>@include flex-center</h3>
          <div class="demo-flex-center">
            <span>水平且垂直居中</span>
          </div>
          <div class="code-block"><pre>@include flex-center</pre></div>
        </div>

        <!-- line-clamp -->
        <div>
          <h3>@include line-clamp(2)</h3>
          <div class="demo-clamp">
            这是一段多行文字演示。Mixin 接受行数参数，通过 webkit-line-clamp
            实现多行省略效果，超出指定行数自动截断并显示省略号。
          </div>
          <div class="code-block"><pre>@include line-clamp(2)</pre></div>
        </div>

        <!-- card shadow -->
        <div>
          <h3>@include card()</h3>
          <div class="demo-card-mixin">
            这是一个使用 card() mixin 的提示框，带圆角和 border 样式
          </div>
          <div class="code-block"><pre>@include card($spacing-md)</pre></div>
        </div>
      </div>
    </div>

    <!-- v-deep 演示 -->
    <div class="card mt-md">
      <h2>🎯 ::v-deep 深度选择器演示</h2>
      <p class="tip">
        scoped 样式无法直接作用于子组件，需要用 <code>::v-deep</code> 穿透
      </p>
      <div class="grid-2">
        <div>
          <h3>普通 scoped（无效）</h3>
          <div class="deep-wrapper-fail">
            <div class="inner-box">无法被父组件 scoped 样式修改</div>
          </div>
        </div>
        <div>
          <h3>::v-deep（有效）</h3>
          <div class="deep-wrapper-ok">
            <div class="inner-box">被 ::v-deep 成功穿透修改</div>
          </div>
        </div>
      </div>
      <div class="code-block mt-sm">
        <pre>{{ deepCode }}</pre>
      </div>
    </div>

    <!-- Sass 特性速查 -->
    <div class="card mt-md">
      <h2>📚 Sass 特性速查表</h2>
      <div class="code-block">
        <pre>{{ sassCheatsheet }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StyleView',
  data() {
    return {
      colors: [
        { key: '$primary',    value: '#42b983' },
        { key: '$success',    value: '#3fb950' },
        { key: '$info',       value: '#79c0ff' },
        { key: '$warning',    value: '#e3b341' },
        { key: '$danger',     value: '#f85149' },
        { key: '$text-base',  value: '#e6edf3' },
        { key: '$text-muted', value: '#8b949e' },
        { key: '$bg-card',    value: '#161b22' },
        { key: '$bg-page',    value: '#0d1117' }
      ],
      spacings: [
        { name: '$spacing-xs', px: 4  },
        { name: '$spacing-sm', px: 8  },
        { name: '$spacing-md', px: 16 },
        { name: '$spacing-lg', px: 24 },
        { name: '$spacing-xl', px: 40 }
      ],
      deepCode: `/* ❌ 普通 scoped 无法深度穿透 */
.deep-wrapper-fail .inner-box { color: red; }

/* ✅ ::v-deep 可以穿透 scoped 边界 */
.deep-wrapper-ok ::v-deep .inner-box {
  background: rgba(#42b983, 0.15);
  border-color: #42b983;
  color: #42b983;
}`,
      sassCheatsheet: `// 变量
$primary: #42b983;
$spacing-md: 16px;

// 嵌套
.nav { .item { color: $primary; } }

// Mixin（带参数）
@mixin card($p: 16px) {
  padding: $p;
  border-radius: 8px;
  border: 1px solid $border-color;
}

// 继承
.btn-primary { @extend .btn; background: $primary; }

// 函数
.dark { background: darken($primary, 20%); }

// 条件
@mixin size($n) {
  @if $n == 'sm' { font-size: 12px; }
  @else if $n == 'lg' { font-size: 18px; }
}

// 响应式（项目内置 mixin）
.box {
  width: 100%;
  @include tablet { width: 50%; }
  @include desktop { width: 33%; }
}`
    }
  }
}
</script>

<style lang="scss" scoped>
h1 { font-size: $font-size-xxl; color: $primary; margin-bottom: $spacing-xs; }
.subtitle { color: $text-muted; margin-bottom: $spacing-md; }
h2 { color: $info; font-size: $font-size-lg; margin-bottom: $spacing-sm; }
h3 { font-size: $font-size-md; color: $text-base; margin-bottom: $spacing-xs; font-weight: 600; }

// 颜色色卡
.color-grid {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-sm;
}

.color-card {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  background: rgba(255,255,255,0.03);
  border: 1px solid $border-color;
  border-radius: $radius-md;
  padding: 8px 12px;
  min-width: 200px;

  .color-swatch {
    width: 32px;
    height: 32px;
    border-radius: $radius-sm;
    flex-shrink: 0;
    border: 1px solid rgba(255,255,255,0.1);
  }

  .color-name { font-size: $font-size-sm; color: $info; font-family: 'Consolas', monospace; display: block; }
  .color-hex  { font-size: $font-size-xs; color: $text-muted; font-family: 'Consolas', monospace; }
}

// 间距演示
.spacing-demo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.spacing-row {
  @include flex-vcenter;
  gap: $spacing-sm;

  .sp-name { width: 120px; color: $info; font-size: $font-size-sm; }
  .sp-bar  { height: 20px; background: $primary; border-radius: 3px; opacity: 0.7; min-width: 4px; }
  .sp-val  { color: $text-muted; font-size: $font-size-sm; }
}

// Mixin 演示
.demo-ellipsis {
  @include ellipsis;
  background: rgba($info, 0.08);
  border: 1px solid $border-color;
  border-radius: $radius-sm;
  padding: $spacing-sm;
  color: $text-base;
  margin-bottom: $spacing-sm;
}

.demo-flex-center {
  @include flex-center;
  height: 80px;
  background: rgba($primary, 0.08);
  border: 1px dashed $primary;
  border-radius: $radius-sm;
  margin-bottom: $spacing-sm;
  color: $primary;
  font-weight: 600;
}

.demo-clamp {
  @include line-clamp(2);
  background: rgba($warning, 0.08);
  border: 1px solid $border-color;
  border-radius: $radius-sm;
  padding: $spacing-sm;
  color: $text-base;
  margin-bottom: $spacing-sm;
}

.demo-card-mixin {
  @include card($spacing-md);
  color: $text-base;
  margin-bottom: $spacing-sm;
}

// v-deep 演示
.inner-box {
  padding: $spacing-sm;
  border: 1px solid $border-color;
  border-radius: $radius-sm;
  margin-top: $spacing-xs;
  color: $text-muted;
}

// v-deep 生效
.deep-wrapper-ok ::v-deep .inner-box {
  background: rgba($primary, 0.1);
  border-color: $primary;
  color: $primary;
}
</style>
