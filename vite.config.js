import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  build: {
    outDir: 'dist'
  },
  css: {
    devSourcemap: true,
    postcss: './postcss.config.cjs'
  },
  resolve: {
    // Ensure proper handling of asset paths
    alias: {
      '/assets': '/assets'
    }
  }
})