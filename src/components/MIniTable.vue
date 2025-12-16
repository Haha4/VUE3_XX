<template>
  <div class="mini-table" ref="tableWrapper">
    <!-- 固定列 -->
    <div class="fixed-col">
      <div class="header">
        <div
          v-for="col in fixedColumns"
          :key="col.prop"
          class="cell"
          @click="sort(col)"
        >
          {{ col.label }}
          <span v-if="sortProp === col.prop">{{
            sortOrder === 1 ? "↑" : "↓"
          }}</span>
        </div>
      </div>
      <div class="body" ref="fixedBody">
        <div
          v-for="(row, index) in visibleData"
          :key="startIndex + index"
          class="row"
          :style="{ height: rowHeight + 'px' }"
        >
          <div v-for="col in fixedColumns" :key="col.prop" class="cell">
            {{ row[col.prop] }}
          </div>
        </div>
      </div>
    </div>

    <!-- 可滚动列 -->
    <div class="scroll-col" ref="scrollCol" @scroll="onScroll">
      <div class="header">
        <div
          v-for="col in scrollColumns"
          :key="col.prop"
          class="cell"
          @click="sort(col)"
        >
          {{ col.label }}
          <span v-if="sortProp === col.prop">{{
            sortOrder === 1 ? "↑" : "↓"
          }}</span>
        </div>
      </div>
      <div class="body" :style="{ height: bodyHeight + 'px' }">
        <div style="position: relative; height: totalHeight + 'px'">
          <div
            v-for="(row, index) in visibleData"
            :key="startIndex + index"
            class="row"
            :style="{
              top: (startIndex + index) * rowHeight + 'px',
              position: 'absolute',
              height: rowHeight + 'px',
            }"
          >
            <div v-for="col in scrollColumns" :key="col.prop" class="cell">
              {{ row[col.prop] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";

export default {
  props: {
    data: Array,
    columns: Array,
    fixed: { type: Number, default: 1 },
    rowHeight: { type: Number, default: 30 },
    bodyHeight: { type: Number, default: 300 },
  },
  setup(props) {
    const scrollCol = ref(null);
    const fixedBody = ref(null);
    const tableWrapper = ref(null);
    const sortProp = ref(null);
    const sortOrder = ref(1);
    const scrollTop = ref(0);

    // 列拆分
    const fixedColumns = computed(() => props.columns.slice(0, props.fixed));
    const scrollColumns = computed(() => props.columns.slice(props.fixed));

    // 排序后的数据
    const sortedData = computed(() => {
      let result = [...props.data];
      if (sortProp.value) {
        result.sort((a, b) => {
          if (a[sortProp.value] > b[sortProp.value]) return sortOrder.value;
          if (a[sortProp.value] < b[sortProp.value]) return -sortOrder.value;
          return 0;
        });
      }
      return result;
    });

    // 虚拟滚动
    const totalHeight = computed(
      () => sortedData.value.length * props.rowHeight
    );
    const visibleCount = computed(() =>
      Math.ceil(props.bodyHeight / props.rowHeight)
    );
    const startIndex = computed(() =>
      Math.floor(scrollTop.value / props.rowHeight)
    );
    const visibleData = computed(() =>
      sortedData.value.slice(
        startIndex.value,
        startIndex.value + visibleCount.value + 1
      )
    );

    // 排序函数
    const sort = (col) => {
      if (sortProp.value === col.prop) sortOrder.value *= -1;
      else {
        sortProp.value = col.prop;
        sortOrder.value = 1;
      }
    };

    // 滚动同步
    const onScroll = (e) => {
      scrollTop.value = e.target.scrollTop;
      fixedBody.value.scrollTop = e.target.scrollTop;
    };

    return {
      fixedColumns,
      scrollColumns,
      visibleData,
      startIndex,
      totalHeight,
      sortProp,
      sortOrder,
      sort,
      scrollCol,
      fixedBody,
      tableWrapper,
      onScroll,
    };
  },
};
</script>

<style scoped>
.mini-table {
  display: flex;
  border: 1px solid #ccc;
  position: relative;
  font-size: 14px;
}
.fixed-col {
  position: sticky;
  left: 0;
  background: #f5f5f5;
  z-index: 10;
}
.scroll-col {
  overflow-x: auto;
  flex: 1;
}
.header,
.row {
  display: flex;
}
.cell {
  flex: 1;
  min-width: 80px;
  padding: 4px 8px;
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
  box-sizing: border-box;
  cursor: pointer;
}
.row .cell:last-child {
  border-right: none;
}
.header .cell {
  font-weight: bold;
  background: #f0f0f0;
}
.body {
  overflow-y: auto;
}
</style>
