<template>
  <div class="user-list-page">
    <!-- 搜索工具栏 -->
    <el-card class="search-bar mb-md">
      <el-form :model="query" inline size="small">
        <el-form-item label="搜索">
          <el-input v-model="query.keyword" placeholder="姓名/用户名/邮箱" clearable style="width:200px" @keyup.enter.native="handleSearch" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="query.role" placeholder="全部角色" clearable style="width:130px">
            <el-option v-for="r in roleOptions" :key="r.value" :label="r.label" :value="r.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="query.status" placeholder="全部状态" clearable style="width:110px">
            <el-option label="正常" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 操作栏 -->
    <el-card>
      <div class="table-toolbar">
        <span class="text-bold">用户列表（共 {{ total }} 条）</span>
        <!-- v-permission：只有 admin/superAdmin 可见新建按钮 -->
        <el-button
          v-permission="['admin', 'superAdmin']"
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="openCreateDialog"
        >
          新建用户
        </el-button>
      </div>

      <!-- 表格 -->
      <el-table :data="tableData" v-loading="loading" stripe border style="width:100%">
        <el-table-column prop="id" label="ID" width="50" align="center" />
        <el-table-column prop="name" label="姓名" width="90" />
        <el-table-column prop="username" label="用户名" width="110" />
        <el-table-column prop="email" label="邮箱" min-width="160" show-overflow-tooltip />
        <el-table-column prop="department" label="部门" width="90" />
        <el-table-column label="角色" width="110">
          <template slot-scope="{ row }">
            <el-tag
              v-for="r in row.roles"
              :key="r"
              :type="roleTagType(r)"
              size="mini"
              style="margin-right:2px"
            >
              {{ roleLabel(r) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80" align="center">
          <template slot-scope="{ row }">
            <el-switch
              :value="row.status === 1"
              :disabled="!canManage"
              @change="toggleStatus(row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="155" show-overflow-tooltip />
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="{ row }">
            <el-button size="mini" type="text" @click="viewDetail(row)">详情</el-button>
            <el-button v-permission="['admin','superAdmin']" size="mini" type="text" @click="openEditDialog(row)">编辑</el-button>
            <el-button v-permission="['superAdmin']" size="mini" type="text" class="text-danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <pagination
        :total="total"
        :page="query.page"
        :page-size="query.pageSize"
        @page-change="val => { query.page = val; loadData() }"
        @size-change="val => { query.pageSize = val; query.page = 1; loadData() }"
      />
    </el-card>

    <!-- 新建/编辑 弹窗 -->
    <el-dialog :title="dialogMode === 'create' ? '新建用户' : '编辑用户'" :visible.sync="dialogVisible" width="500px">
      <el-form ref="userForm" :model="userForm" :rules="formRules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" :disabled="dialogMode === 'edit'" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userForm.name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" />
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="userForm.department" />
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-select v-model="userForm.roles" multiple placeholder="请选择角色" style="width:100%">
            <el-option v-for="r in roleOptions" :key="r.value" :label="r.label" :value="r.value" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="dialogMode === 'create'" label="密码" prop="password">
          <el-input v-model="userForm.password" type="password" show-password />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="submitForm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/common/Pagination'
import { getUserList, createUser, updateUser, deleteUser, updateUserStatus } from '@/api/user'
import { ROLES, ROLE_LABEL, ROLE_TAG_TYPE } from '@/constants/roles'
import { mapGetters } from 'vuex'

export default {
  name: 'UserListView',
  components: { Pagination },
  data() {
    return {
      loading: false,
      submitLoading: false,
      tableData: [],
      total: 0,
      query: { keyword: '', role: '', status: '', page: 1, pageSize: 10 },
      roleOptions: Object.entries(ROLE_LABEL).map(([value, label]) => ({ value, label })),
      dialogVisible: false,
      dialogMode: 'create',
      userForm: { username: '', name: '', email: '', department: '', roles: ['viewer'], password: '123456' },
      editingId: null,
      formRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        name:     [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        email:    [{ required: true, type: 'email', message: '请输入有效邮箱', trigger: 'blur' }],
        roles:    [{ required: true, message: '请选择角色', trigger: 'change' }],
        password: [{ required: true, min: 6, message: '密码至少6位', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['roles']),
    canManage() {
      return this.roles.some(r => [ROLES.ADMIN, ROLES.SUPER_ADMIN].includes(r))
    }
  },
  created() { this.loadData() },
  methods: {
    async loadData() {
      this.loading = true
      try {
        const res = await getUserList(this.query)
        this.tableData = res.list
        this.total = res.total
      } finally {
        this.loading = false
      }
    },
    handleSearch() { this.query.page = 1; this.loadData() },
    handleReset() { this.query = { keyword: '', role: '', status: '', page: 1, pageSize: 10 }; this.loadData() },
    viewDetail(row) { this.$router.push(`/user/detail/${row.id}`) },
    roleLabel(r) { return ROLE_LABEL[r] || r },
    roleTagType(r) { return ROLE_TAG_TYPE[r] || 'info' },

    async toggleStatus(row) {
      const newStatus = row.status === 1 ? 0 : 1
      try {
        await updateUserStatus(row.id, newStatus)
        row.status = newStatus
        this.$message.success(`已${newStatus ? '启用' : '禁用'}`)
      } catch { /* handled by interceptor */ }
    },

    openCreateDialog() {
      this.dialogMode = 'create'
      this.userForm = { username: '', name: '', email: '', department: '', roles: ['viewer'], password: '123456' }
      this.editingId = null
      this.dialogVisible = true
      this.$nextTick(() => this.$refs.userForm?.clearValidate())
    },

    openEditDialog(row) {
      this.dialogMode = 'edit'
      this.userForm = { ...row }
      this.editingId = row.id
      this.dialogVisible = true
      this.$nextTick(() => this.$refs.userForm?.clearValidate())
    },

    async submitForm() {
      await this.$refs.userForm.validate()
      this.submitLoading = true
      try {
        if (this.dialogMode === 'create') {
          await createUser(this.userForm)
          this.$message.success('用户创建成功')
        } else {
          await updateUser(this.editingId, this.userForm)
          this.$message.success('用户更新成功')
        }
        this.dialogVisible = false
        this.loadData()
      } finally {
        this.submitLoading = false
      }
    },

    async handleDelete(row) {
      await this.$confirm(`确定删除用户「${row.name}」吗？`, '警告', { type: 'warning' })
      await deleteUser(row.id)
      this.$message.success('删除成功')
      this.loadData()
    }
  }
}
</script>

<style lang="scss" scoped>
.table-toolbar { @include flex-between; margin-bottom: $spacing-sm; }
</style>
