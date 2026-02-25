/**
 * MyUI Card 组件
 * 
 * 功能特性：
 * - 支持标题、副标题
 * - 支持头部插槽
 * - 支持阴影控制
 * - 支持边框控制
 * - 支持内边距控制
 */

// ==================== Card 卡片组件 ====================
Vue.component('my-card', {
    name: 'MyCard',
    
    props: {
        // 卡片标题
        title: {
            type: String,
            default: ''
        },
        
        // 卡片副标题
        subtitle: {
            type: String,
            default: ''
        },
        
        // 阴影效果
        shadow: {
            type: String,
            default: 'always',
            validator(value) {
                return ['always', 'hover', 'never'].includes(value);
            }
        },
        
        // 是否显示边框
        border: {
            type: Boolean,
            default: true
        },
        
        // 内边距
        bodyPadding: {
            type: String,
            default: '20px'
        },
        
        // 头部样式
        headerStyle: {
            type: Object,
            default: () => ({})
        },
        
        // 主体样式
        bodyStyle: {
            type: Object,
            default: () => ({})
        }
    },
    
    computed: {
        // 卡片的 class 列表
        cardClass() {
            return [
                'my-card',
                this.border ? 'is-bordered' : 'is-borderless',
                `is-${this.shadow}-shadow`
            ];
        },
        
        // 主体的样式
        bodyStyleObject() {
            return {
                padding: this.bodyPadding,
                ...this.bodyStyle
            };
        }
    },
    
    template: `
        <div :class="cardClass">
            <!-- 卡片头部 -->
            <div 
                v-if="title || subtitle || $slots.header" 
                class="my-card__header"
                :style="headerStyle"
            >
                <slot name="header">
                    <div class="my-card__title">{{ title }}</div>
                    <div v-if="subtitle" class="my-card__subtitle">{{ subtitle }}</div>
                </slot>
            </div>
            
            <!-- 卡片主体 -->
            <div class="my-card__body" :style="bodyStyleObject">
                <slot></slot>
            </div>
            
            <!-- 卡片底部 -->
            <div v-if="$slots.footer" class="my-card__footer">
                <slot name="footer"></slot>
            </div>
        </div>
    `
});


// ==================== 样式定义 ====================
(function() {
    const style = document.createElement('style');
    style.textContent = `
        /* ===== 基础卡片样式 ===== */
        .my-card {
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            color: #303133;
            transition: all 0.3s;
            box-sizing: border-box;
        }

        /* ===== 边框 ===== */
        .my-card.is-bordered {
            border: 1px solid #ebeef5;
        }

        /* ===== 阴影 ===== */
        .my-card.is-always-shadow {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }

        .my-card.is-hover-shadow:hover {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }

        .my-card.is-never-shadow {
            box-shadow: none;
        }

        /* ===== 卡片头部 ===== */
        .my-card__header {
            padding: 18px 20px;
            border-bottom: 1px solid #ebeef5;
            box-sizing: border-box;
        }

        .my-card__title {
            font-size: 16px;
            font-weight: 600;
            color: #303133;
            line-height: 1.5;
        }

        .my-card__subtitle {
            font-size: 13px;
            color: #909399;
            margin-top: 5px;
            line-height: 1.5;
        }

        /* ===== 卡片主体 ===== */
        .my-card__body {
            box-sizing: border-box;
        }

        /* ===== 卡片底部 ===== */
        .my-card__footer {
            padding: 18px 20px;
            border-top: 1px solid #ebeef5;
            box-sizing: border-box;
        }
    `;
    document.head.appendChild(style);
})();
