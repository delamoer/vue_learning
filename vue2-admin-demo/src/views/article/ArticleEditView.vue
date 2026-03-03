<template>
  <div class="article-edit-page">
    <div class="page-header mb-md">
      <el-button icon="el-icon-arrow-left" size="small" @click="$router.back()">返回</el-button>
      <span class="ml-md text-bold">{{ isEdit ? '编辑文章' : '新建文章' }}</span>
    </div>

    <el-card v-loading="loading">
      <el-form ref="articleForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入文章标题" maxlength="100" show-word-limit />
        </el-form-item>

        <el-row :gutter="16">
          <el-col :span="8">
            <el-form-item label="分类" prop="category">
              <el-select v-model="form.category" placeholder="请选择分类" style="width:100%">
                <el-option v-for="c in categoryOptions" :key="c.value" :label="c.label" :value="c.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" style="width:100%">
                <el-option label="草稿" value="draft" />
                <el-option label="已发布" value="published" />
                <el-option label="审核中" value="review" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="作者">
              <el-input v-model="form.author" disabled />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="摘要" prop="summary">
          <el-input
            v-model="form.summary"
            type="textarea"
            :rows="3"
            placeholder="简短描述文章内容"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>

        <el-form-item label="正文" prop="content">
          <!-- 简化：使用 textarea 代替富文本编辑器 -->
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="12"
            placeholder="在此输入 Markdown 格式正文..."
          />
          <div class="content-tip text-muted">提示：实际项目中此处接入富文本编辑器（如 TinyMCE / Quill / Vditor）</div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="submitLoading" @click="handleSubmit">
            {{ isEdit ? '保存修改' : '发布文章' }}
          </el-button>
          <el-button @click="saveDraft" :loading="draftLoading">保存草稿</el-button>
          <el-button @click="$router.back()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleDetail, createArticle, updateArticle } from '@/api/article'
import { mapGetters } from 'vuex'

export default {
  name: 'ArticleEditView',
  data() {
    return {
      loading: false,
      submitLoading: false,
      draftLoading: false,
      form: {
        title: '', category: 'tech', status: 'draft',
        author: '', summary: '', content: ''
      },
      rules: {
        title:    [{ required: true, message: '请输入标题', trigger: 'blur' }],
        category: [{ required: true, message: '请选择分类', trigger: 'change' }],
        summary:  [{ required: true, message: '请填写摘要', trigger: 'blur' }],
        content:  [{ required: true, message: '请输入正文', trigger: 'blur' }]
      },
      categoryOptions: [
        { value: 'tech', label: '技术' },
        { value: 'arch', label: '架构' },
        { value: 'ui',   label: 'UI' },
        { value: 'perf', label: '性能' }
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['userName']),
    isEdit() { return !!this.$route.params.id },
    articleId() { return Number(this.$route.params.id) }
  },
  created() {
    this.form.author = this.userName
    if (this.isEdit) this.loadArticle()
  },
  methods: {
    async loadArticle() {
      this.loading = true
      try {
        const article = await getArticleDetail(this.articleId)
        this.form = { ...article }
      } finally {
        this.loading = false
      }
    },
    async handleSubmit() {
      await this.$refs.articleForm.validate()
      this.submitLoading = true
      try {
        if (this.isEdit) {
          await updateArticle(this.articleId, this.form)
          this.$message.success('文章更新成功')
        } else {
          await createArticle({ ...this.form, status: 'published' })
          this.$message.success('文章发布成功')
        }
        this.$router.push('/article/list')
      } finally {
        this.submitLoading = false
      }
    },
    async saveDraft() {
      if (!this.form.title) {
        this.$message.warning('请先输入标题')
        return
      }
      this.draftLoading = true
      try {
        if (this.isEdit) {
          await updateArticle(this.articleId, { ...this.form, status: 'draft' })
        } else {
          await createArticle({ ...this.form, status: 'draft' })
        }
        this.$message.success('草稿已保存')
      } finally {
        this.draftLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header { @include flex-vcenter; }
.content-tip { font-size: $font-size-xs; margin-top: 4px; }
</style>
