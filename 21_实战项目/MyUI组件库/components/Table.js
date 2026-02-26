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
            },
            // 行的 className 函数
            rowClassName: {
                type: Function
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
            this.$nextTick(() => {
                this.updateColumns();
            });
        },

        methods: {
            // 更新列配置（从 slot 收集）
            updateColumns() {
                const columns = [];
                // 从 $slots.default 获取 VNode
                const slots = this.$slots.default || [];
                
                slots.forEach(vnode => {
                    // 检查是否是 TableColumn 组件实例
                    if (vnode.componentInstance && vnode.componentInstance.$options.name === 'MyTableColumn') {
                        const instance = vnode.componentInstance;
                        columns.push({
                            prop: instance.prop,
                            label: instance.label,
                            width: instance.width,
                            minWidth: instance.minWidth,
                            align: instance.align || 'left',
                            formatter: instance.formatter,
                            renderCell: instance.renderCell
                        });
                    }
                });
                
                this.columns = columns;
            },

            // 获取单元格内容
            getCellValue(row, column) {
                if (column.formatter && typeof column.formatter === 'function') {
                    return column.formatter(row, column);
                }
                const value = column.prop ? row[column.prop] : '';
                return value !== undefined && value !== null ? value : '';
            },

            // 行点击事件
            handleRowClick(row, index) {
                this.$emit('row-click', row, index);
            }
        },

        template: `
            <div class="my-table-wrapper">
                <!-- 隐藏的 slot 用于接收列定义 -->
                <div style="display: none;">
                    <slot></slot>
                </div>
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
                            :class="rowClassName ? rowClassName({ row, rowIndex }) : ''"
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
            </div>
        `
    });

    // TableColumn 组件
    Vue.component('my-table-column', {
        name: 'MyTableColumn',
        
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
            },
            // 自定义渲染函数（返回 VNode）
            renderCell: {
                type: Function
            }
        },

        render(h) {
            // 渲染一个隐藏的注释节点，确保组件会被加入到父组件的 $children 中
            return h('div', { style: { display: 'none' } });
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
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            cursor: pointer;
        }

        .my-table tbody tr:hover {
            background-color: #f5f7fa;
            transform: scale(1.01);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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
