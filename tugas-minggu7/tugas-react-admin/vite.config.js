import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Plugin resmi Tailwind CSS v4
  ],
  resolve: {
    dedupe: ['react', 'react-dom'], // Mencegah eror invalid hook / blank screen
  },
})