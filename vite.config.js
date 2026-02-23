import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Personal-Task-Manager/',

  
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})