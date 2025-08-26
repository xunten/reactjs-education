// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    // Nén các file tĩnh (js, css, html) thành .gz và .br
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // Chỉ nén các file có kích thước > 10KB
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    // Phân tích bundle để tìm các thư viện lớn
    visualizer({
      filename: './dist/report.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Tối ưu hóa code splitting bằng cách nhóm các thư viện lớn
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const moduleName = id.split('node_modules/')[1].split('/')[0];
            return `vendor/${moduleName}`;
          }
        },
      },
    },
  },
});