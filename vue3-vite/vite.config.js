import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // 終端機輸入 mkcert -install 和 mkcert localhost 來生成下面兩個本機自簽名證書檔案
    https: {
      key: './localhost-key.pem',
      cert: './localhost.pem'
    }
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@import "@/style/_variables.sass"`
      }
    }
  },
})
