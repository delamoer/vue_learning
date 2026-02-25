/**
 * MyUI Table 表格组件
 * 演示函数式组件（functional component）的性能优化
 */

(function() {
    // Table 组件
    Vue.component('my-table', {
        props: {
            // 表格数据
            data: {
                type: Array,
                default: () => []
            },
            // 是否显示斑马纹
            stripe: {
                type: Boolean,
                default: false
            },
            // 是否显示边框
            border: {
                type: Boolean,
                default: false
            },
            // 是否显示表头
            showHeader: {
                type: Boolean,
                default: true
            },
            // 表格高度（固定表头）
            height: {
                type: [String, Number]
            },
            // 空数据提示
            emptyText: {
                type: String,
                default: '暂无数据'
            }
        },

        data() {
            return {
                columns: [] // 存储所有列配置
            };
        },

        computed: {
            tableClass() {
                return [
                    'my-table',
                    {
                        'my-table--stripe': this.stripe,
                        'my-table--border': this.border
                    }
                ];
            },

            tableStyle() {
                if (this.height) {
                    return {
                        height: typeof this.height === 'number' ? `${this.height}px` : this.height
                    };
                }
                return {};
            },

            hasData() {
                return this.data && this.data.length > 0;
            }
        },

        mounted() {
            // 收集所有 TableColumn 的配置
            // ⚠️ 注意：只在 mounted 中初始化！
            // 
            // ❌ 切勿在 updated 钩子中调用 updateColumns()！
            // 原因：updateColumns() 会修改 this.columns（响应式数据）
            //      → 数据变化触发重新渲染
            //      → 渲染完成触发 updated 钩子
            //      → updated 又调用 updateColumns()
            //      → 无限循环 → 页面卡死！
            // 
            // ✅ 正确做法：只在组件挂载时初始化一次
            //   列配置通常是静态的，不需要每次更新都重新收集
            this.updateColumns();
        },

        methods: {
            // 更新列配置
            updateColumns() {
                const columns = [];
                const walk = (children) => {
                    if (!children) return;
                    children.forEach(child => {
                        if (child.componentOptions && child.componentOptions.tag === 'my-table-column') {
                            const propsData = child.componentOptions.propsData || {};
                            columns.push({
                                prop: propsData.prop,
                                label: propsData.label,
                                width: propsData.width,
                                minWidth: propsData.minWidth,
                                align: propsData.align || 'left',
                                formatter: propsData.formatter
                            });
                        }
                        if (child.children) {
                            walk(child.children);
                        }
                    });
                };
                walk(this.$slots.default);
                this.columns = columns;
            },

            // 获取单元格内容
            getCellValue(row, column) {
                if (column.formatter && typeof column.formatter === 'function') {
                    return column.formatter(row, column);
                }
                return column.prop ? row[column.prop] : '';
            },

            // 行点击事件
            handleRowClick(row, index) {
                this.$emit('row-click', row, index);
            }
        },

        template: `
            <div class="my-table-container" :style="tableStyle">
                <table :class="tableClass">
                    <!-- 表头 -->
                    <thead v-if="showHeader">
                        <tr>
                            <th 
                                v-for="(column, index) in columns" 
                                :key="index"
                                :style="{
                                    width: column.width,
                                    minWidth: column.minWidth,
                                    textAlign: column.align
                                }"
                            >
                                {{ column.label }}
                            </th>
                        </tr>
                    </thead>
                    
                    <!-- 表体 -->
                    <tbody v-if="hasData">
                        <tr 
                            v-for="(row, rowIndex) in data" 
                            :key="rowIndex"
                            @click="handleRowClick(row, rowIndex)"
                        >
                            <td 
                                v-for="(column, colIndex) in columns" 
                                :key="colIndex"
                                :style="{
                                    width: column.width,
                                    minWidth: column.minWidth,
                                    textAlign: column.align
                                }"
                            >
                                {{ getCellValue(row, column) }}
                            </td>
                        </tr>
                    </tbody>
                    
                    <!-- 空数据 -->
                    <tbody v-else>
                        <tr>
                            <td :colspan="columns.length" class="my-table__empty">
                                {{ emptyText }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    });

    // TableColumn 组件（函数式组件 - 性能优化）
    // 函数式组件没有实例，没有响应式数据，没有生命周期，渲染开销更小
    Vue.component('my-table-column', {
        functional: true, // 标记为函数式组件

        props: {
            // 对应列内容的字段名
            prop: {
                type: String
            },
            // 列名
            label: {
                type: String,
                default: ''
            },
            // 列宽度
            width: {
                type: String
            },
            // 最小列宽度
            minWidth: {
                type: String
            },
            // 对齐方式
            align: {
                type: String,
                default: 'left',
                validator: (value) => ['left', 'center', 'right'].includes(value)
            },
            // 格式化函数
            formatter: {
                type: Function
            }
        },

        // 函数式组件使用 render 函数
        // context 包含：props, children, slots, data, parent 等
        render(h, context) {
            // 函数式组件本身不渲染任何内容
            // 只是作为配置传递给 Table 组件
            return null;
        }
    });

    // 注入样式
    const style = document.createElement('style');
    style.textContent = `
        /* 表格容器 */
        .my-table-container {
            overflow: auto;
            position: relative;
        }

        /* 表格 */
        .my-table {
            width: 100%;
            border-collapse: collapse;
            background-color: #fff;
            font-size: 14px;
            color: #606266;
        }

        /* 表头 */
        .my-table thead {
            background-color: #f5f7fa;
            color: #909399;
            font-weight: 600;
        }

        .my-table th,
        .my-table td {
            padding: 12px 10px;
            text-align: left;
        }

        .my-table th {
            border-bottom: 1px solid #e8eaec;
        }

        /* 边框模式 */
        .my-table--border th,
        .my-table--border td {
            border: 1px solid #e8eaec;
        }

        /* 表体 */
        .my-table tbody tr {
            transition: background-color 0.2s;
            cursor: pointer;
        }

        .my-table tbody tr:hover {
            background-color: #f5f7fa;
        }

        .my-table tbody td {
            border-bottom: 1px solid #e8eaec;
        }

        /* 斑马纹 */
        .my-table--stripe tbody tr:nth-child(even) {
            background-color: #fafafa;
        }

        .my-table--stripe tbody tr:nth-child(even):hover {
            background-color: #f0f2f5;
        }

        /* 空数据 */
        .my-table__empty {
            text-align: center !important;
            color: #909399;
            padding: 40px 0 !important;
        }

        /* 固定表头 */
        .my-table-container[style*="height"] {
            overflow-y: auto;
        }

        .my-table-container[style*="height"] thead {
            position: sticky;
            top: 0;
            z-index: 10;
        }

        /* 滚动条美化 */
        .my-table-container::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        .my-table-container::-webkit-scrollbar-thumb {
            background-color: #dcdfe6;
            border-radius: 4px;
        }

        .my-table-container::-webkit-scrollbar-thumb:hover {
            background-color: #c0c4cc;
        }
    `;
    document.head.appendChild(style);
})();
