"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.default = QrScan;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("react");
var qr_scanner_1 = require("qr-scanner");
var react_2 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var PayCompletedModal_1 = require("./PayCompletedModal");
var useTravelDetailStore_1 = require("@/store/useTravelDetailStore");
var react_query_1 = require("@tanstack/react-query");
var moyeobang_1 = require("@/services/moyeobang");
var storeData = [
    {
        placeId: 'airport-1',
        placeName: '모여방윙스',
        placeAddress: '제주시 특별자치도, 공항로 2 제주국제공항',
        latitude: 0,
        longitude: 0,
        storeAccountNumber: '0012280102000441',
    },
    {
        placeId: 'starbucks-1',
        placeName: '호텔모여방',
        placeAddress: '서울특별시 강남구 테헤란로 108길 42',
        latitude: 0,
        longitude: 0,
        storeAccountNumber: '0012280102000441',
    }
];
var qrReaderLayoutStyle = (0, react_2.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    padding-top: 30px;\n    width: 100%;\n    height: 100%;\n    display:flex;\n    flex-direction:column;\n    position : relative; \n    video { \n    width : 100% ; \n    height : 600px; \n    object-fit : cover; \n    } \n"], ["\n    padding-top: 30px;\n    width: 100%;\n    height: 100%;\n    display:flex;\n    flex-direction:column;\n    position : relative; \n    video { \n    width : 100% ; \n    height : 600px; \n    object-fit : cover; \n    } \n"])));
var qrBoxStyle = (0, react_2.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    width : 300px !important; \n    height: 300px !important; \n    border: 2px solid ", ";\n    border-radius: 15px;\n    position: absolute;\n    top: 25%;\n    left: 12% !important;\n"], ["\n    width : 300px !important; \n    height: 300px !important; \n    border: 2px solid ", ";\n    border-radius: 15px;\n    position: absolute;\n    top: 25%;\n    left: 12% !important;\n"])), colors_1.colors.third);
var smallTextStyle = (0, react_2.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    font-family: 'regular';\n    font-size:15px;\n"], ["\n    font-family: 'regular';\n    font-size:15px;\n"])));
var bigTextStyle = (0, react_2.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    font-family: 'semibold';\n    font-size:24px;\n"], ["\n    font-family: 'semibold';\n    font-size:24px;\n"])));
var englishStyle = (0, react_2.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    font-family: 'english';\n    font-size:32px;\n"], ["\n    font-family: 'english';\n    font-size:32px;\n"])));
var textBoxStyle = (0, react_2.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    display:flex;\n    flex-direction:column;\n    margin-top:30px;\n    justify-content:center;\n    align-items:center;\n    gap:20px;\n"], ["\n    display:flex;\n    flex-direction:column;\n    margin-top:30px;\n    justify-content:center;\n    align-items:center;\n    gap:20px;\n"])));
function QrScan() {
    var _this = this;
    var scanner = (0, react_1.useRef)();
    var videoElement = (0, react_1.useRef)(null);
    var qrBoxElement = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)(true), qrOn = _a[0], setQrOn = _a[1];
    var accountNumber = (0, useTravelDetailStore_1.default)().accountNumber;
    var _b = (0, react_1.useState)(''), successMessage = _b[0], setSuccessMessage = _b[1];
    var _c = (0, react_1.useState)(), transactionId = _c[0], setTransactionId = _c[1];
    var postPaymentByOnline = (0, react_query_1.useMutation)({
        mutationFn: function (_a) {
            var data = _a.data;
            return moyeobang_1.default.postPayByOnline(data);
        },
        onSuccess: function (response) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                setSuccessMessage('success');
                setTransactionId(response.data.data.transactionId);
                console.log('결제 성공!');
                return [2 /*return*/];
            });
        }); },
    }).mutate;
    // 결과 
    var _d = (0, react_1.useState)(null), scannedResult = _d[0], setScannedResult = _d[1];
    // 성공
    function onScanSuccuess(result) {
        try {
            if (result.data) {
                var data_1 = JSON.parse(result.data);
                setScannedResult(data_1);
                console.log('파싱된 QR 데이터', data_1);
                var stores = storeData.filter(function (store) { return store.placeId === data_1.placeId; });
                var payData = __assign(__assign(__assign({}, stores[0]), data_1), { travelAccountNumber: accountNumber });
                console.log('post요청 데이터:', payData);
                // 결제 데이터 API 요청!
                postPaymentByOnline({ data: payData });
            }
        }
        catch (error) {
            console.log('QR스캔 오류 발생', error);
        }
    }
    function onScanFail(error) {
        console.log('QR스캔 실패:', error);
    }
    (0, react_1.useEffect)(function () {
        var _a;
        if ((videoElement === null || videoElement === void 0 ? void 0 : videoElement.current) && !scanner.current) {
            scanner.current = new qr_scanner_1.default(videoElement === null || videoElement === void 0 ? void 0 : videoElement.current, onScanSuccuess, {
                onDecodeError: onScanFail,
                preferredCamera: "environment", // 후면지향
                maxScansPerSecond: 3, // 1초당 2번
                highlightScanRegion: true, // ? 알아보기
                highlightCodeOutline: true, // QR주변 윤곽선 생성
                overlay: (qrBoxElement === null || qrBoxElement === void 0 ? void 0 : qrBoxElement.current) || undefined,
            });
            //QR스캐너 시작
            (_a = scanner === null || scanner === void 0 ? void 0 : scanner.current) === null || _a === void 0 ? void 0 : _a.start().then(function () {
                return setQrOn(true);
            }).catch(function (error) {
                if (error) {
                    setQrOn(false);
                }
            });
        }
        // 언마운트시
        return function () {
            var _a;
            if (!videoElement.current) {
                (_a = scanner === null || scanner === void 0 ? void 0 : scanner.current) === null || _a === void 0 ? void 0 : _a.stop();
            }
        };
    }, []);
    // 브라우저에 카메라가 허용되지 않은 경우
    (0, react_1.useEffect)(function () {
        if (!qrOn) {
            alert("카메라가 차단되었거나 접근할 수 없습니다.");
        }
    }, [qrOn]);
    function handleClose() {
        setSuccessMessage('');
    }
    return ((0, jsx_runtime_1.jsxs)("div", { css: qrReaderLayoutStyle, children: [!scannedResult &&
                (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("video", { ref: videoElement }), (0, jsx_runtime_1.jsx)("div", { css: qrBoxStyle, ref: qrBoxElement }), (0, jsx_runtime_1.jsxs)("div", { css: textBoxStyle, children: [(0, jsx_runtime_1.jsx)("div", { css: smallTextStyle, children: "\uC624\uD504\uB77C\uC778 \uACB0\uC81C \u2022 \uD574\uC678\uACB0\uC81C \u2022 \uC2F8\uD53C\uD398\uC774" }), (0, jsx_runtime_1.jsxs)("div", { css: bigTextStyle, children: [(0, jsx_runtime_1.jsx)("span", { css: englishStyle, children: "QR" }), "\uCF54\uB4DC\uB97C \uC2A4\uCE94\uD558\uC138\uC694"] })] })] }), successMessage && transactionId && ((0, jsx_runtime_1.jsx)(PayCompletedModal_1.default, { transactionId: transactionId, onClose: handleClose }))] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
