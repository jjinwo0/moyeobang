"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zustand_1 = require("zustand");
// Zustand 스토어 생성 시 타입 지정
var useModalStore = (0, zustand_1.create)(function (set) { return ({
    isModalOpen: false,
    travelSummaryModal: false,
    openModal: function () { return set({ isModalOpen: true }); },
    closeModal: function () { return set({ isModalOpen: false }); },
}); });
exports.default = useModalStore;
