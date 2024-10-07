import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {TanStackRouterVite} from '@tanstack/router-vite-plugin';
import * as path from 'path';
import fs from 'fs';

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
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // 확장자 인식
  },
  server: {
    // TODO : 배포 후 https: false 로 변경!
    // https: {
    //   key: fs.readFileSync('key.pem'),
    //   cert: fs.readFileSync('cert.pem'),
    // },
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
