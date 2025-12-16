<script setup>
import { ref } from "vue";
import {useSystemStore} from '@/store/index.js'
import { storeToRefs } from 'pinia'
const sStore = useSystemStore()
const {count} = storeToRefs(sStore)
defineProps({
  msg: String,
});

</script>

<template>
  <div>store的数据：{{count}}</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
