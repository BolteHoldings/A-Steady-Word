import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' keeps asset paths relative so they load from the Android
// WebView's file:// origin.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { outDir: 'dist' }
})
