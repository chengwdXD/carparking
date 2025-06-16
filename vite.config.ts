import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api/car': {
        target: 'https://data.taipei',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/api\/car/,
            '/api/v1/dataset/739cec36-ed1b-4b92-b1f3-ffadf05fe6c7?scope=resourceAquire&limit=1000'
          ),
      },
       '/api/moto': {
        target: 'https://data.taipei',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/api\/moto/,
            '/api/v1/dataset/c0f07b6c-ff55-4fae-a390-ddfe9374d4d7?scope=resourceAquire&limit=1000'
          ),
      },
    },
  },
})
