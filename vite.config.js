import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    cors: {
      origin: '*', // Mengizinkan semua origin, atau kamu bisa menggantinya dengan domain yang spesifik
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode HTTP yang diizinkan
      allowedHeaders: ['Content-Type', 'Authorization'], // Header yang diizinkan
    },
  },
})
