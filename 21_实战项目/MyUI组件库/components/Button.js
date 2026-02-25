/**
 * MyUI Button 组件
 * 
 * 功能特性：
 * - 支持多种类型（default, primary, success, warning, danger, info）
 * - 支持多种尺寸（large, medium, small, mini）
 * - 支持禁用、加载、朴素、圆角等状态
 * - 支持图标
 * - 支持按钮组
 */

// ==================== Button 按钮组件 ====================
Vue.component('my-button', {
    name: 'MyButton',
    
    props: {
        // 按钮类型
        type: {
            type: String,
            default: 'default',
            validator(value) {
                return ['default', 'primary', 'success', 'warning', 'danger', 'info'].includes(value);
            }
        },
        
        // 按钮尺寸
        size: {
            type: String,
            default: 'medium',
            validator(value) {
                return ['large', 'medium', 'small', 'mini'].includes(value);
            }
        },
        
        // 是否为朴素按钮
        plain: {
            type: Boolean,
            default: false
        },
        
        // 是否为圆角按钮
        round: {
            type: Boolean,
            default: false
        },
        
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false
        },
        
        // 是否加载中
        loading: {
            type: Boolean,
            default: false
        },
        
        // 图标
        icon: {
            type: String,
            default: ''
        }
    },
    
    computed: {
        // 按钮的 class 列表
        buttonClass() {
            return [
                'my-button',
                `my-button--${this.type}`,
                `my-button--${this.size}`,
                {
                    'is-plain': this.plain,
                    'is-round': this.round,
                    'is-disabled': this.disabled || this.loading,
                    'is-loading': this.loading
                }
            ];
        }
    },
    
    methods: {
        handleClick(event) {
            // 禁用或加载状态下不触发点击事件
            if (this.disabled || this.loading) {
                event.preventDefault();
                return;
            }
            // 触发父组件的 click 事件
            this.$emit('click', event);
        }
    },
    
    template: `
        <button
            class="my-button"
            :class="buttonClass"
            :disabled="disabled || loading"
            @click="handleClick"
        >
            <span v-if="loading" class="my-button__loading">⏳</span>
            <span v-if="icon && !loading" class="my-button__icon">{{ icon }}</span>
            <span v-if="$slots.default" class="my-button__text">
                <slot></slot>
            </span>
        </button>
    `
});


// ==================== ButtonGroup 按钮组组件 ====================
Vue.component('my-button-group', {
    name: 'MyButtonGroup',
    
    template: `
        <div class="my-button-group">
            <slot></slot>
        </div>
    `
});


