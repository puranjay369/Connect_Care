import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/entities": path.resolve(__dirname, "./src/entities"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/lib": path.resolve(__dirname, "./src/lib"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/pages": path.resolve(__dirname, "./Pages"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "../../components": path.resolve(__dirname, "./Components"),
      "../components": path.resolve(__dirname, "./Components")
    },
  },
  server: {
    port: 3000,
    host: true
  }
})
