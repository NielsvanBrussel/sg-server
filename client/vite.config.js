import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte()],
    server: {
      server: 'http://localhost',
      port: 4001,
      proxy: {
        '/api': {
          // target: 'https://svelte-game-server-4erv.onrender.com',
          target: 'http://localhost:4000',
          changeOrigin: true,
          secure: true
        }
      }
    }
})
