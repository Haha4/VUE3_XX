// useWorker.js
import { ref, onUnmounted } from 'vue';
 
export function useWorker(workerPath) {
  const result = ref(null);
  const worker = new Worker(workerPath);
 
  const post = (data) => {
    worker.postMessage(data);
  };
 
  worker.onmessage = (e) => {
    result.value = e.data;
  };
 
  onUnmounted(() => {
    worker.terminate(); // 页面销毁时记得关闭 Worker
  });
 
  return { post, result };
}