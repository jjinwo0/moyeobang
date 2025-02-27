import restaurantIcon from '@/assets/icons/dish.webp';
import coffeeIcon from '@/assets/icons/coffee.webp';
import shoppingCartIcon from '@/assets/icons/shoppingCart.webp';
import shoppingBagIcon from '@/assets/icons/shoppingBag.webp';
import bangBang from '@/assets/icons/bangBang.png';
import hotelIcon from '@/assets/icons/hotel.webp';
import airplaneIcon from '@/assets/icons/airplane.webp';
import activityIcon from '@/assets/icons/amusementpark.png';

// 태그에 따른 아이콘을 반환하는 함수
export function getCategoryTag(categoryName: string) {


  switch (categoryName) {
    case '식당':
      return {
        icon: restaurantIcon,
        label: '맛집탐방 했나방',
      };
    case '카페':
      return {
        icon: coffeeIcon,
        label: '카페인 중독인가방',
      };
    case '쇼핑':
      return {
        icon: shoppingCartIcon,
        label: '장바구니 가득 채웠나방',
      };
    case '숙박':
      return {
        icon: hotelIcon,
        label: '수면테라피 했나방',
      };
    case '항공':
      return {
        icon: airplaneIcon,
        label: '날개잃은 천사인가방',
      };
    case '액티비티':
      return {
        icon: activityIcon,
        label: '날쌘돌이인가방',
      };
    default:
      return {
        icon: bangBang,
        label: '다양하게 소비했나방',
      };
  }
}
