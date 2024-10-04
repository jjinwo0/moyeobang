"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResultByPos;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("react");
var Backdrop_1 = require("../Account/FinalModal/Backdrop/Backdrop");
var react_2 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var Btn_1 = require("../common/btn/Btn");
var react_query_1 = require("@tanstack/react-query");
var moyeobang_1 = require("@/services/moyeobang");
var useOnClickOutside_1 = require("@/hooks/useOnClickOutside");
var containerLayoutStyle = (0, react_2.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    position:absolute;\n    bottom:0;\n    border-top-left-radius: 50px;\n    border-top-right-radius: 50px;\n\n    width: 100%;\n    height: 700px;\n    background-color:", ";\n    display:flex;\n    flex-direction:column;\n    justify-content:center;\n\n    p {\n        text-align:start;\n    }\n\n    div {\n        display:flex;\n        flex-direction:column;\n        align-items:center;\n        justify-content:center;\n        box-sizing:border-box;\n    }\n"], ["\n    position:absolute;\n    bottom:0;\n    border-top-left-radius: 50px;\n    border-top-right-radius: 50px;\n\n    width: 100%;\n    height: 700px;\n    background-color:", ";\n    display:flex;\n    flex-direction:column;\n    justify-content:center;\n\n    p {\n        text-align:start;\n    }\n\n    div {\n        display:flex;\n        flex-direction:column;\n        align-items:center;\n        justify-content:center;\n        box-sizing:border-box;\n    }\n"])), colors_1.colors.white);
function ResultByPos(_a) {
    var _this = this;
    var paymentRequestId = _a.paymentRequestId, travelAccountNumber = _a.travelAccountNumber, placeId = _a.placeId, placeName = _a.placeName, placeAddress = _a.placeAddress, latitude = _a.latitude, longitude = _a.longitude, amount = _a.amount, storeAccountNumber = _a.storeAccountNumber, onClickOutside = _a.onClickOutside;
    var modalRef = (0, react_1.useRef)(null);
    (0, useOnClickOutside_1.default)(modalRef, onClickOutside);
    var postPayment = (0, react_query_1.useMutation)({
        mutationFn: function (_a) {
            var data = _a.data;
            return moyeobang_1.default.postPayByPos(data);
        },
        onSuccess: function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('결제 성공!');
                return [2 /*return*/];
            });
        }); },
    }).mutate;
    function handleSettle() {
        console.log('결제 요청 중');
        // api결제 요청
        var payData = {
            paymentRequestId: paymentRequestId,
            travelAccountNumber: travelAccountNumber,
            placeId: placeId,
            placeName: placeName,
            placeAddress: placeAddress,
            amount: amount,
            latitude: latitude,
            longitude: longitude,
            storeAccountNumber: storeAccountNumber,
        };
        postPayment({ data: payData });
    }
    return ((0, jsx_runtime_1.jsx)(Backdrop_1.default, { children: (0, jsx_runtime_1.jsxs)("div", { ref: modalRef, css: containerLayoutStyle, children: [(0, jsx_runtime_1.jsxs)("p", { children: ["\uACB0\uC81C uuid : ", paymentRequestId] }), (0, jsx_runtime_1.jsxs)("p", { children: ["\uBAA8\uC784\uD1B5\uC7A5 \uACC4\uC88C\uBC88\uD638 : ", travelAccountNumber] }), (0, jsx_runtime_1.jsxs)("p", { children: ["\uAC00\uB9F9\uC810 id : ", placeId] }), (0, jsx_runtime_1.jsxs)("p", { children: ["\uAC00\uB9F9\uC815 \uC774\uB984 : ", placeName] }), (0, jsx_runtime_1.jsxs)("p", { children: ["\uAC00\uB9F9\uC810 \uC8FC\uC18C : ", placeAddress] }), (0, jsx_runtime_1.jsxs)("p", { children: ["\uC6CC\uB3C4 : ", latitude] }), (0, jsx_runtime_1.jsxs)("p", { children: ["\uACBD\uB3C4 : ", longitude] }), (0, jsx_runtime_1.jsxs)("p", { children: ["\uAC00\uB9F9\uC810 \uACC4\uC88C\uBC88\uD638 : ", storeAccountNumber] }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(Btn_1.default, { buttonStyle: { style: 'blue', size: 'big' }, onClick: handleSettle, children: "\uACB0\uC81C \uD558\uAE30" }) })] }) }));
}
var templateObject_1;
