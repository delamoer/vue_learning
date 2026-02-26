/**
 * MyUI Input 组件
 * 
 * 功能特性：
 * - 支持 v-model 双向绑定
 * - 支持多种类型（text、password、textarea、number等）
 * - 支持可清空、显示密码切换
 * - 支持前缀、后缀、图标
 * - 支持字数限制和计数显示
 * - 支持禁用、只读状态
 * - 支持尺寸控制
 */

// ==================== Input 输入框组件 ====================
Vue.component('my-input', {
    name: 'MyInput',
    
    props: {
        // v-model 绑定的值
        value: {
            type: [String, Number],
            default: ''
        },
        
        // 输入框类型
        type: {
            type: String,
            default: 'text'
        },
        
        // 尺寸
        size: {
            type: String,
            default: 'medium',
            validator(value) {
                return ['large', 'medium', 'small', 'mini'].includes(value);
            }
        },
        
        // 占位文本
        placeholder: {
            type: String,
            default: '请输入内容'
        },
        
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false
        },
        
        // 是否只读
        readonly: {
            type: Boolean,
            default: false
        },
        
        // 是否可清空
        clearable: {
            type: Boolean,
            default: false
        },
        
        // 是否显示密码切换按钮
        showPassword: {
            type: Boolean,
            default: false
        },
        
        // 前缀图标
        prefixIcon: {
            type: String,
            default: ''
        },
        
        // 后缀图标
        suffixIcon: {
            type: String,
            default: ''
        },
        
        // 最大长度
        maxlength: {
            type: Number,
            default: null
        },
        
        // 是否显示字数统计
        showWordLimit: {
            type: Boolean,
            default: false
        },
        
        // 文本域行数
        rows: {
            type: Number,
            default: 2
        },
        
        // 自适应高度（仅 textarea）
        autosize: {
            type: [Boolean, Object],
            default: false
        }
    },
    
    data() {
        return {
            // 当前输入框的实际类型（用于密码显示切换）
            currentType: this.type,
            // 是否聚焦
            focused: false,
            // 是否显示清空按钮
            showClear: false
        };
    },
    
    computed: {
        // 输入框的 class 列表
        inputClass() {
            return [
                'my-input',
                `my-input--${this.size}`,
                {
                    'is-disabled': this.disabled,
                    'is-readonly': this.readonly,
                    'my-input--prefix': this.prefixIcon || this.$slots.prefix,
                    'my-input--suffix': this.suffixIcon || this.$slots.suffix || this.clearable || this.showPassword
                }
            ];
        },
        
        // 是否是文本域
        isTextarea() {
            return this.type === 'textarea';
        },
        
        // 字数统计文本
        textLength() {
            return String(this.value).length;
        },
        
        // 是否显示字数超限
        isExceed() {
            return this.maxlength && this.textLength > this.maxlength;
        }
    },
    
    watch: {
        value(newVal) {
            // 更新显示清空按钮的状态
            this.updateShowClear(newVal);
        }
    },
    
    methods: {
        // 输入事件处理
        handleInput(event) {
            let value = event.target.value;
            
            // 如果有最大长度限制
            if (this.maxlength && value.length > this.maxlength) {
                value = value.slice(0, this.maxlength);
                event.target.value = value;
            }
            
            // 触发 input 事件，实现 v-model
            this.$emit('input', value);
        },
        
        // 失焦事件
        handleBlur(event) {
            this.focused = false;
            this.$emit('blur', event);
        },
        
        // 聚焦事件
        handleFocus(event) {
            this.focused = true;
            this.$emit('focus', event);
        },
        
        // 清空输入内容
        handleClear() {
            this.$emit('input', '');
            this.$emit('clear');
            this.$refs.input.focus();
        },
        
        // 切换密码显示
        handlePasswordVisible() {
            this.currentType = this.currentType === 'password' ? 'text' : 'password';
            this.$nextTick(() => {
                this.$refs.input.focus();
            });
        },
        
        // 更新清空按钮显示状态
        updateShowClear(value) {
            this.showClear = this.clearable && 
                            !this.disabled && 
                            !this.readonly && 
                            value !== '' && 
                            value !== null &&
                            this.focused;
        },
        
        // 暴露 focus 方法
        focus() {
            this.$refs.input.focus();
        },
        
        // 暴露 blur 方法
        blur() {
            this.$refs.input.blur();
        }
    },
    
    template: `
        <div :class="inputClass">
            <!-- 文本域 -->
            <textarea
                v-if="isTextarea"
                ref="input"
                class="my-input__inner"
                :value="value"
                :placeholder="placeholder"
                :disabled="disabled"
                :readonly="readonly"
                :maxlength="maxlength"
                :rows="rows"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
            ></textarea>
            
            <!-- 普通输入框 -->
            <template v-else>
                <!-- 前缀内容 -->
                <span v-if="prefixIcon || $slots.prefix" class="my-input__prefix">
                    <slot name="prefix">
                        <span v-if="prefixIcon" class="my-input__icon">{{ prefixIcon }}</span>
                    </slot>
                </span>
                
                <!-- 输入框 -->
                <input
                    ref="input"
                    class="my-input__inner"
                    :type="currentType"
                    :value="value"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    :readonly="readonly"
                    :maxlength="maxlength"
                    @input="handleInput"
                    @focus="handleFocus"
                    @blur="handleBlur"
                />
                
                <!-- 后缀内容 -->
                <span v-if="suffixIcon || $slots.suffix || showClear || showPassword" class="my-input__suffix">
                    <!-- 清空按钮 -->
                    <span
                        v-if="showClear && showClear"
                        class="my-input__icon my-input__clear"
                        @click="handleClear"
                    >✕</span>
                    
                    <!-- 密码显示切换 -->
                    <span
                        v-else-if="showPassword"
                        class="my-input__icon my-input__password"
                        @click="handlePasswordVisible"
                    >{{ currentType === 'password' ? '👁' : '👁‍🗨' }}</span>
                    
                    <!-- 后缀图标 -->
                    <slot name="suffix">
                        <span v-if="suffixIcon" class="my-input__icon">{{ suffixIcon }}</span>
                    </slot>
                </span>
            </template>
            
            <!-- 字数统计 -->
            <span v-if="showWordLimit && maxlength" class="my-input__count">
                <span :class="{'is-exceed': isExceed}">{{ textLength }}</span> / {{ maxlength }}
            </span>
        </div>
    `
});


