"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_router_1 = require("@tanstack/react-router");
var AccountConnect_1 = require("@/components/accountConnect/AccountConnect");
exports.Route = (0, react_router_1.createFileRoute)('/_layout/_protected/_layout/accountConnect/')({
    component: Index,
});
function Index() {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(AccountConnect_1.default, {}) }));
}
