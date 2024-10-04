"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_router_1 = require("@tanstack/react-router");
var react_1 = require("react");
var QuizComponent_1 = require("@/components/quiz/QuizComponent");
var react_query_1 = require("@tanstack/react-query");
var moyeobang_1 = require("@/services/moyeobang");
var Spinner_1 = require("@/components/Sipnner/Spinner");
exports.Route = (0, react_router_1.createFileRoute)('/_layout/_protected/_layout/quiz/$travelId')({
    component: QuizPage,
});
// 더미 데이터
var data = {
    question: '문제요',
    travelName: '아기돼지 오형제',
};
function QuizPage() {
    var location = (0, react_router_1.useLocation)(); // 현재 location 정보를 가져옴
    var _a = (0, react_1.useState)(null), travelId = _a[0], setTravelId = _a[1];
    //[todo] get으로 초대퀴즈 조회하기
    var quizData = (0, react_query_1.useQuery)({
        queryKey: ['quiz'],
        queryFn: function () { return moyeobang_1.default.getTravelQuiz(travelId); },
        enabled: travelId !== null
    }).data;
    var data = quizData === null || quizData === void 0 ? void 0 : quizData.data.data;
    (0, react_1.useEffect)(function () {
        var pathSegments = location.pathname.split('/'); // URL 경로를 '/'로 분리
        var extractedTravelId = pathSegments[pathSegments.length - 1]; // 마지막 segment가 travelId
        setTravelId(Number(extractedTravelId)); // travelId를 상태로 저장
    }, [location.pathname]);
    if (!travelId) {
        return (0, jsx_runtime_1.jsx)(Spinner_1.default, {});
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: data ? ((0, jsx_runtime_1.jsx)(QuizComponent_1.default, { question: data.question, travelId: travelId, travelName: data.travelName })) : ((0, jsx_runtime_1.jsx)("p", { children: "\uD034\uC988 \uB370\uC774\uD130\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." })) }));
}
