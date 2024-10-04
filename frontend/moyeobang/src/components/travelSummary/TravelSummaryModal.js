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
exports.default = TravelSummaryModal;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("react");
var react_swipeable_1 = require("react-swipeable");
var react_2 = require("@emotion/react");
var colors_1 = require("@/styles/colors");
var HeaderWithXbutton_1 = require("../common/Header/HeaderWithXbutton");
var ConsumptionSummary_1 = require("./ConsumptionSummary");
var ImgSummary_1 = require("./ImgSummary");
var MapComponent_1 = require("./MapComponent"); // 지도 컴포넌트 임포트
var bangBang_png_1 = require("@/assets/icons/bangBang.png");
var dayjs_1 = require("dayjs");
require("dayjs/locale/ko"); // 한국어 요일을 위해 한국어 로케일 임포트
var weekday_1 = require("dayjs/plugin/weekday"); // 요일 계산을 위한 플러그인
var updateLocale_1 = require("dayjs/plugin/updateLocale"); // 요일 출력 수정용 플러그인
var travelSummary = {
    locationList: [
        {
            latitude: 33.43143,
            longitude: 126.874237, // 여행 장소들 위도,경도
        },
        {
            latitude: 33.48549374886766,
            longitude: 126.48117326163943, // 여행 장소들 위도,경도
        },
        {
            latitude: 33.3942945,
            longitude: 126.2398813, // 여행 장소들 위도,경도
        },
        {
            latitude: 33.5098305,
            longitude: 126.5233913, // 여행 장소들 위도,경도
        },
    ],
    totalAmount: 1000000, // 전체 예산
    amountUsed: 950000, // 총 사용 금액(여행 끝나고)
    amountComparison: 900000,
    consumptionByCategory: [
        {
            categoryName: '액티비티',
            proportion: 15.5,
            balance: 80000,
        },
        {
            categoryName: '식당, 카페',
            proportion: 35,
            balance: 121000,
        },
        {
            categoryName: '할공, 호텔',
            proportion: 25.5,
            balance: 121000,
        },
        {
            categoryName: '기타',
            proportion: 15,
            balance: 121000,
        },
    ],
    consumptionTag: [
        '맛집탐방 했나방',
        '카페인 중독인가방',
        '장바구니 가득 채웠나방',
        '맥시멀리스트인가방',
    ], // 소비 태그 (문구는 프론트에서 정하는건가...?)
    consumptionByMember: [
        {
            categoryName: {
                memberId: 1,
                memberName: '두홍',
                profileImage: bangBang_png_1.default,
            },
            proportion: 30,
            balance: 300000,
        },
        {
            categoryName: {
                memberId: 2,
                memberName: '가현',
                profileImage: bangBang_png_1.default,
            },
            proportion: 20,
            balance: 200000,
        },
        {
            categoryName: {
                memberId: 3,
                memberName: '지연',
                profileImage: bangBang_png_1.default,
            },
            proportion: 15,
            balance: 150000,
        },
        {
            categoryName: {
                memberId: 4,
                memberName: '두열',
                profileImage: bangBang_png_1.default,
            },
            proportion: 15,
            balance: 150000,
        },
        {
            categoryName: {
                memberId: 5,
                memberName: '훈민',
                profileImage: bangBang_png_1.default,
            },
            proportion: 10,
            balance: 100000,
        },
        {
            categoryName: {
                memberId: 6,
                memberName: '진우',
                profileImage: bangBang_png_1.default,
            },
            proportion: 10,
            balance: 100000,
        },
    ],
    imgSummary: [
        {
            imgUrl: bangBang_png_1.default,
            locationName: '제주공항',
        },
        {
            imgUrl: bangBang_png_1.default,
            locationName: '제주공항',
        },
        {
            imgUrl: bangBang_png_1.default,
            locationName: '제주공항',
        },
        {
            imgUrl: bangBang_png_1.default,
            locationName: '제주공항',
        },
        {
            imgUrl: bangBang_png_1.default,
            locationName: '제주공항',
        },
        {
            imgUrl: bangBang_png_1.default,
            locationName: '제주공항',
        },
        {
            imgUrl: bangBang_png_1.default,
            locationName: '제주공항',
        },
    ], // 이미지&장소이름 8개 리스트
};
var modalOverlayStyle = (0, react_2.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: white;\n  display: flex;\n  justify-content: center;\n  z-index: 100;\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: white;\n  display: flex;\n  justify-content: center;\n  z-index: 100;\n"])));
var modalContentStyle = (0, react_2.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 10px 20px;\n  flex-grow: 1;\n  text-align: center;\n\n  p {\n    font-family: 'semibold';\n    font-size: 13px;\n  }\n"], ["\n  padding: 10px 20px;\n  flex-grow: 1;\n  text-align: center;\n\n  p {\n    font-family: 'semibold';\n    font-size: 13px;\n  }\n"])));
var titleStyle = (0, react_2.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 32px;\n  font-family: 'semibold';\n  text-align: center;\n\n  span {\n    margin-bottom: 0;\n    display: inline;\n  }\n\n  margin-bottom: 5px;\n"], ["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 32px;\n  font-family: 'semibold';\n  text-align: center;\n\n  span {\n    margin-bottom: 0;\n    display: inline;\n  }\n\n  margin-bottom: 5px;\n"])));
var travelNameStyle = (0, react_2.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  color: ", ";\n  border: 3px solid ", ";\n  border-radius: 20px;\n  padding: 5px 10px;\n"], ["\n  color: ", ";\n  border: 3px solid ", ";\n  border-radius: 20px;\n  padding: 5px 10px;\n"])), colors_1.colors.fifth, colors_1.colors.customBlue);
var blackTextStyle = (0, react_2.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  font-family: 'semibold';\n  font-size: 32px;\n  color: ", ";\n"], ["\n  font-family: 'semibold';\n  font-size: 32px;\n  color: ", ";\n"])), colors_1.colors.black);
var travelPlaceStyle = (0, react_2.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  font-family: 'semibold';\n  font-size: 32px;\n  color: ", ";\n"], ["\n  font-family: 'semibold';\n  font-size: 32px;\n  color: ", ";\n"])), colors_1.colors.third);
var modalTitleStyle = (0, react_2.css)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  margin-top: 40px;\n  margin-bottom: 10px;\n"], ["\n  margin-top: 40px;\n  margin-bottom: 10px;\n"])));
var mapContainerStyle = (0, react_2.css)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  margin: 20px 0;\n"], ["\n  margin: 20px 0;\n"])));
var dotContainerStyle = (0, react_2.css)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  margin-top: 0; /* \uBD88\uD544\uC694\uD55C \uB9C8\uC9C4\uC744 \uC5C6\uC570 */\n  /* margin-top: 20px; */\n  /* margin-bottom: 10px; */\n"], ["\n  display: flex;\n  justify-content: center;\n  margin-top: 0; /* \uBD88\uD544\uC694\uD55C \uB9C8\uC9C4\uC744 \uC5C6\uC570 */\n  /* margin-top: 20px; */\n  /* margin-bottom: 10px; */\n"])));
var dotStyle = function (isActive) { return (0, react_2.css)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background-color: ", ";\n  margin: 0 5px;\n"], ["\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background-color: ", ";\n  margin: 0 5px;\n"])), isActive ? colors_1.colors.fifth : colors_1.colors.gray); };
var slideStyle = (0, react_2.css)(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  max-width: 390px;\n"], ["\n  max-width: 390px;\n"])));
dayjs_1.default.extend(weekday_1.default);
dayjs_1.default.extend(updateLocale_1.default);
dayjs_1.default.locale('ko'); // 여기서 한국어 로케일을 설정
// 한국어 요일 설정
dayjs_1.default.updateLocale('ko', {
    weekdays: ['일', '월', '화', '수', '목', '금', '토'],
});
function TravelSummaryModal(_a) {
    var travelName = _a.travelName, startDate = _a.startDate, endDate = _a.endDate, travelPlaceList = _a.travelPlaceList, onClose = _a.onClose;
    // const {travelName, startDate, endDate, travelPlaceList} =
    //   useTravelDetailStore();
    var _b = (0, react_1.useState)(0), currentSlide = _b[0], setCurrentSlide = _b[1]; // 슬라이드 상태
    var slideCount = 2; // 슬라이드 개수
    var slides = [
        (0, jsx_runtime_1.jsx)(ConsumptionSummary_1.default, { travelData: travelSummary }),
        (0, jsx_runtime_1.jsx)(ImgSummary_1.default, { travelImg: travelSummary.imgSummary }),
    ]; // 슬라이드에 표시할 컴포넌트들
    var formattedStartDate = (0, dayjs_1.default)(startDate).format('YYYY-MM-DD (dddd)');
    var formattedEndDate = (0, dayjs_1.default)(endDate).format('YYYY-MM-DD (dddd)');
    // Swipeable 설정
    var handlers = (0, react_swipeable_1.useSwipeable)({
        onSwipedLeft: function () {
            return setCurrentSlide(function (prevSlide) { return (prevSlide + 1) % slideCount; });
        },
        onSwipedRight: function () {
            return setCurrentSlide(function (prevSlide) { return (prevSlide - 1 + slideCount) % slideCount; });
        },
        preventDefaultTouchmoveEvent: true,
        trackMouse: true, // 마우스도 지원
    });
    (0, react_1.useEffect)(function () {
        console.log('여행이름', travelName);
    });
    return ((0, jsx_runtime_1.jsxs)("div", { css: modalOverlayStyle, children: [(0, jsx_runtime_1.jsx)(HeaderWithXbutton_1.default, { onXClick: onClose }), (0, jsx_runtime_1.jsxs)("div", { css: modalContentStyle, children: [(0, jsx_runtime_1.jsxs)("div", { css: modalTitleStyle, children: [(0, jsx_runtime_1.jsxs)("div", { css: titleStyle, children: [(0, jsx_runtime_1.jsx)("span", { css: travelNameStyle, children: travelName }), (0, jsx_runtime_1.jsx)("span", { css: blackTextStyle, children: "\uC758" })] }), (0, jsx_runtime_1.jsx)("span", { css: travelPlaceStyle, children: travelPlaceList.join(' & ') }), (0, jsx_runtime_1.jsx)("span", { css: blackTextStyle, children: " \uC5EC\uD589 \uC694\uC57D" })] }), (0, jsx_runtime_1.jsx)("p", { children: "".concat(formattedStartDate, " ~ ").concat(formattedEndDate) }), currentSlide === 0 && ((0, jsx_runtime_1.jsx)("div", { css: mapContainerStyle, children: (0, jsx_runtime_1.jsx)(MapComponent_1.default, { locationList: travelSummary.locationList, travelPlaceList: travelPlaceList }) })), (0, jsx_runtime_1.jsx)("div", __assign({ css: slideStyle }, handlers, { children: slides[currentSlide] })), (0, jsx_runtime_1.jsx)("div", { css: dotContainerStyle, children: slides.map(function (_, index) { return ((0, jsx_runtime_1.jsx)("div", { css: dotStyle(currentSlide === index), onClick: function () { return setCurrentSlide(index); } }, index)); }) })] })] }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;
