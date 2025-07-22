import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // 프로덕션 빌드에서 정적 파일 경로 설정
  base: './',
  build: {
    // 정적 파일들이 /static/ 경로로 접근되도록 설정
    assetsDir: 'assets'
  }
})
