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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QrScanByPos;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("react");
var qr_scanner_1 = require("qr-scanner");
var react_2 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
// import ResultByPos from "./ResultByPos";
var HeaderWithXbutton_1 = require("../common/Header/HeaderWithXbutton");
var qrReaderLayoutStyle = (0, react_2.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    width: 100%;\n    height: 100%;\n    display:flex;\n    flex-direction:column;\n    align-items:center;\n    background-color:", ";\n\n    /* position : absolute; */\n    z-index:9999;\n    top:0;\n    left:0;\n    video { \n    width : 100% ; \n    height : 600px; \n    object-fit : cover; \n    } \n"], ["\n    width: 100%;\n    height: 100%;\n    display:flex;\n    flex-direction:column;\n    align-items:center;\n    background-color:", ";\n\n    /* position : absolute; */\n    z-index:9999;\n    top:0;\n    left:0;\n    video { \n    width : 100% ; \n    height : 600px; \n    object-fit : cover; \n    } \n"])), colors_1.colors.white);
var qrBoxStyle = (0, react_2.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    width : 300px !important; \n    height: 300px !important; \n    border: 2px solid ", ";\n    border-radius: 15px;\n    position: absolute;\n    top: 25%;\n    left: 9% !important;\n"], ["\n    width : 300px !important; \n    height: 300px !important; \n    border: 2px solid ", ";\n    border-radius: 15px;\n    position: absolute;\n    top: 25%;\n    left: 9% !important;\n"])), colors_1.colors.third);
var resultStyle = (0, react_2.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-family:'semibold';\n  text-align: center;\n  font-size: 20px;\n"], ["\n  font-family:'semibold';\n  text-align: center;\n  font-size: 20px;\n"])));
var bigText = (0, react_2.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    font-family: 'semibold';\n    font-size:24px;\n"], ["\n    font-family: 'semibold';\n    font-size:24px;\n"])));
var english = (0, react_2.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    font-family: 'english';\n    font-size:32px;\n"], ["\n    font-family: 'english';\n    font-size:32px;\n"])));
var textBoxStyle = (0, react_2.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    display:flex;\n    flex-direction:column;\n    margin-top:30px;\n    justify-content:center;\n    align-items:center;\n    gap:20px;\n"], ["\n    display:flex;\n    flex-direction:column;\n    margin-top:30px;\n    justify-content:center;\n    align-items:center;\n    gap:20px;\n"])));
function QrScanByPos(_a) {
    var onClose = _a.onClose, paymentData = _a.paymentData, onResult = _a.onResult;
    var scanner = (0, react_1.useRef)();
    var videoElement = (0, react_1.useRef)(null);
    var qrBoxElement = (0, react_1.useRef)(null);
    var _b = (0, react_1.useState)(true), qrOn = _b[0], setQrOn = _b[1];
    // const [openResultModal, setOpenResultModal] = useState<boolean>(false);
    // 결과 
    var _c = (0, react_1.useState)(), scannedResult = _c[0], setScannedResult = _c[1];
    // 성공
    function onScanSuccuess(result) {
        try {
            var data = JSON.parse(result.data);
            setScannedResult(data);
            console.log('파싱된 QR 데이터', data);
            // 결제 데이터 합치기
            var payData = __assign(__assign({}, data), paymentData);
            if (payData) {
                onResult(payData); // 상위로 데이터 보내기
                onClose(); // QR스캔 닫기
            }
            // setOpenResultModal(true) // 결제 모달 열기
        }
        catch (error) {
            console.log(error);
        }
        // 받은 계좌, uuid정보 ! data넣어서 백에 보내기!!
    }
    function onScanFail(error) {
        console.log(error);
    }
    (0, react_1.useEffect)(function () {
        var _a;
        if ((videoElement === null || videoElement === void 0 ? void 0 : videoElement.current) && !scanner.current) {
            scanner.current = new qr_scanner_1.default(videoElement === null || videoElement === void 0 ? void 0 : videoElement.current, onScanSuccuess, {
                onDecodeError: onScanFail,
                preferredCamera: "environment", // 후면지향
                maxScansPerSecond: 2, // 1초당 2번
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
    return ((0, jsx_runtime_1.jsxs)("div", { css: qrReaderLayoutStyle, children: [(0, jsx_runtime_1.jsx)(HeaderWithXbutton_1.default, { onXClick: onClose }), !scannedResult &&
                (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("video", { ref: videoElement }), (0, jsx_runtime_1.jsx)("div", { css: qrBoxStyle, ref: qrBoxElement }), (0, jsx_runtime_1.jsx)("div", { css: textBoxStyle, children: (0, jsx_runtime_1.jsxs)("div", { css: bigText, children: [(0, jsx_runtime_1.jsx)("span", { css: english, children: "QR" }), "\uCF54\uB4DC\uB97C \uC2A4\uCE94\uD558\uC138\uC694"] }) })] })] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
