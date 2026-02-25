/**
 * MyUI Form 表单组件
 * 包含 Form 和 FormItem 两个组件
 * 演示 $parent 和 $children 的实际应用场景
 */

(function() {
    // 简单的验证规则实现
    const validators = {
        // 必填验证
        required(rule, value) {
            if (!value || value.toString().trim() === '') {
                return rule.message || '该字段为必填项';
            }
            return '';
        },
        
        // 最小长度验证
        minLength(rule, value) {
            if (value && value.length < rule.min) {
                return rule.message || `最少输入 ${rule.min} 个字符`;
            }
            return '';
        },
        
        // 最大长度验证
        maxLength(rule, value) {
            if (value && value.length > rule.max) {
                return rule.message || `最多输入 ${rule.max} 个字符`;
            }
            return '';
        },
        
        // 邮箱验证
        email(rule, value) {
            if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                return rule.message || '请输入正确的邮箱格式';
            }
            return '';
        },
        
        // 手机号验证
        phone(rule, value) {
            if (value && !/^1[3-9]\d{9}$/.test(value)) {
                return rule.message || '请输入正确的手机号';
            }
            return '';
        },
        
        // 自定义验证器
        validator(rule, value) {
            if (rule.validator && typeof rule.validator === 'function') {
                return rule.validator(rule, value) || '';
            }
            return '';
        }
    };

    // Form 组件
    Vue.component('my-form', {
        props: {
            // 表单数据对象
            model: {
                type: Object,
                required: true
            },
            // 表单验证规则
            rules: {
                type: Object,
                default: () => ({})
            },
            // 标签宽度
            labelWidth: {
                type: String,
                default: '80px'
            },
            // 标签位置
            labelPosition: {
                type: String,
                default: 'right',
                validator: (value) => ['left', 'right', 'top'].includes(value)
            },
            // 表单尺寸
            size: {
                type: String,
                default: 'medium',
                validator: (value) => ['large', 'medium', 'small', 'mini'].includes(value)
            }
        },

        // 使用 provide 向下传递数据（另一种组件通信方式）
        provide() {
            return {
                myForm: this
            };
        },

        methods: {
            // 验证整个表单
            validate(callback) {
                // 通过 $children 获取所有 FormItem 子组件
                const formItems = this.$children.filter(child => child.$options.name === 'MyFormItem');
                
                if (formItems.length === 0) {
                    callback && callback(true);
                    return Promise.resolve(true);
                }

                let valid = true;
                let count = 0;
                const errors = [];

                formItems.forEach(item => {
                    item.validate((itemValid, error) => {
                        if (!itemValid) {
                            valid = false;
                            errors.push({ prop: item.prop, message: error });
                        }
                        count++;

                        // 所有 FormItem 都验证完成
                        if (count === formItems.length) {
                            callback && callback(valid, errors);
                        }
                    });
                });

                return new Promise((resolve) => {
                    const checkInterval = setInterval(() => {
                        if (count === formItems.length) {
                            clearInterval(checkInterval);
                            resolve(valid);
                        }
                    }, 10);
                });
            },

            // 验证指定字段
            validateField(prop, callback) {
                const formItem = this.$children.find(
                    child => child.$options.name === 'MyFormItem' && child.prop === prop
                );
                
                if (formItem) {
                    formItem.validate(callback);
                }
            },

            // 重置表单
            resetFields() {
                // 通过 $children 获取所有 FormItem
                this.$children
                    .filter(child => child.$options.name === 'MyFormItem')
                    .forEach(item => item.resetField());
            },

            // 清空验证信息
            clearValidate(props) {
                const formItems = this.$children.filter(child => child.$options.name === 'MyFormItem');
                
                if (props) {
                    const propsArray = Array.isArray(props) ? props : [props];
                    formItems
                        .filter(item => propsArray.includes(item.prop))
                        .forEach(item => item.clearValidate());
                } else {
                    formItems.forEach(item => item.clearValidate());
                }
            }
        },

        template: `
            <div class="my-form" :class="'my-form--label-' + labelPosition">
                <slot></slot>
            </div>
        `
    });

    // FormItem 组件
    Vue.component('my-form-item', {
        name: 'MyFormItem',
        
        // 使用 inject 接收 Form 传递的数据（另一种方式）
        inject: ['myForm'],

        props: {
            // 表单域 model 字段
            prop: {
                type: String
            },
            // 标签文本
            label: {
                type: String
            },
            // 标签宽度
            labelWidth: {
                type: String
            },
            // 是否必填（显示红色星号）
            required: {
                type: Boolean,
                default: false
            },
            // 表单域验证错误信息
            error: {
                type: String
            }
        },

        data() {
            return {
                validateState: '', // success, error, validating
                validateMessage: '',
                initialValue: null
            };
        },

        computed: {
            // 获取标签宽度
            computedLabelWidth() {
                return this.labelWidth || this.myForm.labelWidth;
            },

            // 获取当前字段的值（通过 $parent 访问 Form 的 model）
            fieldValue() {
                if (!this.prop) return null;
                return this.myForm.model[this.prop];
            },

            // 获取当前字段的验证规则（通过 $parent 访问 Form 的 rules）
            fieldRules() {
                if (!this.prop) return [];
                const rules = this.myForm.rules[this.prop];
                return rules ? (Array.isArray(rules) ? rules : [rules]) : [];
            },

            // 是否显示必填星号
            isRequired() {
                if (this.required) return true;
                return this.fieldRules.some(rule => rule.required);
            }
        },

        mounted() {
            // 保存初始值，用于重置
            if (this.prop) {
                this.initialValue = this.fieldValue;
            }

            // 监听字段值变化，自动验证
            this.$watch('fieldValue', () => {
                if (this.validateState === 'error') {
                    this.validate();
                }
            });
        },

        methods: {
            // 验证当前字段
            validate(callback) {
                if (!this.prop || this.fieldRules.length === 0) {
                    callback && callback(true);
                    return true;
                }

                this.validateState = 'validating';
                const value = this.fieldValue;
                
                // 依次执行所有验证规则
                for (let rule of this.fieldRules) {
                    let error = '';

                    // 根据规则类型执行对应的验证器
                    if (rule.required) {
                        error = validators.required(rule, value);
                    } else if (rule.min !== undefined) {
                        error = validators.minLength(rule, value);
                    } else if (rule.max !== undefined) {
                        error = validators.maxLength(rule, value);
                    } else if (rule.type === 'email') {
                        error = validators.email(rule, value);
                    } else if (rule.type === 'phone') {
                        error = validators.phone(rule, value);
                    } else if (rule.validator) {
                        error = validators.validator(rule, value);
                    }

                    if (error) {
                        this.validateState = 'error';
                        this.validateMessage = error;
                        callback && callback(false, error);
                        return false;
                    }
                }

                this.validateState = 'success';
                this.validateMessage = '';
                callback && callback(true);
                return true;
            },

            // 重置字段
            resetField() {
                this.validateState = '';
                this.validateMessage = '';
                
                if (this.prop) {
                    // 恢复初始值（直接修改父组件的 model）
                    this.myForm.model[this.prop] = this.initialValue;
                }
            },

            // 清空验证信息
            clearValidate() {
                this.validateState = '';
                this.validateMessage = '';
            }
        },

        template: `
            <div 
                class="my-form-item"
                :class="{
                    'is-error': validateState === 'error',
                    'is-success': validateState === 'success',
                    'is-required': isRequired
                }"
            >
                <label 
                    v-if="label" 
                    class="my-form-item__label"
                    :style="{ width: computedLabelWidth }"
                >
                    {{ label }}
                </label>
                <div class="my-form-item__content">
                    <slot></slot>
                    <transition name="my-form-error">
                        <div v-if="validateState === 'error'" class="my-form-item__error">
                            {{ validateMessage || error }}
                        </div>
                    </transition>
                </div>
            </div>
        `
    });

    // 注入样式
    const style = document.createElement('style');
    style.textContent = `
        /* Form 样式 */
        .my-form {
            font-size: 14px;
        }

        /* FormItem 样式 */
        .my-form-item {
            margin-bottom: 22px;
            display: flex;
            align-items: flex-start;
        }

        .my-form-item__label {
            text-align: right;
            padding-right: 12px;
            line-height: 32px;
            color: #606266;
            flex-shrink: 0;
        }

        /* 必填星号 */
        .my-form-item.is-required .my-form-item__label::before {
            content: '*';
            color: #f56c6c;
            margin-right: 4px;
        }

        .my-form-item__content {
            flex: 1;
            position: relative;
        }

        /* 错误提示 */
        .my-form-item__error {
            color: #f56c6c;
            font-size: 12px;
            line-height: 1;
            padding-top: 4px;
            position: absolute;
            top: 100%;
            left: 0;
        }

        /* 错误状态 */
        .my-form-item.is-error .my-input input,
        .my-form-item.is-error .my-input textarea {
            border-color: #f56c6c;
        }

        /* 成功状态 */
        .my-form-item.is-success .my-input input,
        .my-form-item.is-success .my-input textarea {
            border-color: #67c23a;
        }

        /* 标签在上方 */
        .my-form--label-top .my-form-item {
            flex-direction: column;
        }

        .my-form--label-top .my-form-item__label {
            text-align: left;
            padding-right: 0;
            padding-bottom: 8px;
            line-height: 1.5;
        }

        /* 标签在左侧 */
        .my-form--label-left .my-form-item__label {
            text-align: left;
        }

        /* 错误提示动画 */
        .my-form-error-enter-active,
        .my-form-error-leave-active {
            transition: all 0.3s;
        }

        .my-form-error-enter,
        .my-form-error-leave-to {
            opacity: 0;
            transform: translateY(-5px);
        }
    `;
    document.head.appendChild(style);
})();
