import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {TanStackRouterVite} from '@tanstack/router-vite-plugin';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // emotion 설정
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    // TanStack 설정
    TanStackRouterVite(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // @를 src로 설정
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://vu6tvl2vzm.apigw.ntruss.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        secure: false, // HTTPS 검증 비활성화
      },
    },
  },
});
