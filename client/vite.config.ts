import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const { VITE_BASE_URL } = process.env

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: VITE_BASE_URL
})
