"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorList = void 0;
exports.getCategoryImageAndColor = getCategoryImageAndColor;
var colors_1 = require("@/styles/colors");
var amusementpark_png_1 = require("@/assets/icons/amusementpark.png");
var airplane_webp_1 = require("@/assets/icons/airplane.webp");
var coffe_webp_1 = require("@/assets/icons/coffe.webp");
var restaurant_webp_1 = require("@/assets/icons/restaurant.webp");
var shoppingBag_webp_1 = require("@/assets/icons/shoppingBag.webp");
var hotel_webp_1 = require("@/assets/icons/hotel.webp");
var bangBang_png_1 = require("@/assets/icons/bangBang.png");
// 색깔 넣어두기
exports.colorList = [
    colors_1.colors.gray,
    colors_1.colors.customGreenBlue,
    colors_1.colors.third,
    colors_1.colors.fourth,
    colors_1.colors.fifth,
    colors_1.colors.customBlue,
    colors_1.colors.second,
    colors_1.colors.first,
];
// 카테고리와 색깔을 반환하는 함수
function getCategoryImageAndColor(category) {
    switch (category) {
        case '호텔':
            return {
                image: hotel_webp_1.default,
                color: exports.colorList[1]
            };
        case '항공':
            return {
                image: airplane_webp_1.default,
                color: exports.colorList[6]
            };
        case '카페':
            return {
                image: coffe_webp_1.default,
                color: exports.colorList[4]
            };
        case '식당':
            return {
                image: restaurant_webp_1.default,
                color: exports.colorList[3]
            };
        case '쇼핑':
            return {
                image: shoppingBag_webp_1.default,
                color: exports.colorList[5]
            };
        case '액티비티':
            return {
                image: amusementpark_png_1.default,
                color: exports.colorList[2]
            };
        default:
            return {
                image: bangBang_png_1.default,
                color: exports.colorList[0]
            };
    }
}
