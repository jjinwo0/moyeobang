import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/index.css';
import NotFound from './components/NotFound/NotFound';

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
import {AuthProvider} from './contexts/AuthContext';

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
      queryClient
  },
  defaultPreload: 'intent', // 경로가 사용될 가능성이 있을 때 해당 경로와 관련된 리소스(예: 데이터, 컴포넌트)를 사전 로드
  defaultPreloadStaleTime:0, // 데이터를 사전 로드할 때마다 새로 로드
  defaultErrorComponent: () => (
    <NotFound 
    errorMessage='서버 오류가 발생했어요!'
    description='잠시 후 다시 시도해 주세요'
    />
  ),
  defaultNotFoundComponent: () => (
    <NotFound 
    errorMessage='에러가 발생했어요!'
    description='요청하신 페이지를 찾을 수 없어요'
    />
  )
});

// Library 타입을 정의합니다.
type Library = 'places' | 'geometry' | 'drawing' | 'visualization';
const libraries: Library[] = ['places', 'geometry', 'drawing', 'visualization'];

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
      <LoadScript googleMapsApiKey={mapAPI} libraries={libraries}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={true} />
        {/* Devtools 추가 */}
      </LoadScript>
    </QueryClientProvider>
    // {/* </StrictMode> */}
  );
}
