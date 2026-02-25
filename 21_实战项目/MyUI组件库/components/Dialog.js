/**
 * MyUI Dialog 对话框组件
 * 模态对话框，用于显示重要信息或需要用户确认的操作
 */

(function() {
    // 定义 Dialog 组件
    Vue.component('my-dialog', {
        props: {
            // 是否显示对话框（支持 .sync 修饰符）
            visible: {
                type: Boolean,
                default: false
            },
            // 对话框标题
            title: {
                type: String,
                default: '提示'
            },
            // 对话框宽度
            width: {
                type: String,
                default: '50%'
            },
            // 距离顶部的距离
            top: {
                type: String,
                default: '15vh'
            },
            // 是否显示关闭按钮
            showClose: {
                type: Boolean,
                default: true
            },
            // 点击遮罩是否关闭
            closeOnClickModal: {
                type: Boolean,
                default: true
            },
            // 按下 ESC 是否关闭
            closeOnEsc: {
                type: Boolean,
                default: true
            },
            // 是否显示底部按钮
            showFooter: {
                type: Boolean,
                default: true
            },
            // 确认按钮文本
            confirmText: {
                type: String,
                default: '确定'
            },
            // 取消按钮文本
            cancelText: {
                type: String,
                default: '取消'
            },
            // 确认按钮类型
            confirmType: {
                type: String,
                default: 'primary'
            },
            // 是否在关闭时销毁 DOM
            destroyOnClose: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                // 控制动画
                animating: false
            };
        },

        watch: {
            visible(val) {
                if (val) {
                    this.animating = true;
                    // 添加 ESC 键监听
                    if (this.closeOnEsc) {
                        document.addEventListener('keydown', this.handleEsc);
                    }
                    // 防止背景滚动
                    document.body.style.overflow = 'hidden';
                } else {
                    // 移除 ESC 键监听
                    document.removeEventListener('keydown', this.handleEsc);
                    // 恢复背景滚动
                    document.body.style.overflow = '';
                }
            }
        },

        methods: {
            // 关闭对话框
            close() {
                this.$emit('update:visible', false);
                this.$emit('close');
            },

            // 点击遮罩
            handleMaskClick() {
                if (this.closeOnClickModal) {
                    this.close();
                }
            },

            // 点击对话框内容（阻止冒泡）
            handleDialogClick(event) {
                event.stopPropagation();
            },

            // ESC 键关闭
            handleEsc(event) {
                if (event.key === 'Escape' || event.keyCode === 27) {
                    this.close();
                }
            },

            // 确认按钮点击
            handleConfirm() {
                this.$emit('confirm');
                // 如果父组件没有阻止，默认关闭
                this.$nextTick(() => {
                    if (this.visible) {
                        this.close();
                    }
                });
            },

            // 取消按钮点击
            handleCancel() {
                this.$emit('cancel');
                this.close();
            }
        },

        beforeDestroy() {
            // 组件销毁时清理
            document.removeEventListener('keydown', this.handleEsc);
            document.body.style.overflow = '';
        },

        template: `
            <transition name="my-dialog-fade">
                <div 
                    v-if="visible || !destroyOnClose"
                    v-show="visible"
                    class="my-dialog-wrapper"
                    @click="handleMaskClick"
                >
                    <transition name="my-dialog-zoom">
                        <div 
                            v-show="visible"
                            class="my-dialog"
                            :style="{ width: width, marginTop: top }"
                            @click="handleDialogClick"
                        >
                            <!-- 头部 -->
                            <div class="my-dialog__header">
                                <slot name="title">
                                    <span class="my-dialog__title">{{ title }}</span>
                                </slot>
                                <button 
                                    v-if="showClose"
                                    class="my-dialog__close"
                                    @click="close"
                                >
                                    ✕
                                </button>
                            </div>

                            <!-- 内容 -->
                            <div class="my-dialog__body">
                                <slot></slot>
                            </div>

                            <!-- 底部 -->
                            <div 
                                v-if="showFooter || $slots.footer"
                                class="my-dialog__footer"
                            >
                                <slot name="footer">
                                    <my-button @click="handleCancel">{{ cancelText }}</my-button>
                                    <my-button :type="confirmType" @click="handleConfirm">{{ confirmText }}</my-button>
                                </slot>
                            </div>
                        </div>
                    </transition>
                </div>
            </transition>
        `
    });

    // 注入样式
    const style = document.createElement('style');
    style.textContent = `
        /* 遮罩层 */
        .my-dialog-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: flex-start;
            z-index: 2000;
            overflow: auto;
            padding: 20px;
        }

        /* 对话框容器 */
        .my-dialog {
            position: relative;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            max-width: 90%;
            display: flex;
            flex-direction: column;
        }

        /* 头部 */
        .my-dialog__header {
            padding: 20px 20px 15px;
            border-bottom: 1px solid #e8eaec;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .my-dialog__title {
            font-size: 18px;
            font-weight: 600;
            color: #303133;
            line-height: 1;
        }

        .my-dialog__close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            font-size: 20px;
            color: #909399;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            transition: color 0.2s;
        }

        .my-dialog__close:hover {
            color: #409eff;
        }

        /* 内容 */
        .my-dialog__body {
            padding: 20px;
            color: #606266;
            font-size: 14px;
            line-height: 1.6;
            max-height: 60vh;
            overflow-y: auto;
        }

        /* 底部 */
        .my-dialog__footer {
            padding: 15px 20px 20px;
            border-top: 1px solid #e8eaec;
            text-align: right;
        }

        .my-dialog__footer .my-button {
            margin-left: 10px;
        }

        /* 遮罩层淡入淡出动画 */
        .my-dialog-fade-enter-active,
        .my-dialog-fade-leave-active {
            transition: opacity 0.3s;
        }

        .my-dialog-fade-enter,
        .my-dialog-fade-leave-to {
            opacity: 0;
        }

        /* 对话框缩放动画 */
        .my-dialog-zoom-enter-active,
        .my-dialog-zoom-leave-active {
            transition: all 0.3s;
        }

        .my-dialog-zoom-enter,
        .my-dialog-zoom-leave-to {
            opacity: 0;
            transform: scale(0.7);
        }

        /* 滚动条美化 */
        .my-dialog__body::-webkit-scrollbar {
            width: 6px;
        }

        .my-dialog__body::-webkit-scrollbar-thumb {
            background-color: #dcdfe6;
            border-radius: 3px;
        }

        .my-dialog__body::-webkit-scrollbar-thumb:hover {
            background-color: #c0c4cc;
        }

        /* 响应式 */
        @media screen and (max-width: 768px) {
            .my-dialog {
                width: 90% !important;
                margin-top: 10vh !important;
            }
        }
    `;
    document.head.appendChild(style);
})();