// ==================== 样式定义 ====================
(function() {
    const style = document.createElement('style');
    style.textContent = `
        /* ===== 基础按钮样式 ===== */
        .my-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
            height: 40px;
            white-space: nowrap;
            cursor: pointer;
            border: 1px solid #dcdfe6;
            color: #606266;
            background: #fff;
            text-align: center;
            box-sizing: border-box;
            outline: none;
            margin: 0;
            transition: all 0.1s;
            font-weight: 500;
            padding: 12px 20px;
            font-size: 14px;
            border-radius: 4px;
            user-select: none;
        }

        .my-button:hover,
        .my-button:focus {
            color: #409eff;
            border-color: #c6e2ff;
            background-color: #ecf5ff;
        }

        .my-button:active {
            transform: scale(0.98);
        }

        /* ===== 按钮内部元素 ===== */
        .my-button__icon {
            margin-right: 5px;
            font-size: 1.1em;
        }

        .my-button__loading {
            margin-right: 5px;
            font-size: 1.1em;
            animation: rotate 1.5s linear infinite;
        }

        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .my-button__text {
            display: inline-block;
        }

        /* ===== 按钮类型 ===== */
        /* Primary 主要按钮 */
        .my-button--primary {
            color: #fff;
            background-color: #409eff;
            border-color: #409eff;
        }

        .my-button--primary:hover,
        .my-button--primary:focus {
            background: #66b1ff;
            border-color: #66b1ff;
            color: #fff;
        }

        /* Success 成功按钮 */
        .my-button--success {
            color: #fff;
            background-color: #67c23a;
            border-color: #67c23a;
        }

        .my-button--success:hover,
        .my-button--success:focus {
            background: #85ce61;
            border-color: #85ce61;
            color: #fff;
        }

        /* Warning 警告按钮 */
        .my-button--warning {
            color: #fff;
            background-color: #e6a23c;
            border-color: #e6a23c;
        }

        .my-button--warning:hover,
        .my-button--warning:focus {
            background: #ebb563;
            border-color: #ebb563;
            color: #fff;
        }

        /* Danger 危险按钮 */
        .my-button--danger {
            color: #fff;
            background-color: #f56c6c;
            border-color: #f56c6c;
        }

        .my-button--danger:hover,
        .my-button--danger:focus {
            background: #f78989;
            border-color: #f78989;
            color: #fff;
        }

        /* Info 信息按钮 */
        .my-button--info {
            color: #fff;
            background-color: #909399;
            border-color: #909399;
        }

        .my-button--info:hover,
        .my-button--info:focus {
            background: #a6a9ad;
            border-color: #a6a9ad;
            color: #fff;
        }

        /* ===== 按钮尺寸 ===== */
        .my-button--large {
            height: 48px;
            padding: 12px 24px;
            font-size: 16px;
        }

        .my-button--medium {
            height: 40px;
            padding: 10px 20px;
            font-size: 14px;
        }

        .my-button--small {
            height: 32px;
            padding: 8px 15px;
            font-size: 12px;
        }

        .my-button--mini {
            height: 28px;
            padding: 6px 12px;
            font-size: 12px;
        }

        /* ===== 朴素按钮 ===== */
        .my-button.is-plain {
            background: #fff;
        }

        .my-button--primary.is-plain {
            color: #409eff;
            background: #ecf5ff;
            border-color: #b3d8ff;
        }

        .my-button--primary.is-plain:hover,
        .my-button--primary.is-plain:focus {
            background: #409eff;
            border-color: #409eff;
            color: #fff;
        }

        .my-button--success.is-plain {
            color: #67c23a;
            background: #f0f9ff;
            border-color: #c2e7b0;
        }

        .my-button--success.is-plain:hover,
        .my-button--success.is-plain:focus {
            background: #67c23a;
            border-color: #67c23a;
            color: #fff;
        }

        .my-button--warning.is-plain {
            color: #e6a23c;
            background: #fdf6ec;
            border-color: #f5dab1;
        }

        .my-button--warning.is-plain:hover,
        .my-button--warning.is-plain:focus {
            background: #e6a23c;
            border-color: #e6a23c;
            color: #fff;
        }

        .my-button--danger.is-plain {
            color: #f56c6c;
            background: #fef0f0;
            border-color: #fbc4c4;
        }

        .my-button--danger.is-plain:hover,
        .my-button--danger.is-plain:focus {
            background: #f56c6c;
            border-color: #f56c6c;
            color: #fff;
        }

        .my-button--info.is-plain {
            color: #909399;
            background: #f4f4f5;
            border-color: #d3d4d6;
        }

        .my-button--info.is-plain:hover,
        .my-button--info.is-plain:focus {
            background: #909399;
            border-color: #909399;
            color: #fff;
        }

        /* ===== 圆角按钮 ===== */
        .my-button.is-round {
            border-radius: 20px;
            padding: 12px 23px;
        }

        /* ===== 禁用状态 ===== */
        .my-button.is-disabled,
        .my-button.is-disabled:hover,
        .my-button.is-disabled:focus {
            color: #c0c4cc;
            cursor: not-allowed;
            background-image: none;
            background-color: #fff;
            border-color: #ebeef5;
        }

        .my-button--primary.is-disabled,
        .my-button--primary.is-disabled:hover,
        .my-button--primary.is-disabled:focus {
            color: #fff;
            background-color: #a0cfff;
            border-color: #a0cfff;
        }

        .my-button--success.is-disabled,
        .my-button--success.is-disabled:hover,
        .my-button--success.is-disabled:focus {
            color: #fff;
            background-color: #b3e19d;
            border-color: #b3e19d;
        }

        .my-button--warning.is-disabled,
        .my-button--warning.is-disabled:hover,
        .my-button--warning.is-disabled:focus {
            color: #fff;
            background-color: #f3d19e;
            border-color: #f3d19e;
        }

        .my-button--danger.is-disabled,
        .my-button--danger.is-disabled:hover,
        .my-button--danger.is-disabled:focus {
            color: #fff;
            background-color: #fab6b6;
            border-color: #fab6b6;
        }

        .my-button--info.is-disabled,
        .my-button--info.is-disabled:hover,
        .my-button--info.is-disabled:focus {
            color: #fff;
            background-color: #c8c9cc;
            border-color: #c8c9cc;
        }

        /* ===== 加载状态 ===== */
        .my-button.is-loading {
            position: relative;
            pointer-events: none;
        }

        /* ===== 按钮组 ===== */
        .my-button-group {
            display: inline-flex;
            vertical-align: middle;
        }

        .my-button-group .my-button {
            margin: 0;
            border-radius: 0;
        }

        .my-button-group .my-button:first-child {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
        }

        .my-button-group .my-button:last-child {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
        }

        .my-button-group .my-button:not(:first-child) {
            margin-left: -1px;
        }

        .my-button-group .my-button:hover,
        .my-button-group .my-button:focus {
            z-index: 1;
        }

        .my-button-group .my-button:active {
            z-index: 2;
        }
    `;
    document.head.appendChild(style);
})();
