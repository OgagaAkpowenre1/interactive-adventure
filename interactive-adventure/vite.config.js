import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
  })],
  server: {
    proxy: {
      '/api': {
        target: 'https://9000-idx-interactive-adventure-1737094341845.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev',
        changeOrigin: true,
        secure: false,
      },
    },
  },
}) 
