// worker.js
self.onmessage = function(e) {
    console.log('worker receive:', e);
  const result = e * 2;
  self.postMessage(result);
};