// ==================== 样式定义 ====================
(function() {
    const style = document.createElement('style');
    style.textContent = `
        /* ===== 基础输入框样式 ===== */
        .my-input {
            position: relative;
            font-size: 14px;
            display: inline-block;
            width: 100%;
        }

        .my-input__inner {
            width: 100%;
            height: 40px;
            line-height: 40px;
            padding: 0 15px;
            font-size: inherit;
            color: #606266;
            background-color: #fff;
            background-image: none;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            box-sizing: border-box;
            transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
            outline: none;
        }

        .my-input__inner:hover {
            border-color: #c0c4cc;
        }

        .my-input__inner:focus {
            outline: none;
            border-color: #409eff;
            box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
        }

        .my-input__inner::placeholder {
            color: #c0c4cc;
        }

        /* ===== 文本域样式 ===== */
        textarea.my-input__inner {
            height: auto;
            line-height: 1.5;
            padding: 5px 15px;
            resize: vertical;
        }

        /* ===== 尺寸 ===== */
        .my-input--large .my-input__inner {
            height: 48px;
            line-height: 48px;
            font-size: 16px;
        }

        .my-input--medium .my-input__inner {
            height: 40px;
            line-height: 40px;
            font-size: 14px;
        }

        .my-input--small .my-input__inner {
            height: 32px;
            line-height: 32px;
            font-size: 13px;
        }

        .my-input--mini .my-input__inner {
            height: 28px;
            line-height: 28px;
            font-size: 12px;
        }

        /* ===== 前缀后缀 ===== */
        .my-input--prefix .my-input__inner {
            padding-left: 35px;
        }

        .my-input--suffix .my-input__inner {
            padding-right: 35px;
        }

        .my-input__prefix,
        .my-input__suffix {
            position: absolute;
            height: 100%;
            top: 0;
            display: flex;
            align-items: center;
            color: #c0c4cc;
            transition: all 0.3s;
        }

        .my-input__prefix {
            left: 10px;
        }

        .my-input__suffix {
            right: 10px;
        }

        .my-input__icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .my-input__clear,
        .my-input__password {
            color: #c0c4cc;
            font-size: 14px;
            cursor: pointer;
            transition: color 0.2s;
        }

        .my-input__clear:hover,
        .my-input__password:hover {
            color: #909399;
        }

        /* ===== 字数统计 ===== */
        .my-input__count {
            position: absolute;
            bottom: 5px;
            right: 10px;
            color: #909399;
            background: #fff;
            font-size: 12px;
            line-height: 1;
        }

        .my-input__count .is-exceed {
            color: #f56c6c;
        }

        /* ===== 禁用状态 ===== */
        .my-input.is-disabled .my-input__inner {
            background-color: #f5f7fa;
            border-color: #e4e7ed;
            color: #c0c4cc;
            cursor: not-allowed;
        }

        .my-input.is-disabled .my-input__inner::placeholder {
            color: #c0c4cc;
        }

        .my-input.is-disabled .my-input__icon {
            cursor: not-allowed;
        }

        /* ===== 只读状态 ===== */
        .my-input.is-readonly .my-input__inner {
            background-color: #f5f7fa;
            cursor: default;
        }
    `;
    document.head.appendChild(style);
})();
