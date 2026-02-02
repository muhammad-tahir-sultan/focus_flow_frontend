import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import compression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    visualizer({
      open: false,
      filename: 'bundle-analysis.html',
    }),
  ],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('recharts')) return 'recharts';
            if (id.includes('react')) return 'react-vendor';
            if (id.includes('axios')) return 'axios';
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
})
