<template>
  <div class="pagination-wrapper">
    <el-pagination
      :current-page="page"
      :page-size="pageSize"
      :total="total"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="$emit('page-change', $event)"
      @size-change="$emit('size-change', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total:    { type: Number, default: 0 },
    page:     { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 }
  }
}
</script>

<style lang="scss" scoped>
.pagination-wrapper {
  margin-top: $spacing-md;
  display: flex;
  justify-content: flex-end;
}
</style>
