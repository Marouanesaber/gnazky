
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  server: {
    port: 5050, // Changed to 5050 to match backend
    proxy: {
      // Proxy API requests to backend
      '/api': {
        target: 'http://localhost:5050',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
