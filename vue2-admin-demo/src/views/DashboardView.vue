<template>
  <div class="dashboard">
    <!-- 欢迎语 -->
    <div class="welcome-bar card mb-md">
      <div>
        <h2>欢迎回来，{{ userName }} 👋</h2>
        <p class="text-muted">{{ currentDate }}</p>
      </div>
      <el-tag :type="roleTagType" size="medium">{{ roleLabel }}</el-tag>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-row" v-loading="loading">
      <div
        class="stat-card card"
        v-for="stat in statCards"
        :key="stat.key"
        :style="{ borderTop: `3px solid ${stat.color}` }"
      >
        <div class="stat-icon" :style="{ color: stat.color }">
          <i :class="stat.icon"></i>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ statsData[stat.key] || 0 }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <!-- 图表区：访问趋势 -->
    <el-card class="mt-md chart-card">
      <div slot="header">📈 最近7天访问趋势</div>
      <div class="chart-container" v-if="chartData">
        <!-- 简单 CSS 条形图（不依赖第三方图表库）-->
        <div class="bar-chart">
          <div
            v-for="(v, i) in chartData.views"
            :key="i"
            class="bar-col"
          >
            <div class="bar-value">{{ v }}</div>
            <div
              class="bar-body"
              :style="{ height: barHeight(v, chartData.views) + '%' }"
            ></div>
            <div class="bar-label">{{ chartData.dates[i] }}</div>
          </div>
        </div>
        <div class="chart-legend">
          <span class="legend-dot" style="background:#409EFF"></span> 页面访问量
        </div>
      </div>
    </el-card>

    <!-- 快速入口 -->
    <div class="quick-links-row mt-md">
      <el-card v-for="link in quickLinks" :key="link.path" class="quick-card" @click.native="$router.push(link.path)">
        <i :class="link.icon" :style="{ color: link.color, fontSize: '28px' }"></i>
        <div class="quick-title">{{ link.title }}</div>
        <div class="quick-desc">{{ link.desc }}</div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDashboardStats, getChartData } from '@/api/dashboard'
import { ROLE_LABEL, ROLE_TAG_TYPE } from '@/constants/roles'

export default {
  name: 'DashboardView',
  data() {
    return {
      loading: false,
      statsData: {},
      chartData: null,
      statCards: [
        { key: 'totalUsers',       label: '总用户数',   icon: 'el-icon-user',        color: '#409EFF' },
        { key: 'newUsersToday',    label: '今日新增',   icon: 'el-icon-user-solid',  color: '#67C23A' },
        { key: 'totalArticles',    label: '文章总数',   icon: 'el-icon-document',    color: '#E6A23C' },
        { key: 'totalViews',       label: '总访问量',   icon: 'el-icon-data-line',   color: '#F56C6C' }
      ],
      quickLinks: [
        { path: '/user/list',     icon: 'el-icon-user',     color: '#409EFF', title: '用户管理', desc: '查看和管理系统用户' },
        { path: '/article/list',  icon: 'el-icon-document', color: '#67C23A', title: '文章管理', desc: '发布和管理内容文章' },
        { path: '/article/create',icon: 'el-icon-edit',     color: '#E6A23C', title: '新建文章', desc: '创建一篇新内容' },
        { path: '/profile',       icon: 'el-icon-setting',  color: '#909399', title: '个人资料', desc: '修改个人信息' }
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['userName', 'roles']),
    currentDate() {
      return new Date().toLocaleDateString('zh-CN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    },
    roleLabel() {
      return ROLE_LABEL[this.roles[0]] || '用户'
    },
    roleTagType() {
      return ROLE_TAG_TYPE[this.roles[0]] || 'info'
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      this.loading = true
      try {
        const [stats, chart] = await Promise.all([getDashboardStats(), getChartData()])
        this.statsData = stats
        this.chartData = chart
      } catch (e) {
        this.$message.error('数据加载失败')
      } finally {
        this.loading = false
      }
    },
    barHeight(val, allVals) {
      const max = Math.max(...allVals)
      return max ? Math.round((val / max) * 100) : 0
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard { padding: 0; }

.welcome-bar {
  @include flex-between;
  padding: $spacing-md $spacing-lg;
  h2 { font-size: $font-size-xl; margin: 0 0 4px; }
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-md;

  @include tablet { grid-template-columns: repeat(2, 1fr); }
  @include mobile { grid-template-columns: 1fr; }
}

.stat-card {
  @include flex-vcenter;
  gap: $spacing-md;
  padding: $spacing-md;

  .stat-icon i { font-size: 36px; }
  .stat-value { font-size: $font-size-xxl; font-weight: 700; color: $text-primary; line-height: 1; }
  .stat-label { font-size: $font-size-sm; color: $text-secondary; margin-top: 4px; }
}

.chart-card { ::v-deep .el-card__body { padding: $spacing-md; } }

.chart-container {
  height: 200px;
  display: flex;
  flex-direction: column;
}

.bar-chart {
  flex: 1;
  @include flex-vcenter;
  align-items: flex-end;
  gap: 8px;
  padding: 0 $spacing-sm;
}

.bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: flex-end;

  .bar-value { font-size: $font-size-xs; color: $text-secondary; margin-bottom: 4px; }
  .bar-body  { width: 60%; background: $primary; border-radius: 3px 3px 0 0; transition: height 0.5s ease; min-height: 4px; }
  .bar-label { font-size: $font-size-xs; color: $text-secondary; margin-top: 6px; white-space: nowrap; }
}

.chart-legend {
  @include flex-vcenter;
  gap: 6px;
  margin-top: $spacing-sm;
  font-size: $font-size-xs;
  color: $text-secondary;

  .legend-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
}

.quick-links-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-md;

  @include tablet { grid-template-columns: repeat(2, 1fr); }
  @include mobile { grid-template-columns: repeat(2, 1fr); }
}

.quick-card {
  text-align: center;
  cursor: pointer;
  transition: $transition-base;

  ::v-deep .el-card__body { padding: $spacing-lg $spacing-md; }

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-base;
  }

  .quick-title { font-size: $font-size-md; font-weight: 600; color: $text-primary; margin-top: $spacing-sm; }
  .quick-desc  { font-size: $font-size-xs; color: $text-secondary; margin-top: $spacing-xs; }
}
</style>
