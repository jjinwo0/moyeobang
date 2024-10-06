import React from 'react';
import {css} from '@emotion/react';
import {BarChartComponent} from './BarChartComponent';
import {PieChartComponent} from './PieChartComponent';
import {colors} from '@/styles/colors';
import ConsumptionRank from './ConsumptionRank';
import {getCategoryTag} from '@/util/getCategoryTags';

const containerStyle = css`
  height: 100%;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-family: 'semibold';
    font-size: 15px;
  }
`;

const summaryContainerStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30%;
`;

const summaryBoxStyle = css`
  background: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  width: 40%;
  height: 30%;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const pieChartStyle = css`
  background: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  width: 40%;
  height: 30%;
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
  padding: 15px 15px 0 15px;
  border-radius: 10px;
  width: 40%;
  height: 100%;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const tagsBoxStyle = css`
  background: #f9f9f9;
  padding: 15px 15px 10px 15px;
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
  background-color: ${tagBackground[index % tagBackground.length]};
  border-radius: 5px;
  margin-bottom: 5px;
  font-size: 12px;
  font-family: 'semibold';
  padding: 5px;
`;

interface ConsumptionSummaryProps {
  travelData: TravelSummary;
  categoryData: ConsumptionByCategory[];
  memberData: ConsumptionByMember[];
  totalMoney: number;
  totalConsumption: number;
}

export default function ConsumptionSummary({
  travelData,
  categoryData,
  memberData,
  totalMoney,
  totalConsumption,
}: ConsumptionSummaryProps) {
  const {totalAmount, amountUsed, amountComparison} = travelData;

  // 금액 비교 함수
  const calAmountComparison = () => {
    const difference = amountUsed - amountComparison;
    const isPositive = difference > 0;
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

  return (
    <div css={containerStyle}>
      <div css={summaryContainerStyle}>
        <div css={summaryBoxStyle}>
          <h3>예산 현황</h3>
          <BarChartComponent
            totalAmount={totalMoney}
            amountUsed={totalConsumption}
          />
        </div>

        <div css={pieChartStyle}>
          <h3>소비 카테고리</h3>
          <PieChartComponent consumptionByCategory={categoryData} />
        </div>
      </div>

      <div css={tagsContainerStyle}>
        <div css={rankingBoxStyle}>
          <h3>소비 랭크</h3>
          <ConsumptionRank consumptionByMember={memberData} />
        </div>

        <div css={tagsBoxStyle}>
          <h3>소비 태그</h3>
          <ul>
            {categoryData.slice(0, 4).map((category, index) => {
              const {icon, label} = getCategoryTag(category.categoryName);
              return (
                <li key={index} css={tagStyle(index)}>
                  <img src={icon} style={{width: '24px', height: '24px'}} />
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
