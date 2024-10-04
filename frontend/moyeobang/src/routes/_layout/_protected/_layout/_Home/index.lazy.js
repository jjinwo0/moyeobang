"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_router_1 = require("@tanstack/react-router");
var react_1 = require("react");
var react_2 = require("@emotion/react");
var TravelCard_1 = require("@/components/travelHome/TravelCard");
var colors_1 = require("@/styles/colors");
var bangBang_png_1 = require("@/assets/icons/bangBang.png");
var sadBangbang_png_1 = require("@/assets/icons/sadBangbang.png");
var TwoBtn_1 = require("@/components/common/btn/TwoBtn"); // TwoBtn 컴포넌트 임포트
var plusButton_png_1 = require("@/assets/icons/plusButton.png");
var CreateTravel_tsx_1 = require("@/components/travelHome/CreateTravel.tsx");
var useModalStore_1 = require("@/store/useModalStore");
var NoTravel_1 = require("@/components/travelHome/NoTravel");
var useTravelDetailStore_1 = require("@/store/useTravelDetailStore");
var react_router_2 = require("@tanstack/react-router");
var react_query_1 = require("@tanstack/react-query");
var moyeobang_1 = require("@/services/moyeobang");
var AllowNotification_1 = require("@/components/notification/AllowNotification");
var data = [
    {
        travelId: 1,
        travelName: '여행이름1',
        travelImg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
        participantsCount: 4,
        startDate: '2024-09-10',
        endDate: '2024-09-13',
        travelPlaceList: ['제주도'],
        quizQuestion: '김훈민의 발사이즈는?',
        quizAnswer: '235',
        accountId: 1,
        accountNumber: '123456789123',
        participantsInfo: [
            {
                memberId: 1,
                memberName: '홍길동',
                profileImage: 'https://example.com/images/honggildong.jpg',
            },
            {
                memberId: 2,
                memberName: '김철수',
                profileImage: 'https://example.com/images/kimcheolsu.jpg',
            },
            {
                memberId: 3,
                memberName: '이영희',
                profileImage: 'https://example.com/images/leeyounghee.jpg',
            },
            {
                memberId: 4,
                memberName: '박민수',
                profileImage: 'https://example.com/images/parkminsu.jpg',
            },
        ],
    },
    {
        travelId: 2,
        travelName: '여행제목2',
        travelImg: null,
        participantsCount: 4,
        startDate: '2023-09-01',
        endDate: '2023-09-05',
        travelPlaceList: ['춘천시', '함양군'],
        quizQuestion: '김용수의 키는?',
        quizAnswer: '155',
        accountId: 1,
        accountNumber: '123456789123',
        participantsInfo: [
            {
                memberId: 1,
                memberName: '홍길동',
                profileImage: 'https://example.com/images/honggildong.jpg',
            },
            {
                memberId: 2,
                memberName: '김철수',
                profileImage: 'https://example.com/images/kimcheolsu.jpg',
            },
            {
                memberId: 3,
                memberName: '이영희',
                profileImage: 'https://example.com/images/leeyounghee.jpg',
            },
            {
                memberId: 4,
                memberName: '박민수',
                profileImage: 'https://example.com/images/parkminsu.jpg',
            },
        ],
    },
];
var memberName = '진우바오';
var memberData = {
    memberId: 1,
    memberName: '진우바오',
    profileImage: 'https://example.com/images.jpg',
    accountNumber: '123456789123', // 모여방과 연결된 계좌
};
var containerStyle = (0, react_2.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n"])));
var descriptionStyle = (0, react_2.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  margin-top: 100px;\n  margin-left: 30px;\n  margin-right: 30px;\n  margin-bottom: 35px;\n  white-space: nowrap;\n"], ["\n  display: flex;\n  align-items: center;\n  margin-top: 100px;\n  margin-left: 30px;\n  margin-right: 30px;\n  margin-bottom: 35px;\n  white-space: nowrap;\n"])));
var nickNameTextContainer = (0, react_2.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n"], ["\n  display: flex;\n  flex-direction: column;\n"])));
var nickNameStyle = (0, react_2.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-family: 'surround';\n  font-size: 34px;\n  margin-bottom: 10px;\n"], ["\n  font-family: 'surround';\n  font-size: 34px;\n  margin-bottom: 10px;\n"])));
var textStyle = (0, react_2.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  font-family: 'surround';\n  font-size: 34px;\n  display: inline-block;\n"], ["\n  font-family: 'surround';\n  font-size: 34px;\n  display: inline-block;\n"])));
var textBlueStyle = (0, react_2.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  font-family: 'surround';\n  font-size: 32px;\n  color: ", ";\n  display: inline-block;\n  margin-left: 5px;\n"], ["\n  font-family: 'surround';\n  font-size: 32px;\n  color: ", ";\n  display: inline-block;\n  margin-left: 5px;\n"])), colors_1.colors.fifth);
var profileImageStyle = (0, react_2.css)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n  border: 1px solid ", ";\n  margin-left: 15px;\n"], ["\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n  border: 1px solid ", ";\n  margin-left: 15px;\n"])), colors_1.colors.gray);
var buttonStyle = (0, react_2.css)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  margin-top: 45px;\n"], ["\n  margin-top: 45px;\n"])));
var noTravelStyle = (0, react_2.css)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  display: flex;\n  align-items: center; /* \uC138\uB85C\uCD95 \uC815\uB82C\uC744 \uC911\uC559\uC73C\uB85C \uC124\uC815 */\n  margin-top: 130px;\n  margin-left: 5px;\n"], ["\n  display: flex;\n  align-items: center; /* \uC138\uB85C\uCD95 \uC815\uB82C\uC744 \uC911\uC559\uC73C\uB85C \uC124\uC815 */\n  margin-top: 130px;\n  margin-left: 5px;\n"])));
var noTravelTextStyle = (0, react_2.css)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  font-family: 'semibold';\n  font-size: 20px;\n  color: ", ";\n"], ["\n  font-family: 'semibold';\n  font-size: 20px;\n  color: ", ";\n"])), colors_1.colors.lightBlack);
var sadIconStyle = (0, react_2.css)(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  width: 40px;\n  height: 40px;\n  margin-left: 5px; /* \uD14D\uC2A4\uD2B8\uC640 \uC544\uC774\uCF58 \uC0AC\uC774\uC758 \uAC04\uACA9 \uCD94\uAC00 */\n"], ["\n  width: 40px;\n  height: 40px;\n  margin-left: 5px; /* \uD14D\uC2A4\uD2B8\uC640 \uC544\uC774\uCF58 \uC0AC\uC774\uC758 \uAC04\uACA9 \uCD94\uAC00 */\n"])));
var plusStyle = (0, react_2.css)(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  position: fixed; /* \uB610\uB294 absolute, \uBD80\uBAA8 \uC694\uC18C\uC5D0 \uB530\uB77C \uB2E4\uB984 */\n  bottom: 48px; /* \uD558\uB2E8\uC5D0\uC11C 25px \uC704 */\n  right: 25px; /* \uC624\uB978\uCABD\uC5D0\uC11C 25px \uB5A8\uC5B4\uC9C4 \uC704\uCE58 */\n  width: 48px;\n  height: 48px;\n  z-index: 50; /* \uB2E4\uB978 \uC694\uC18C \uC704\uC5D0 \uC704\uCE58\uD558\uB3C4\uB85D \uC124\uC815 */\n"], ["\n  position: fixed; /* \uB610\uB294 absolute, \uBD80\uBAA8 \uC694\uC18C\uC5D0 \uB530\uB77C \uB2E4\uB984 */\n  bottom: 48px; /* \uD558\uB2E8\uC5D0\uC11C 25px \uC704 */\n  right: 25px; /* \uC624\uB978\uCABD\uC5D0\uC11C 25px \uB5A8\uC5B4\uC9C4 \uC704\uCE58 */\n  width: 48px;\n  height: 48px;\n  z-index: 50; /* \uB2E4\uB978 \uC694\uC18C \uC704\uC5D0 \uC704\uCE58\uD558\uB3C4\uB85D \uC124\uC815 */\n"])));
//[todo] 멤버 아이디 주스탄드에서 꺼내오기!!!
var memberId = 4;
function Index() {
    var _a = (0, useModalStore_1.default)(), isModalOpen = _a.isModalOpen, openModal = _a.openModal, closeModal = _a.closeModal;
    var setTravelData = (0, useTravelDetailStore_1.default)().setTravelData;
    var _b = (0, react_1.useState)('upcoming'), activeTab = _b[0], setActiveTab = _b[1];
    var _c = (0, react_1.useState)(false), pushNotification = _c[0], setPushNotification = _c[1]; // [todo]추후 수정해야함.... 승인 허용 했는지 함수 로직 필요
    // //[todo] get으로 여행 목록 전체 조회하기
    // const {data: travelData} = useSuspenseQuery({
    //   queryKey: [querykeys.TRAVELLIST],
    //   //memberId는 쥬스탄드에서 꺼내쓰기!
    //   queryFn: () => moyeobang.getTravelList(4), // [*todo]일단은 4번 회원 데이터 조회
    // });
    var travelData = (0, react_query_1.useSuspenseQuery)({
        queryKey: ['travelList', memberId],
        // memberId는 Zustand에서 가져오기!
        queryFn: function () {
            return moyeobang_1.default.getTravelList(memberId); // [*todo] 일단은 4번 회원 데이터 조회
        },
    }).data;
    var data = travelData === null || travelData === void 0 ? void 0 : travelData.data.data;
    // console.log(data);
    // 날짜에서 시간 부분을 제거하는 함수
    var normalizeDate = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };
    var today = normalizeDate(new Date());
    // console.log(today);
    // 날짜를 변환한 후 비교
    var upcomingTrips = data
        .filter(function (item) { return normalizeDate(new Date(item.startDate)) > today; })
        .sort(function (a, b) {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    }); // 시작 날짜 순으로 오름차순 정렬
    var pastTrips = data
        .filter(function (item) { return normalizeDate(new Date(item.endDate)) < today; })
        .sort(function (a, b) { return new Date(b.endDate).getTime() - new Date(a.endDate).getTime(); }); // 종료 날짜 순으로 내림차순 정렬
    var currentTrips = data.filter(function (item) {
        return normalizeDate(new Date(item.startDate)) <= today &&
            normalizeDate(new Date(item.endDate)) >= today;
    });
    // activeTab에 따라 표시할 여행 결정
    var tripsToDisplay;
    if (activeTab === 'upcoming') {
        tripsToDisplay = upcomingTrips;
    }
    else if (activeTab === 'past') {
        tripsToDisplay = pastTrips;
    }
    else {
        tripsToDisplay = currentTrips; // 필요에 따라 현재 진행 중인 여행
    }
    // 여행이 하나도 없을 때
    var noTripsAvailable = currentTrips.length === 0 &&
        upcomingTrips.length === 0 &&
        pastTrips.length === 0;
    var router = (0, react_router_2.useRouter)();
    var clickTravelCard = function (travel) {
        console.log('Clicked travel:', travel.travelId); // 어떤 여행이 클릭되었는지 확인
        setTravelData({
            travelId: travel.travelId,
            travelName: travel.travelName,
            travelImg: travel.travelImg,
            startDate: travel.startDate,
            endDate: travel.endDate,
            travelPlaceList: travel.travelPlaceList,
            accountId: travel.accountId,
            accountNumber: travel.accountNumber,
            participantsInfo: travel.participantsInfo,
        }); // 상태 저장
        router.navigate({
            to: "/travelLog",
        });
    };
    var closeTravelSummary = function () {
        setTravelSummaryModal(false);
        router.navigate({ to: "/travelLog" });
    };
    var goSettingPage = function () {
        router.navigate({
            to: "/profile/".concat(memberName),
        });
    };
    var closePush = function () {
        setPushNotification(false);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { css: descriptionStyle, children: [(0, jsx_runtime_1.jsxs)("div", { css: nickNameTextContainer, children: [(0, jsx_runtime_1.jsxs)("p", { css: nickNameStyle, children: [memberName, "\uC758"] }), (0, jsx_runtime_1.jsxs)("span", { css: textStyle, children: ["\uC5EC\uD589\uAE30\uB85D", (0, jsx_runtime_1.jsx)("span", { css: textBlueStyle, children: "\uBAA8\uC5EC\uBC29" })] })] }), (0, jsx_runtime_1.jsx)("img", { src: bangBang_png_1.default, css: profileImageStyle, onClick: goSettingPage })] }), pushNotification && (0, jsx_runtime_1.jsx)(AllowNotification_1.default, { onClose: closePush }), noTripsAvailable ? ((0, jsx_runtime_1.jsx)(NoTravel_1.default, {})) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [currentTrips.length > 0 && ((0, jsx_runtime_1.jsx)("div", { css: containerStyle, children: currentTrips.map(function (trip) { return ((0, jsx_runtime_1.jsx)(TravelCard_1.default, { travelId: trip.travelId, travelName: trip.travelName, startDate: trip.startDate, endDate: trip.endDate, travelPlaceList: trip.travelPlaceList, participantsCount: trip.participantCount, quizQuestion: trip.quizQuestion, quizAnswer: trip.quizAnswer, onClick: function () { return clickTravelCard(trip); }, travelImg: trip.travelImg }, trip.travelId)); }) })), (0, jsx_runtime_1.jsx)("div", { css: buttonStyle, children: (0, jsx_runtime_1.jsx)(TwoBtn_1.default, { leftText: "\uC608\uC815\uC5EC\uD589", rightText: "\uC9C0\uB09C \uC5EC\uD589", onLeftClick: function () { return setActiveTab('upcoming'); }, onRightClick: function () { return setActiveTab('past'); } }) }), (0, jsx_runtime_1.jsx)("div", { css: containerStyle, children: tripsToDisplay.length > 0 ? (tripsToDisplay.map(function (item) { return ((0, jsx_runtime_1.jsx)(TravelCard_1.default, { travelId: item.travelId, travelName: item.travelName, startDate: item.startDate, endDate: item.endDate, travelPlaceList: item.travelPlaceList, participantsCount: item.participantCount, quizQuestion: item.quizQuestion, quizAnswer: item.quizAnswer, onClick: function () { return clickTravelCard(item); }, activeTab: activeTab, travelImg: item.travelImg }, item.travelId)); })) : ((0, jsx_runtime_1.jsxs)("div", { css: noTravelStyle, children: [(0, jsx_runtime_1.jsxs)("span", { css: noTravelTextStyle, children: [activeTab === 'upcoming' ? '예정 여행' : '지난 여행', "\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"] }), (0, jsx_runtime_1.jsx)("img", { src: sadBangbang_png_1.default, css: sadIconStyle })] })) })] })), (0, jsx_runtime_1.jsx)("img", { src: plusButton_png_1.default, css: plusStyle, onClick: openModal }), isModalOpen && (0, jsx_runtime_1.jsx)(CreateTravel_tsx_1.default, { onClose: closeModal })] }));
}
exports.Route = (0, react_router_1.createLazyFileRoute)('/_layout/_protected/_layout/_Home/')({
    component: Index,
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12;
