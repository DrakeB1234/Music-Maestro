import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert';
import path from 'path';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? process.env.VITE_BASE_PATH || '/Music-Maestro' : '/',
  plugins: [
    react(),
    mkcert(),
  ],
  server: {
    host: true,
    port: 5173
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@customtypes": path.resolve(__dirname, "./src/types"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@helpers": path.resolve(__dirname, "./src/helpers"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vexflow')) return 'vexflow';
            if (id.includes('react')) return 'react';
            if (id.includes('webmidi')) return 'webmidi';
            return 'vendor';
          }
        }
      },
    },
  },
})
