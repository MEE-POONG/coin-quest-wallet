import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // เปลี่ยนเป็น URL ของ API ที่ต้องการ
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/upload-image': {
        target: 'https://upload-image.me-prompt-technology.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/upload-image/, '')
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
