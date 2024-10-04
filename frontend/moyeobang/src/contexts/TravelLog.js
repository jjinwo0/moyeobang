"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTravelLogContext = exports.TravelLogProvider = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("react");
var useTravelDetailStore_1 = require("@/store/useTravelDetailStore");
// Context 생성
var TravelLogContext = (0, react_1.createContext)(null);
// Provider 컴포넌트 생성
var TravelLogProvider = function (_a) {
    var children = _a.children;
    var initialDaySchedule = [
        {
            dayNum: 1,
            dayDate: '2024-10-01',
            daySchedules: [
                {
                    scheduleId: 67890,
                    isSelfPlus: true,
                    scheduleTitle: '도쿄 타워 방문',
                    scheduleLocation: {
                        googlePlaceId: 'ChIJ1x9-lADvYjURbMl_CjjFXjg',
                        title: '소울로스터리커피',
                        address: '대한민국 강원특별자치도 춘천시 소양강로 538',
                        latitude: 37.9243555,
                        longitude: 127.7672156,
                        category: '카페',
                    },
                    scheduleTime: '2024-10-01T10:00:00',
                    budget: 50000,
                    completion: 'completed',
                    memo: '도쿄 타워가서 누구보다 신나게 놀아야지',
                    scheduleImg: '',
                    matchedTransaction: {
                        transactionId: 78901,
                        paymentName: '도쿄 타워 입장료 결제',
                        totalPrice: 50000,
                        paymentTime: '2024-10-01T12:15:00',
                        splitMethod: 'custom', // 결제 내역 상세조회랑 동일, 정산 방식: "receipt" (영수증 정산) 또는 "custom" (default(1/n), 사용자 지정)
                        participantsInfo: [
                            {
                                memberId: 1,
                                memberName: '김훈민',
                                profileImage: '/assets/images/profile.jpg',
                            },
                            {
                                memberId: 2,
                                memberName: '이수민',
                                profileImage: '/assets/images/profile.jpg',
                            },
                        ],
                    },
                },
                {
                    transactionId: 78902,
                    isSelfPlus: false,
                    paymentName: '신주쿠 카페 결제',
                    latitude: 37.85294409999999,
                    longitude: 127.7672156,
                    totalPrice: 25000,
                    paymentTime: '2024-10-01T16:00:00',
                    splitMethod: 'receipt', // 정산 방식
                    participantsInfo: [
                        {
                            memberId: 1,
                            memberName: '김훈민',
                            profileImage: '/images/profiles/1.png',
                        },
                        {
                            memberId: 2,
                            memberName: '이수민',
                            profileImage: '/images/profiles/2.png',
                        },
                        {
                            memberId: '3',
                            memberName: '박지현',
                            profileImage: '/images/profiles/3.png',
                        },
                    ],
                },
            ],
        },
        {
            dayNum: 2,
            dayDate: '2024-10-02',
            daySchedules: [
                {
                    scheduleId: 67891,
                    isSelfPlus: true,
                    scheduleTitle: '시부야 거리 탐방',
                    scheduleLocation: {
                        googlePlaceId: 'ChIJ1x9-lADvYjURbMl_CjjFXjg',
                        title: '소울로스터리커피',
                        address: '대한민국 강원특별자치도 춘천시 소양강로 538',
                        latitude: 37.9243555,
                        longitude: 127.7672156,
                        category: '카페',
                    },
                    scheduleTime: '2024-10-02T13:00:00',
                    budget: 30000,
                    completion: 'pending',
                    memo: '',
                    matchedTransaction: null,
                    scheduleImg: '',
                },
            ],
        },
    ];
    var _b = (0, react_1.useState)(initialDaySchedule), travelSchedules = _b[0], setTravelSchedules = _b[1];
    var _c = (0, react_1.useState)(0), currentIndex = _c[0], setCurrentIndex = _c[1];
    var _d = (0, react_1.useState)(), searchLocation = _d[0], setSearchLocation = _d[1];
    var handleSearchLocation = function (e) {
        if (typeof e === 'string') {
            setSearchLocation(e);
            setScheduleName(e);
        }
        else {
            setSearchLocation(e.target.value);
            setScheduleName(e.target.value);
        }
    };
    var _e = (0, useTravelDetailStore_1.default)(), travelPlaceList = _e.travelPlaceList, startDate = _e.startDate, endDate = _e.endDate, travelName = _e.travelName;
    var _f = (0, react_1.useState)(travelPlaceList[0]), selectedPlace = _f[0], setSelectedPlace = _f[1];
    // 여행 일수 계산
    var travelDates = [];
    var currentDate = new Date(startDate);
    var lastDate = new Date(endDate);
    while (currentDate <= lastDate) {
        var dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][currentDate.getDay()];
        travelDates.push("".concat(currentDate.toISOString().split('T')[0], " (").concat(dayOfWeek, ")")); // YYYY-MM-DD (요일) 형식으로 추가
        currentDate.setDate(currentDate.getDate() + 1);
    }
    // 자신의 일정 추가 모달
    var _g = (0, react_1.useState)(false), showPlusSelf = _g[0], setShowPlusSelf = _g[1];
    var _h = (0, react_1.useState)(null), scheduleEdit = _h[0], setScheduleEdit = _h[1];
    var handleShowPlusSelf = function () {
        setShowPlusSelf(!showPlusSelf);
    };
    // 지도 검색 모달
    var _j = (0, react_1.useState)(false), showMapSearch = _j[0], setShowMapSearch = _j[1];
    var handleShowMapSearch = function () {
        setShowMapSearch(!showMapSearch);
    };
    var _k = (0, react_1.useState)(), scheduleName = _k[0], setScheduleName = _k[1];
    // scheduleDayNum 실제 day를 알 수 있다.
    // scheduleDayNum-1을 하면 인덱스를 알 수 있다.
    var _l = (0, react_1.useState)(1), scheduleDayNum = _l[0], setScheduleDayNum = _l[1];
    // type ExtendedMarkerOptions = google.maps.Marker & {
    //   position?: {
    //     lat: number;
    //     lng: number;
    //   };
    //   googlePlaceId?: string;
    //   placeName?: string;
    //   address?: string;
    //   category?: string;
    // };
    // // 여기서 selectedMarker 상태를 추가
    // const [selectedMarker, setSelectedMarker] =
    //   useState<ExtendedMarkerOptions | null>(null);
    // `selectedMarker`를 이 확장된 타입으로 선언
    var _m = (0, react_1.useState)(null), selectedMarker = _m[0], setSelectedMarker = _m[1];
    return ((0, jsx_runtime_1.jsx)(TravelLogContext.Provider, { value: {
            travelSchedules: travelSchedules,
            currentIndex: currentIndex,
            setCurrentIndex: setCurrentIndex,
            setTravelSchedules: setTravelSchedules,
            searchLocation: searchLocation,
            setSearchLocation: setSearchLocation,
            selectedPlace: selectedPlace,
            setSelectedPlace: setSelectedPlace,
            scheduleDayNum: scheduleDayNum,
            setScheduleDayNum: setScheduleDayNum,
            selectedMarker: selectedMarker,
            setSelectedMarker: setSelectedMarker,
            showMapSearch: showMapSearch,
            setShowMapSearch: setShowMapSearch,
            handleShowMapSearch: handleShowMapSearch,
            handleSearchLocation: handleSearchLocation,
            scheduleName: scheduleName,
            setScheduleName: setScheduleName,
            showPlusSelf: showPlusSelf,
            handleShowPlusSelf: handleShowPlusSelf,
            travelDates: travelDates,
            scheduleEdit: scheduleEdit,
            setScheduleEdit: setScheduleEdit,
        }, children: children }));
};
exports.TravelLogProvider = TravelLogProvider;
// Context 사용을 위한 custom hook 생성
var useTravelLogContext = function () {
    var context = (0, react_1.useContext)(TravelLogContext);
    if (!context) {
        throw new Error('useTravelLogContext must be used within a TravelLogProvider');
    }
    return context;
};
exports.useTravelLogContext = useTravelLogContext;
