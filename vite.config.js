import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/tk2k25/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          framerMotion: ['framer-motion'],
          gsap: ['gsap'],
          // You can add more entries here for other large libraries
          // e.g., three: ['three'],
        }
      }
    }
  }
})
