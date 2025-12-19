<template>
  <div>
    <!-- <router-view /> 
    <div>{{count}}</div>
    <div>{{myOwnName}}</div>
    <div>{{double}}</div> -->
    <VxeGridTable/>
    <!-- <el-button @click="()=>sStore.count++">点击我</el-button> -->
    <!-- <AdvancedMiniTable
      :data="tableData"
      :columns="columns"
      :fixed="2"
      :bodyHeight="300"
    /> -->
  </div>
</template>
<script setup>
import { defineProps,computed } from "vue";
import { useWorker } from "@/extra/useWork.js";
import AdvancedMiniTable from "./components/MIniTable.vue";
import VxeGridTable from "./components/VxeGridTable.vue";
import {useSystemStore} from '@/store/index.js'
import{ storeToRefs } from 'pinia'
// import { VxeGrid } from "vxe-table";
const { post, result } = useWorker(
  new URL("@/extra/work.js", import.meta.url),
  { type: "module" }
);
const sStore = useSystemStore()
const {count} = storeToRefs(sStore)
const myOwnName = computed(() => sStore.slogan)
const double = computed(() => sStore.count * 2)
sStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  console.log(mutation,state)
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // 与 cartStore.$id 相同
  mutation.storeId // 'cart'
  // 仅适用于 mutation.type === 'patch object'
  mutation.payload // 补丁对象传递给 to cartStore.$patch()

  // 每当它发生变化时，将整个状态持久化到本地存储
  localStorage.setItem('cart', JSON.stringify(state))
})
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper',
  style: 'background-color:green'
}
const tableData = Array.from({ length: 10000 }, (_, i) => ({
  name: "User " + i,
  age: 20 + (i % 50),
  score: Math.floor(Math.random() * 100),
}));
const columns = [
  { label: "姓名", prop: "name" },
  { label: "年龄", prop: "age" },
  { label: "分数", prop: "score" },
];
function doubleValue() {
  post(5); // 给子线程发送 5，子线程返回 10
}
defineProps({
  data1: String || Number,
});
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
