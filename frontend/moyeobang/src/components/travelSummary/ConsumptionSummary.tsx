import React from 'react';
import {Bar, Pie} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import {css} from '@emotion/react';
import {colors} from '@/styles/colors';

// Chart.js 등록
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

// 스타일 정의
const containerStyle = css`
  margin: 40px 0;
  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const mapStyle = css`
  width: 100%;
  //   max-width: 500px;
  margin: 20px 0;
`;

const summaryContainerStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  //   max-width: 900px;
`;

const summaryBoxStyle = css`
  background: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  width: 40%;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const tagsContainerStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  //   max-width: 900px;
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
  'rgba(135, 224, 255, 0.7)', // #87E0FF에 투명도 50% 적용,
  colors.first,
];
const tagStyle = (index: number) => css`
  background-color: ${tagBackground[
    index % tagBackground.length
  ]}; /* index에 따라 배경색 선택 */
  //   background-color: #f0f0f0;
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 5px;
  font-size: 12px;
  font-family: 'semibold';
`;

// ConsumptionSummaryProps 타입 정의
interface ConsumptionSummaryProps {
  travelData: TravelSummary;
}

// ConsumptionSummary 컴포넌트
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

  // 예산 현황 막대 그래프 데이터
  const budgetData = {
    labels: ['총 예산', '사용 금액'],
    datasets: [
      {
        label: '예산 현황',
        data: [totalAmount, amountUsed],
        backgroundColor: ['#ddd', '#007bff'],
      },
    ],
  };

  // 소비 카테고리 원형 그래프 데이터
  const consumptionCategoryData = {
    labels: consumptionCategory.map(category => category.categoryName),
    datasets: [
      {
        label: '소비 카테고리',
        data: consumptionCategory.map(category => category.percent),
        backgroundColor: ['#007bff', '#ffdd57', '#57dd57', '#888888'],
      },
    ],
  };

  return (
    <div css={containerStyle}>
      <div css={summaryContainerStyle}>
        <div css={summaryBoxStyle}>
          <h3>예산 현황</h3>
          <Bar data={budgetData} options={{responsive: true}} />
          <p>다른 여행보다 +500000원 썼나방</p>
        </div>

        <div css={summaryBoxStyle}>
          <h3>소비 카테고리</h3>
          <Pie data={consumptionCategoryData} options={{responsive: true}} />
        </div>
      </div>

      <div css={tagsContainerStyle}>
        <div css={rankingBoxStyle}>
          <h3>소비 랭크</h3>
          <ul>
            {participantsConsumption.map((participant, index) => (
              <li key={index}>
                {index + 1}. {participant.name}/{participant.amount}
              </li>
            ))}
          </ul>
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
