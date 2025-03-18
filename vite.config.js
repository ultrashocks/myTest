import { fileURLToPath, URL } from 'node:url';
import autoprefixer from 'autoprefixer';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // build: {
  //   // outDir: '../testing/dist',
  // },
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
    'process.version': '""',
  },
  base: './',
  //build 시에 모든 console.log를 제거
  esbuild: {
    drop: ['console', 'debugger'],
  },
  plugins: [
    vue(),
    // Components({
    //   dirs: ["src/components/app"],
    //   dts: true,
    // }),
  ],
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [autoprefixer],
    },
  },
  productionSourceMap: true,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
