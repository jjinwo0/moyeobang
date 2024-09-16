import React from 'react';
import {css} from '@emotion/react';
import {BarChartComponent} from './BarChartComponent';
import {PieChart} from './PieChart';
import {colors} from '@/styles/colors';
import ConsumptionRank from './ConsumptionRank';

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
`;

const tagBackground = [
  colors.lightGray,
  colors.customLightBlue,
  `rgba(135, 224, 255, 0.7)`,
  colors.first,
];

const tagStyle = (index: number) => css`
  background-color: ${tagBackground[index % tagBackground.length]};
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 5px;
  font-size: 12px;
  font-family: 'semibold';
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
    consumptionCategory,
    participantsConsumption,
    consumptionTag,
  } = travelData;

  return (
    <div css={containerStyle}>
      <div css={summaryContainerStyle}>
        <div css={summaryBoxStyle}>
          <h3>예산 현황</h3>
          <BarChartComponent
            totalAmount={totalAmount}
            amountUsed={amountUsed}
          />
          <p>다른 여행보다 +500000원 썼나방</p>
        </div>

        <div css={pieChartStyle}>
          <h3>소비 카테고리</h3>
          <PieChart consumptionCategory={consumptionCategory} />
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
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
