import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // السطر ده مهم لو هترفع في فولدر فرعي
})