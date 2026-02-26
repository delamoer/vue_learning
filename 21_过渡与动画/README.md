# 🎬 Chapter 20: Vue 过渡与动画

> 让你的 Vue 应用动起来

## 📁 文件列表

- **过渡与动画.html** - 完整的交互式学习页面（11 个实例）
- **学习指南.md** - 详细的学习路线和知识点总结

## 🎯 学习内容

### 核心知识点

1. **过渡系统基础**
   - `<transition>` 组件的使用
   - 过渡的 6 个类名机制
   - CSS transition vs CSS animation

2. **常见过渡效果**
   - 淡入淡出（Fade）
   - 滑动（Slide）
   - 缩放（Zoom）
   - 弹跳（Bounce）
   - 旋转（Rotate）
   - 翻转（Flip）

3. **高级特性**
   - 初始渲染过渡（appear）
   - 多元素过渡（mode）
   - 列表过渡（transition-group）
   - JavaScript 钩子

4. **实战应用**
   - 模态框动画
   - 列表增删动画
   - 性能优化技巧

## 🚀 快速开始

```bash
# 1. 打开学习页面
直接在浏览器中打开 过渡与动画.html

# 2. 阅读学习指南
查看 学习指南.md 了解学习路线
```

## 💡 核心代码示例

### 基础过渡
```html
<transition name="fade">
    <div v-if="show">内容</div>
</transition>
```

```css
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
```

### 列表过渡
```html
<transition-group name="list" tag="div">
    <div v-for="item in items" :key="item.id">
        {{ item.name }}
    </div>
</transition-group>
```

```css
.list-enter-active, .list-leave-active {
    transition: all 0.5s;
}
.list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
.list-move {
    transition: transform 0.5s;
}
```

### JavaScript 钩子
```html
<transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
>
    <div v-if="show">内容</div>
</transition>
```

```javascript
methods: {
    beforeEnter(el) {
        el.style.opacity = '0';
    },
    enter(el, done) {
        el.style.transition = 'opacity 0.5s';
        el.style.opacity = '1';
        setTimeout(done, 500);
    },
    afterEnter(el) {
        console.log('动画完成');
    }
}
```

## 📊 知识点覆盖

| 知识点 | 难度 | 重要性 | 实用性 |
|--------|------|--------|--------|
| 基础过渡 | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| CSS 动画 | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 列表过渡 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| JS 钩子 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |

## ⚠️ 重点注意

### 常见错误
1. ❌ 多元素过渡忘记设置 `key`
2. ❌ `transition-group` 的子元素没有 `key`
3. ❌ JS 钩子的 `enter`/`leave` 忘记调用 `done()`
4. ❌ 使用 `v-show` 期望初始过渡效果
5. ❌ 列表项使用 `display: inline` 导致移动过渡失效

### 性能优化
- ✅ 优先使用 `transform` 和 `opacity`
- ✅ 避免同时改变多个属性
- ✅ 合理设置过渡时长（0.2s - 0.5s）
- ✅ 纯 JS 动画使用 `:css="false"`

## 🎨 11 个完整示例

1. ✅ 淡入淡出 - 最常用效果
2. ✅ 滑动效果 - 侧边栏、抽屉
3. ✅ 缩放效果 - 模态框、弹出层
4. ✅ 弹跳效果 - 活泼的提示
5. ✅ 旋转淡入 - 图标、徽章
6. ✅ 翻转效果 - 卡片翻转
7. ✅ 初始渲染 - 页面加载动画
8. ✅ 多元素切换 - Tab、视图切换
9. ✅ 列表过渡 - 增删改查动画
10. ✅ JS 钩子 - 自定义控制
11. ✅ 模态框实战 - 综合应用

## 🎯 学习目标

完成本章后，你应该能够：
- [ ] 理解 Vue 过渡系统的工作原理
- [ ] 使用 CSS 创建各种过渡效果
- [ ] 实现复杂的列表动画
- [ ] 使用 JavaScript 钩子精确控制动画
- [ ] 为实际项目添加过渡效果
- [ ] 优化动画性能

## 📚 相关资源

- [Vue 官方文档 - 过渡](https://v2.cn.vuejs.org/v2/guide/transitions.html)
- [Animate.css](https://animate.style/) - 预设动画库
- [GSAP](https://greensock.com/gsap/) - 专业动画库

## 🔗 后续学习

学完本章后，建议：
1. 为 **MyUI 组件库**添加过渡效果
2. 开发 **VueAdmin 后台管理系统**
3. 学习 **Vue Router**（路由切换动画）
4. 探索更多动画库和技巧

---

**预计学习时长**：2-3 小时  
**难度等级**：⭐⭐⭐☆☆  
**更新日期**：2026-02-25
