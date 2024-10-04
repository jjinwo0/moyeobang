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
exports.default = SettleByReceiptComponent;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("react");
var react_2 = require("react");
var react_webcam_1 = require("react-webcam");
var axios_1 = require("axios");
var uuid_1 = require("uuid");
var react_3 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var receiptExtract_1 = require("@/util/receiptExtract");
var FailByReceipt_1 = require("./FailByReceipt");
var ResultByReceiptComponent_1 = require("./ResultByReceiptComponent");
// const api_url= "/api/custom/v1/34393/8f13443da4a5bb3449e36dac1ddda218c4f02d27884df6cd85905363c5603a72/general"
var layoutStyle = (0, react_3.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    width:100%;\n    height:100%;\n    display: flex;\n    flex-direction: column;\n    gap:30px;\n    align-items: center;\n"], ["\n    width:100%;\n    height:100%;\n    display: flex;\n    flex-direction: column;\n    gap:30px;\n    align-items: center;\n"])));
// 이안에 로딩창. 이미지 사진, 웹캠 있음. z-index:0
var cameraStyle = (0, react_3.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    width: 100%;\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index:1;\n    position:relative; \n    // \uC6F9\uCEA0\n    video {\n        width:390px;\n        height:600px;\n        object-fit: cover;\n        z-index:1;\n    }\n    // \uCC0D\uD78C \uC774\uBBF8\uC9C0 \uC774\uBBF8\uC9C0\uC704\uC5D0 \uB85C\uB529\uC120 \uC62C\uB77C\uC640\uC57C\uD568. relative\uC124\uC815.\n    img {\n        height:600px;\n        object-fit: cover;\n        position:relative;\n        z-index:1;\n    }\n"], ["\n    width: 100%;\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index:1;\n    position:relative; \n    // \uC6F9\uCEA0\n    video {\n        width:390px;\n        height:600px;\n        object-fit: cover;\n        z-index:1;\n    }\n    // \uCC0D\uD78C \uC774\uBBF8\uC9C0 \uC774\uBBF8\uC9C0\uC704\uC5D0 \uB85C\uB529\uC120 \uC62C\uB77C\uC640\uC57C\uD568. relative\uC124\uC815.\n    img {\n        height:600px;\n        object-fit: cover;\n        position:relative;\n        z-index:1;\n    }\n"])));
// webcam위에 네모 영역
var rectangleStyle = (0, react_3.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    z-index:2;\n    background-color:transparent;\n    border: solid 3px ", ";\n    width:300px;\n    height:500px;\n    position:absolute;\n"], ["\n    z-index:2;\n    background-color:transparent;\n    border: solid 3px ", ";\n    width:300px;\n    height:500px;\n    position:absolute;\n"])), colors_1.colors.third);
// loading선 이미지위에 올라오기때문에 absolute설정.
var loadingStyle = (0, react_3.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index:3;\n\n    #line{\n        position: absolute;\n        width: 100%;\n        height: 20px;\n        // \uADF8\uB77C\uB370\uC774\uC158 \uD6A8\uACFC\n        background: linear-gradient(\n        to bottom,\n        ", " 0%,      \n        rgba(255, 255, 255, 0) 100% \n    );\n        animation: moveUpDown 3s infinite ease-in-out;     \n    }\n    \n    @keyframes moveUpDown {\n    0% {\n      top: 0;\n    }\n    50% {\n      top: calc(100% - 20px);\n    }\n    100% {\n      top: 0;\n    }\n  }\n"], ["\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index:3;\n\n    #line{\n        position: absolute;\n        width: 100%;\n        height: 20px;\n        // \uADF8\uB77C\uB370\uC774\uC158 \uD6A8\uACFC\n        background: linear-gradient(\n        to bottom,\n        ", " 0%,      \n        rgba(255, 255, 255, 0) 100% \n    );\n        animation: moveUpDown 3s infinite ease-in-out;     \n    }\n    \n    @keyframes moveUpDown {\n    0% {\n      top: 0;\n    }\n    50% {\n      top: calc(100% - 20px);\n    }\n    100% {\n      top: 0;\n    }\n  }\n"])), colors_1.colors.third);
var buttonStyle = (0, react_3.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    width: 80px;\n    height: 80px;\n    border-radius: 50%;\n    border: solid 5px ", ";\n    box-sizing: border-box;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n\n    button {\n        width: 60px;\n        height: 60px;\n        background-color: ", ";\n        border: solid 0px transparent;\n        border-radius: 50%;\n    }\n"], ["\n    width: 80px;\n    height: 80px;\n    border-radius: 50%;\n    border: solid 5px ", ";\n    box-sizing: border-box;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n\n    button {\n        width: 60px;\n        height: 60px;\n        background-color: ", ";\n        border: solid 0px transparent;\n        border-radius: 50%;\n    }\n"])), colors_1.colors.third, colors_1.colors.third);
function SettleByReceiptComponent(_a) {
    var transactionId = _a.transactionId, money = _a.money, paymentName = _a.paymentName, address = _a.address, createdAt = _a.createdAt, acceptedNumber = _a.acceptedNumber;
    var webcamRef = (0, react_2.useRef)(null);
    var _b = (0, react_2.useState)(null), imageSrc = _b[0], setImageSrc = _b[1];
    var _c = (0, react_2.useState)(false), isLoading = _c[0], setIsLoading = _c[1];
    var _d = (0, react_2.useState)(''), error = _d[0], setError = _d[1];
    var _e = (0, react_2.useState)(), results = _e[0], setResults = _e[1];
    var _f = (0, react_2.useState)(false), openResultModal = _f[0], setOpenResultModal = _f[1];
    // Base64 데이터를 Blob 파일로 변환
    var base64ToFile = function (base64Data, filename) {
        var byteString = atob(base64Data.split(",")[1]);
        var mimeString = base64Data.split(",")[0].split(":")[1].split(";")[0];
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new File([ab], filename, { type: mimeString });
    };
    function handleCapture() {
        var _a;
        try {
            var imageSrc_1 = (_a = webcamRef.current) === null || _a === void 0 ? void 0 : _a.getScreenshot();
            if (imageSrc_1) {
                var imageFile = base64ToFile(imageSrc_1, 'receipt.jpeg');
                setImageSrc(imageSrc_1);
                sendToOCR(imageFile);
            }
        }
        catch (_b) {
            setError('카메라 사용이 허용되지 않았습니다.');
        }
    }
    ;
    function sendToOCR(imageFile) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, requestJson, response, itemData, results_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formData = new FormData();
                        requestJson = {
                            version: "V2",
                            requestId: (0, uuid_1.v4)(), // 고유한 문자열 변환!
                            timestamp: new Date().getTime(),
                            // lang: "ko",
                            images: [
                                {
                                    format: "jpeg",
                                    name: "receipt.jpg"
                                }
                            ],
                        };
                        formData.append("message", JSON.stringify(requestJson));
                        formData.append("file", imageFile);
                        setIsLoading(true); // 영수증 인식 시작!
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.post(import.meta.env.VITE_OCRURL, formData, {
                                headers: {
                                    'X-OCR-SECRET': import.meta.env.VITE_OCR_API_KEY,
                                    "Content-Type": "multipart/form-data",
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        // console.log(response.data.images[0].inferResult) // 영수증 이미지 인식 결과 'SUCCESS | FAILURE | ERROR"
                        if (response.data.images[0].inferResult === 'SUCCESS') {
                            console.log('subResults : ', response.data.images[0].receipt.result.subResults[0].items);
                            itemData = response.data.images[0].receipt.result.subResults[0].items.map(function (item) {
                                return { name: (item.name ? item.name.text : '상품명을 입력해주세요'), count: Number(item.count ? item.count.text : 1), price: Number(item.price ? item.price.price.formatted.value : 0) };
                            });
                            // extractItems를 통해 데이터 변환
                            if (itemData) {
                                results_1 = (0, receiptExtract_1.extractItems)(itemData, transactionId, createdAt, money, paymentName, address, acceptedNumber);
                                setResults(results_1);
                                setIsLoading(false);
                                setOpenResultModal(true);
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        setError('영수증 인식 오류 발생');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function handleFailClose() {
        setError('');
        setImageSrc(null);
    }
    function handleClose() {
        setOpenResultModal(false);
        setImageSrc('');
    }
    (0, react_1.useEffect)(function () {
        console.log('isLoading:', isLoading);
    }, [isLoading]);
    return ((0, jsx_runtime_1.jsxs)("div", { css: layoutStyle, children: [results && openResultModal ? ((0, jsx_runtime_1.jsx)(ResultByReceiptComponent_1.default, { data: results, onClose: handleClose, isNew: true })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { css: cameraStyle, children: imageSrc ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("img", { src: imageSrc, alt: "capture_img" }), isLoading && ((0, jsx_runtime_1.jsx)("div", { css: loadingStyle, children: (0, jsx_runtime_1.jsx)("div", { id: 'line' }) }))] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_webcam_1.default, { ref: webcamRef, screenshotFormat: "image/jpeg", videoConstraints: { facingMode: "environment" } }), (0, jsx_runtime_1.jsx)("div", { css: rectangleStyle })] })) }), (0, jsx_runtime_1.jsx)("div", { css: buttonStyle, children: (0, jsx_runtime_1.jsx)("button", { onClick: handleCapture }) })] })), error && (0, jsx_runtime_1.jsx)(FailByReceipt_1.default, { onClose: handleFailClose })] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
