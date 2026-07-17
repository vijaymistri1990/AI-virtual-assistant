import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // server: {
  //   port: 5173,
  //   strictPort: true,
  //   open: true,       // Auto-open browser
  //   host: true,       // Allow network access
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:5500',  // your backend URL
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // }
})
