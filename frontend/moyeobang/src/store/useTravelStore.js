"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zustand_1 = require("zustand");
var useTravelStore = (0, zustand_1.create)(function (set) { return ({
    travelId: 0,
    travelName: '',
    startDate: '',
    endDate: '',
    travelPlaceList: [],
    setTravelData: function (id, name, start, end, places) {
        return set({
            travelId: id,
            travelName: name,
            startDate: start,
            endDate: end,
            travelPlaceList: places,
        });
    },
}); });
exports.default = useTravelStore;
