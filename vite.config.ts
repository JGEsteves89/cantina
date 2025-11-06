import path from 'path';
import { defineConfig } from "vite";
import pkg from './package.json';
import react from "@vitejs/plugin-react";

/// <reference types="vitest" />

const test = {
  globals: true,
  environment: "jsdom",
  setupFiles: ["src/__tests__/setupTests.ts"],
  threads: false,
  watch: false,
};

// https://vitejs.dev/config/
const isProd = process.env.NODE_ENV === "production";
export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/client'),
      '#': path.resolve(__dirname, './types'),
    },
  },
  build: {
    minify: true,
  },
  test,
});
