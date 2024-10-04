"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
exports.default = AccountDetailLayout;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var HeaderWithBackButton_1 = require("@/components/common/Header/HeaderWithBackButton");
var react_router_1 = require("@tanstack/react-router");
var react_router_2 = require("@tanstack/react-router");
exports.Route = (0, react_router_1.createFileRoute)('/_layout/_protected/_layout/account/$transactionId/detail/_layout')({
    component: AccountDetailLayout
});
function AccountDetailLayout() {
    var navigate = (0, react_router_2.useNavigate)();
    function handleMain() {
        navigate({ to: '/account' });
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(HeaderWithBackButton_1.default, { onClick: handleMain }), (0, jsx_runtime_1.jsx)(react_router_1.Outlet, {})] }));
}
