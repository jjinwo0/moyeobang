import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/index.css';

// Tanstack 설정
import {RouterProvider, createRouter} from '@tanstack/react-router';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {LoadScript} from '@react-google-maps/api';

const mapAPI = import.meta.env.VITE_GOOGLE_API_KEY;

// QueryClient 생성
const queryClient = new QueryClient();

// Import the generated route tree
import {routeTree} from './routeTree.gen'; // 라우트 트리 경로 확인

// Create a new router instance
const router = createRouter({routeTree});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById('root')!; // 'root'에 맞게 수정
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoadScript googleMapsApiKey={mapAPI}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={true} />
        {/* Devtools 추가 */}
      </LoadScript>
    </QueryClientProvider>
    // </StrictMode>
  );
}
