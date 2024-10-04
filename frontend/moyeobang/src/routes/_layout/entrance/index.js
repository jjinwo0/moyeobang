"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
var react_router_1 = require("@tanstack/react-router");
var Login_1 = require("@/components/Login/Login");
exports.Route = (0, react_router_1.createFileRoute)('/_layout/entrance/')({
    component: Login_1.default,
});
