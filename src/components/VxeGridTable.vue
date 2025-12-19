<template>
  <vxe-grid v-bind="gridOptions" />
</template>

<script setup lang="ts">
import { reactive } from "vue";
import type { VxeGridProps } from "vxe-table";

// 核心配置
const gridOptions = reactive<VxeGridProps>({
  border: true,
  stripe: true,
  height: 400,
  cellClassName({ row, column }) {
    return "cell-danger";
  },

  // 表头
  columns: [
    { type: "seq", width: 60, title: "序号" },
    { field: "name", title: "姓名", minWidth: 120 },
    { field: "age", title: "年龄", width: 100 },
    { field: "address", title: "地址", minWidth: 200 },
  ],

  // 数据
  data: [
    {
      id: 1,
      name: "张三",
      age: 28,
      address: "北京",
    },
    {
      id: 2,
      name: "李四",
      age: 32,
      address: "上海",
    },
    {
      id: 3,
      name: "王五",
      age: 25,
      address: "深圳",
    },
  ],
});
</script>
<style scoped lang="scss">
:deep(.cell-danger) {
  background-color: rgb(172, 230, 245) !important;
}
</style>
