"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthContext = exports.AuthProvider = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("react");
var AuthContext = (0, react_1.createContext)(null);
var AuthProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(null), accessToken = _b[0], setAccessToken = _b[1];
    var _c = (0, react_1.useState)(null), refreshToken = _c[0], setRefreshToken = _c[1];
    // const login = (accessToken: string, refreshToken: string) => {
    //     setAccessToken(accessToken);
    //     setRefreshToken(refreshToken);
    // };
    // const logout = () => {
    //     setAccessToken(null);
    //     setRefreshToken(null);
    // };
    return ((0, jsx_runtime_1.jsx)(AuthContext.Provider, { value: { accessToken: accessToken, refreshToken: refreshToken, setAccessToken: setAccessToken, setRefreshToken: setRefreshToken }, children: children }));
};
exports.AuthProvider = AuthProvider;
var useAuthContext = function () {
    return (0, react_1.useContext)(AuthContext);
};
exports.useAuthContext = useAuthContext;
