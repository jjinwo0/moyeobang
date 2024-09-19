import React from 'react';
import {css} from '@emotion/react';
import {BarChartComponent} from './BarChartComponent';
import {PieChart, PieChartComponent} from './PieChartComponent';
import {colors} from '@/styles/colors';
import ConsumptionRank from './ConsumptionRank';
import restaurantIcon from '@/assets/icons/dish.webp';
// import cafeIcon from '@/assets/icons/coffe.webp';
import coffeeIcon from '@/assets/icons/coffeIcon.png';
import shoppingCartIcon from '@/assets/icons/shoppingCart.webp';
import shoppingBagIcon from '@/assets/icons/shoppingBag.webp';
import bangBang from '@/assets/icons/bangBang.png';

const containerStyle = css`
  height: 100%;
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const summaryContainerStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40%;
`;

const summaryBoxStyle = css`
  background: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  width: 40%;
  height: 40%;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const pieChartStyle = css`
  background: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  width: 40%;
  height: 40%;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px; /* 아래로 내리기 위해 margin 추가 */
`;

const tagsContainerStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const rankingBoxStyle = css`
  background: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  width: 40%;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const tagsBoxStyle = css`
  background: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  width: 40%;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  ul {
    margin-top: 10px;
  }
`;

const tagBackground = [
  colors.lightGray,
  colors.customLightBlue,
  `rgba(135, 224, 255, 0.7)`,
  colors.first,
];

const tagStyle = (index: number) => css`
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 이미지와 텍스트를 세로 중앙 정렬 */
  /* text-align: center; */
  background-color: ${tagBackground[index % tagBackground.length]};
  border-radius: 5px;
  margin-bottom: 5px;
  font-size: 12px;
  font-family: 'semibold';
  padding: 5px; /* 텍스트와 이미지 사이에 여백 추가 */
`;

interface ConsumptionSummaryProps {
  travelData: TravelSummary;
}

export default function ConsumptionSummary({
  travelData,
}: ConsumptionSummaryProps) {
  const {
    totalAmount,
    amountUsed,
    amountComparison,
    consumptionCategory,
    participantsConsumption,
    consumptionTag,
  } = travelData;

  // 금액 비교 함수: amountUsed가 amountComparison 보다 크면 +, 작으면 -
  const calAmountComparison = () => {
    const difference = amountUsed - amountComparison;
    const isPositive = difference > 0;

    // 글자 색상과 기호를 동적으로 반환
    const comparisonStyle = css`
      color: ${isPositive ? colors.customRed : colors.customBlue};
    `;

    return (
      <span css={comparisonStyle}>
        {isPositive
          ? `+${difference.toLocaleString()}`
          : `${difference.toLocaleString()}`}
      </span>
    );
  };

  // 아이콘 이미지 경로를 태그와 매핑하는 함수
  const getIconForTag = (tag: string) => {
    switch (tag) {
      case '맛집탐방 했나방':
        return restaurantIcon; // 로컬에 저장된 음식점 관련 이미지 경로
      case '카페인 중독인가방':
        return coffeeIcon; // 로컬에 저장된 카페 관련 이미지 경로
      case '장바구니 가득 채웠나방':
        return shoppingCartIcon; // 로컬에 저장된 마트 관련 이미지 경로
      case '맥시멀리스트인가방':
        return shoppingBagIcon; // 로컬에 저장된 기념품 관련 이미지 경로
      default:
        return bangBang; // 기본 이미지 경로
    }
  };

  return (
    <div css={containerStyle}>
      <div css={summaryContainerStyle}>
        <div css={summaryBoxStyle}>
          <h3>예산 현황</h3>
          <BarChartComponent
            totalAmount={totalAmount}
            amountUsed={amountUsed}
          />
          <p>
            다른 여행보다 <br />
            {calAmountComparison()} 원 썼나방
          </p>
        </div>

        <div css={pieChartStyle}>
          <h3>소비 카테고리</h3>
          <PieChartComponent consumptionCategory={consumptionCategory} />
        </div>
      </div>

      <div css={tagsContainerStyle}>
        <div css={rankingBoxStyle}>
          <h3>소비 랭크</h3>
          <ConsumptionRank participantsConsumption={participantsConsumption} />
        </div>

        <div css={tagsBoxStyle}>
          <h3>소비 태그</h3>
          <ul>
            {consumptionTag.map((tag, index) => (
              <li key={index} css={tagStyle(index)}>
                {/* 아이콘과 텍스트를 같은 줄에 맞추기 */}
                <img
                  src={getIconForTag(tag)}
                  style={{width: '24px', height: '24px'}}
                />
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
