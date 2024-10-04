"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_router_1 = require("@tanstack/react-router");
var TravelLog_1 = require("@/contexts/TravelLog");
var TravelLogMain_1 = require("@/components/travelLog/TravelLogMain");
var travelLogMain = function () {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(TravelLog_1.TravelLogProvider, { children: (0, jsx_runtime_1.jsx)(TravelLogMain_1.default, {}) }) }));
};
exports.Route = (0, react_router_1.createFileRoute)('/_layout/_protected/_layout/travelLog/')({
    component: travelLogMain,
});
