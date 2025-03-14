import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // URL base do backend
        changeOrigin: true,               // Para alterar a origem do pedido (necessário para CORS)
        secure: false,                    // Se estiver usando HTTP, deve ser false
        rewrite: (path) => path.replace(/^\/api/, ''),  // Remove '/api' do caminho antes de encaminhar
      },
    },
  },
})
