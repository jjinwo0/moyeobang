"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_router_1 = require("@tanstack/react-router");
exports.Route = (0, react_router_1.createFileRoute)('/_layout/_protected')({
    component: Protected
});
// 로그인 된 사용자 아닐시 entrance로 이동
function Protected() {
    return (0, jsx_runtime_1.jsx)(react_router_1.Outlet, {});
}
