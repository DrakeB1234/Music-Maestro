import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'My Piano App',
        short_name: 'Piano',
        start_url: '/',
        display: 'standalone',
        background_color: '#D5E6FF',
        theme_color: '#2B80FF',
        icons: [
          {
            src: 'favicon.svg',
            type: 'image/svg+xml',
            sizes: 'any',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3,wav}'],
        navigateFallback: '/index.html',

        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/piano_samples/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'piano-samples',
              expiration: {
                maxEntries: 50, 
                maxAgeSeconds: 60 * 60 * 24 * 365, 
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    })
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
      plugins: [
        visualizer({
          filename: 'stats.html',
          title: 'Bundle Visualizer',
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),
      ],
    },
  },
})
