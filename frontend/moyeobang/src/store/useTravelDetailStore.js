"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zustand_1 = require("zustand");
var middleware_1 = require("zustand/middleware");
var useTravelDetailStore = (0, zustand_1.create)()((0, middleware_1.persist)(function (set) { return ({
    travelId: 0,
    travelName: '',
    travelImg: null,
    startDate: '',
    endDate: '',
    travelPlaceList: [],
    accountId: 0,
    accountNumber: '',
    participantsInfo: [],
    setTravelData: function (_a) {
        var travelId = _a.travelId, travelName = _a.travelName, travelImg = _a.travelImg, startDate = _a.startDate, endDate = _a.endDate, travelPlaceList = _a.travelPlaceList, accountId = _a.accountId, accountNumber = _a.accountNumber, participantsInfo = _a.participantsInfo;
        return set({
            travelId: travelId,
            travelName: travelName,
            travelImg: travelImg,
            startDate: startDate,
            endDate: endDate,
            travelPlaceList: travelPlaceList,
            accountId: accountId,
            accountNumber: accountNumber,
            participantsInfo: participantsInfo,
        });
    },
}); }, {
    name: 'travel-detail-store', // localStorage에 저장될 키 이름
    getStorage: function () { return localStorage; }, // localStorage 사용
}));
exports.default = useTravelDetailStore;
