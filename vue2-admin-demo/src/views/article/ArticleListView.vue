<template>
  <div class="article-list-page">
    <!-- 搜索 -->
    <el-card class="mb-md">
      <el-form :model="query" inline size="small">
        <el-form-item label="搜索">
          <el-input v-model="query.keyword" placeholder="标题/摘要" clearable style="width:200px" @keyup.enter.native="handleSearch" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="query.status" placeholder="全部" clearable style="width:120px">
            <el-option v-for="s in statusOptions" :key="s.value" :label="s.label" :value="s.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="query.category" placeholder="全部" clearable style="width:120px">
            <el-option v-for="c in categoryOptions" :key="c.value" :label="c.label" :value="c.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <div class="table-toolbar">
        <span class="text-bold">文章列表（共 {{ total }} 篇）</span>
        <el-button
          v-permission="['admin', 'superAdmin', 'editor']"
          type="primary" size="small" icon="el-icon-plus"
          @click="$router.push('/article/create')"
        >
          新建文章
        </el-button>
      </div>

      <el-table :data="tableData" v-loading="loading" stripe border style="width:100%">
        <el-table-column prop="id" label="ID" width="50" align="center" />
        <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <el-link type="primary" @click="$router.push(`/article/detail/${row.id}`)">{{ row.title }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="分类" width="90">
          <template slot-scope="{ row }">
            <el-tag size="mini" type="info">{{ categoryLabel(row.category) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80" align="center">
          <template slot-scope="{ row }">
            <el-badge :is-dot="row.status === 'draft'" class="status-badge">
              <el-tag :type="statusTagType(row.status)" size="mini">{{ statusLabel(row.status) }}</el-tag>
            </el-badge>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="作者" width="80" />
        <el-table-column prop="views" label="阅读量" width="75" align="center" />
        <el-table-column prop="createTime" label="创建时间" width="145" show-overflow-tooltip />
        <el-table-column label="操作" width="160" fixed="right">
          <template slot-scope="{ row }">
            <el-button size="mini" type="text" @click="$router.push(`/article/detail/${row.id}`)">查看</el-button>
            <el-button v-permission="['admin','superAdmin','editor']" size="mini" type="text" @click="$router.push(`/article/edit/${row.id}`)">编辑</el-button>
            <el-button v-permission="['admin','superAdmin']" size="mini" type="text" class="text-danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        :total="total" :page="query.page" :page-size="query.pageSize"
        @page-change="val => { query.page = val; loadData() }"
        @size-change="val => { query.pageSize = val; query.page = 1; loadData() }"
      />
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/common/Pagination'
import { getArticleList, deleteArticle } from '@/api/article'

const STATUS_MAP = { published: { label: '已发布', type: 'success' }, draft: { label: '草稿', type: 'info' }, review: { label: '审核中', type: 'warning' } }
const CATEGORY_MAP = { tech: '技术', arch: '架构', ui: 'UI', perf: '性能' }

export default {
  name: 'ArticleListView',
  components: { Pagination },
  data() {
    return {
      loading: false,
      tableData: [],
      total: 0,
      query: { keyword: '', status: '', category: '', page: 1, pageSize: 10 },
      statusOptions:   Object.entries(STATUS_MAP).map(([v, o]) => ({ value: v, label: o.label })),
      categoryOptions: Object.entries(CATEGORY_MAP).map(([v, l]) => ({ value: v, label: l }))
    }
  },
  created() { this.loadData() },
  methods: {
    async loadData() {
      this.loading = true
      try {
        const res = await getArticleList(this.query)
        this.tableData = res.list
        this.total = res.total
      } finally { this.loading = false }
    },
    handleSearch() { this.query.page = 1; this.loadData() },
    handleReset() { this.query = { keyword: '', status: '', category: '', page: 1, pageSize: 10 }; this.loadData() },
    statusLabel(s) { return STATUS_MAP[s]?.label || s },
    statusTagType(s) { return STATUS_MAP[s]?.type || 'info' },
    categoryLabel(c) { return CATEGORY_MAP[c] || c },
    async handleDelete(row) {
      await this.$confirm(`确认删除「${row.title}」？`, '警告', { type: 'warning' })
      await deleteArticle(row.id)
      this.$message.success('删除成功')
      this.loadData()
    }
  }
}
</script>

<style lang="scss" scoped>
.table-toolbar { @include flex-between; margin-bottom: $spacing-sm; }
</style>
