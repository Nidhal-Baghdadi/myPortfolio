import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The site's public address, for the absolute links social previews need (index.html uses
// %VITE_SITE_URL%). Netlify's builds provide it as URL; locally it falls back to the dev server.
process.env.VITE_SITE_URL ??= process.env.URL ?? 'http://localhost:3001'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
