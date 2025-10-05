import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
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
    },
  },
})
