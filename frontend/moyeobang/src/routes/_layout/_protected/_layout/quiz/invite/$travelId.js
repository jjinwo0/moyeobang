"use strict";
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
exports.Route = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_router_1 = require("@tanstack/react-router");
var react_query_1 = require("@tanstack/react-query");
var react_1 = require("react");
// 초대 링크 라우트 생성
exports.Route = (0, react_router_1.createFileRoute)('/_layout/_protected/_layout/quiz/invite/$travelId')({
    component: InviteQuizPage,
});
// // 초대 링크 처리 컴포넌트
// function InviteQuizPage() {
//   const router = useRouter();
//   const location = useLocation(); // location 정보 가져오기
//   // location.pathname을 통해 travelId 추출
//   const pathSegments = location.pathname.split('/');
//   const travelId = pathSegments[pathSegments.length - 1]; // 마지막 segment가 travelId
//   // 리다이렉트 처리
//   useEffect(() => {
//     if (travelId) {
//       router.navigate({to: `/quiz/${travelId}`});
//     }
//   }, [travelId, router]);
//   return <div>초대 링크를 처리 중입니다...</div>; // 로딩 중 메시지 (선택 사항)
// }
var fetchTokenValidation = function (travelId, token) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (!token) {
            throw new Error('Invalid token');
        }
        return [2 /*return*/, { isValid: true }]; // 토큰이 유효하다고 가정
    });
}); };
function InviteQuizPage(_a) {
    var travelId = _a.travelId;
    var searchParams = new URLSearchParams(window.location.search);
    var token = searchParams.get('token');
    var _b = (0, react_query_1.useSuspenseQuery)({
        queryKey: ['validateToken', travelId, token],
        queryFn: function () { return fetchTokenValidation(travelId, token); },
    }), data = _b.data, isError = _b.isError;
    (0, react_1.useEffect)(function () {
        if (data === null || data === void 0 ? void 0 : data.isValid) {
            // token이 유효하면 quiz 페이지로 리다이렉트
            window.location.replace("/quiz/".concat(travelId));
        }
    }, [data, travelId]);
    if (isError) {
        alert('잘못된 초대 링크입니다.');
        return (0, jsx_runtime_1.jsx)("div", { children: "\uCD08\uB300 \uB9C1\uD06C\uAC00 \uC798\uBABB\uB418\uC5C8\uC2B5\uB2C8\uB2E4." });
    }
    return (0, jsx_runtime_1.jsx)("div", { children: "\uCD08\uB300 \uB9C1\uD06C \uCC98\uB9AC \uC911..." });
}
