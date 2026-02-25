# 🎨 MyUI 组件库

> 一个基于 Vue 2 开发的轻量级 UI 组件库

## 📦 组件列表

### 基础组件
- [x] Button 按钮
- [x] Input 输入框
- [ ] Icon 图标

### 容器组件
- [x] Card 卡片
- [x] Dialog 对话框
- [ ] Container 布局容器

### 表单组件
- [x] Form / FormItem 表单
- [ ] Checkbox / Radio 选择框
- [ ] Select 下拉选择

### 高级组件
- [x] Table 表格
- [ ] Tabs / TabPane 标签页
- [ ] Pagination 分页

## 🎯 设计原则

1. **简洁易用** - API 设计清晰，上手简单
2. **高度可定制** - 支持灵活的样式和行为配置
3. **性能优先** - 合理使用函数式组件等优化手段
4. **最佳实践** - 遵循 Vue 组件开发最佳实践

## 📚 学习目标

通过开发这个组件库，掌握：
- ✅ 组件封装与复用
- ✅ props 验证与默认值
- ✅ 插槽的灵活运用
- ✅ 组件通信（$parent/$children, provide/inject）
- ✅ 性能优化（函数式组件）

## 🚀 使用方式

打开 `index.html` 查看组件演示和使用文档。

## ⚠️ 开发避坑指南（重要！）

### 🚨 最易踩坑的错误：updated 钩子死循环

**问题描述：**
在开发 Table 组件时遇到页面无响应、一直"加载中"的问题。

**错误代码：**
```javascript
// ❌ 导致死循环的代码
Vue.component('my-table', {
  data() {
    return { columns: [] }
  },
  mounted() {
    this.updateColumns();  // 修改 columns
  },
  updated() {
    this.updateColumns();  // ❌ 又修改 columns → 触发 updated → 无限循环
  },
  methods: {
    updateColumns() {
      this.columns = [...];  // 修改响应式数据
    }
  }
});
```

**问题根源：**
- `updated()` 在任何数据变化后都会触发
- 在 `updated` 中修改响应式数据 → 触发重新渲染 → 再次调用 `updated` → 死循环

**症状：**
- 页面无法显示内容，一直处于加载状态
- 浏览器 CPU 占用 100%，标签页冻结
- 控制台无报错信息（静默失败）

**解决方案：**
```javascript
// ✅ 正确做法：只在 mounted 中初始化
Vue.component('my-table', {
  mounted() {
    this.updateColumns();  // 只初始化一次
  },
  // ✅ 删除 updated 钩子
  methods: {
    updateColumns() {
      this.columns = [...];
    }
  }
});
```

**核心原则：**
- ✅ `mounted`：适合初始化和 DOM 操作
- ✅ `watch`：监听特定数据变化
- ❌ `updated`：不要修改响应式数据！只做 DOM 读取操作

**延伸阅读：**
详见 `17_生命周期钩子/生命周期钩子.html` 中的"常见注意事项和陷阱"章节。

---

## 📝 开发日志

- 2026-02-25: 项目初始化，开始开发 Button 组件
- 2026-02-25: 完成所有 6 个核心组件（Button, Input, Card, Dialog, Form, Table）
- 2026-02-25: 修复 Table 组件 updated 死循环问题
