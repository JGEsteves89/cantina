import path from 'path';
import { defineConfig } from "vite";
import pkg from './package.json';
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
const isProd = process.env.NODE_ENV === "production";
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: [
      'menudacasa.duckdns.org',
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/client'),
      '#': path.resolve(__dirname, './types'),
    },
  },
  build: {
    minify: true,
  },
});
