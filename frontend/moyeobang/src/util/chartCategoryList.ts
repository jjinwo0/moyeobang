import { colors } from "@/styles/colors";
import activity from '@/assets/icons/amusementpark.png';
import airplane from '@/assets/icons/airplane.webp';
import coffee from '@/assets/icons/coffee.webp';
import restaurant from '@/assets/icons/restaurant.webp';
import shopping from '@/assets/icons/shoppingBag.webp';
import hotel from '@/assets/icons/hotel.webp';
import etc from '@/assets/icons/bangBang.png';

// 색깔 넣어두기
export const colorList = [
    colors.customGreenBlue, 
    colors.third, 
    colors.fourth, 
    colors.fifth, 
    colors.customBlue, 
    colors.second, 
    colors.first,
    colors.gray, 
]


// 카테고리와 색깔을 반환하는 함수
export function getCategoryImageAndColor(category: string) {
    switch (category) {
        case '숙박':
            return {
                image: hotel,
                color: colorList[0] 
            };
        case '항공':
            return {
                image: airplane,
                color: colorList[5]
            };
        case '카페':
            return {
                image: coffee,
                color: colorList[3]
            };
        case '식당':
            return {
                image: restaurant,
                color: colorList[2]
            };
        case '쇼핑':
            return {
                image: shopping,
                color: colorList[4]
            };
        case '액티비티':
            return {
                image: activity,
                color: colorList[1]
            };
        default:
            return {
                image: etc,
                color: colorList[6]
            };
    }
}