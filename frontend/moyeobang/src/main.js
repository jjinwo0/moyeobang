"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var client_1 = require("react-dom/client");
require("@/styles/index.css");
// Tanstack 설정
var react_router_1 = require("@tanstack/react-router");
var react_query_devtools_1 = require("@tanstack/react-query-devtools");
var react_query_1 = require("@tanstack/react-query");
var api_1 = require("@react-google-maps/api");
var mapAPI = import.meta.env.VITE_GOOGLE_API_KEY;
// QueryClient 생성
var queryClient = new react_query_1.QueryClient();
// Import the generated route tree
var routeTree_gen_1 = require("./routeTree.gen"); // 라우트 트리 경로 확인
// Create a new router instance
var router = (0, react_router_1.createRouter)({ routeTree: routeTree_gen_1.routeTree });
var libraries = ['places'];
// Render the app
var rootElement = document.getElementById('root'); // 'root'에 맞게 수정
if (!rootElement.innerHTML) {
    var root = client_1.default.createRoot(rootElement);
    root.render(
    // <StrictMode>
    (0, jsx_runtime_1.jsx)(react_query_1.QueryClientProvider, { client: queryClient, children: (0, jsx_runtime_1.jsxs)(api_1.LoadScript, { googleMapsApiKey: mapAPI, libraries: libraries, children: [(0, jsx_runtime_1.jsx)(react_router_1.RouterProvider, { router: router }), (0, jsx_runtime_1.jsx)(react_query_devtools_1.ReactQueryDevtools, { initialIsOpen: true })] }) })
    // </StrictMode>
    );
}
