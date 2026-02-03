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
            // Recharts first (before react check)
            if (id.includes('recharts')) return 'recharts';

            // React Router (before react check)
            if (id.includes('react-router')) return 'react-router';

            // Core React packages - must stay together
            // Use path separators to be more specific
            if (id.includes('/react/') || id.includes('\\react\\') ||
              id.includes('/react-dom/') || id.includes('\\react-dom\\') ||
              id.includes('/scheduler/') || id.includes('\\scheduler\\') ||
              id.includes('react/jsx-runtime') || id.includes('react\\jsx-runtime')) {
              return 'react-vendor';
            }

            // Axios
            if (id.includes('axios')) return 'axios';

            // Everything else
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
