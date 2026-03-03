<template>
  <div class="article-detail-page">
    <div class="page-header mb-md">
      <el-button icon="el-icon-arrow-left" size="small" @click="$router.back()">返回</el-button>
      <el-button
        v-if="article" v-permission="['admin','superAdmin','editor']"
        type="primary" size="small" icon="el-icon-edit" class="ml-sm"
        @click="$router.push(`/article/edit/${article.id}`)"
      >
        编辑
      </el-button>
    </div>

    <el-card v-loading="loading">
      <template v-if="article">
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
          <span><i class="el-icon-user"></i> {{ article.author }}</span>
          <span><i class="el-icon-time"></i> {{ article.createTime }}</span>
          <span><i class="el-icon-view"></i> {{ article.views }} 次阅读</span>
          <el-tag :type="statusTagType(article.status)" size="mini">{{ statusLabel(article.status) }}</el-tag>
          <el-tag type="info" size="mini">{{ categoryLabel(article.category) }}</el-tag>
        </div>
        <el-divider />
        <p class="article-summary">{{ article.summary }}</p>
        <div class="article-content">
          <pre>{{ article.content }}</pre>
        </div>
      </template>
      <el-empty v-else-if="!loading" description="文章不存在" />
    </el-card>
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/article'

const STATUS_MAP = { published: { label: '已发布', type: 'success' }, draft: { label: '草稿', type: 'info' }, review: { label: '审核中', type: 'warning' } }
const CATEGORY_MAP = { tech: '技术', arch: '架构', ui: 'UI', perf: '性能' }

export default {
  name: 'ArticleDetailView',
  data() { return { loading: false, article: null } },
  created() { this.loadArticle() },
  methods: {
    async loadArticle() {
      this.loading = true
      try {
        this.article = await getArticleDetail(Number(this.$route.params.id))
      } finally { this.loading = false }
    },
    statusLabel(s) { return STATUS_MAP[s]?.label || s },
    statusTagType(s) { return STATUS_MAP[s]?.type || 'info' },
    categoryLabel(c) { return CATEGORY_MAP[c] || c }
  }
}
</script>

<style lang="scss" scoped>
.page-header { @include flex-vcenter; }

.article-title { font-size: $font-size-xxl; color: $text-primary; font-weight: 700; margin-bottom: $spacing-sm; }

.article-meta {
  @include flex-vcenter;
  gap: $spacing-md;
  color: $text-secondary;
  font-size: $font-size-sm;

  span { @include flex-vcenter; gap: 4px; }
}

.article-summary {
  color: $text-regular;
  background: $bg-page;
  border-left: 3px solid $primary;
  padding: $spacing-sm $spacing-md;
  border-radius: 0 $radius-base $radius-base 0;
  margin-bottom: $spacing-md;
}

.article-content pre {
  white-space: pre-wrap;
  font-family: inherit;
  line-height: 1.8;
  color: $text-regular;
}
</style>
