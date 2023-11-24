import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/F2Evotefortw2024/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
})
