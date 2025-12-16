import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // 必须引入 Node.js path 模块

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 配置 @ 指向 src 目录
      '@': path.resolve(__dirname, './src'),
      // 配置 @assets 指向 src/assets 目录
      '@assets': path.resolve(__dirname, './src/assets')
    }
  }
})
