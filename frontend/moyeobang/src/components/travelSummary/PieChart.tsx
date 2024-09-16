import React from 'react';
import {Pie} from 'react-chartjs-2';
import {css} from '@emotion/react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart as ChartJS, ArcElement} from 'chart.js';
import {colors} from '@/styles/colors';

ChartJS.register(ArcElement, ChartDataLabels); // Chart.js에 플러그인 등록

const chartContainerStyle = css`
  width: 100%;
  height: 100%;
`;

interface PieChartProps {
  consumptionCategory: {categoryName: string; percent: number}[];
}

export function PieChart({consumptionCategory}: PieChartProps) {
  const consumptionCategoryData = {
    labels: consumptionCategory.map(category => category.categoryName),
    datasets: [
      {
        label: '소비 카테고리',
        data: consumptionCategory.map(category => category.percent),
        backgroundColor: [
          colors.third,
          colors.second,
          colors.fifth,
          colors.first,
        ],
        borderWidth: 0, // 파이 조각들 사이의 간격을 없앰
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // 범례 숨기기
      },
      tooltip: {
        enabled: false, // 툴팁 숨기기
      },
      datalabels: {
        color: colors.black, // 데이터 레이블 텍스트 색상
        formatter: (value: number | string, context: any) => {
          const label = context.chart.data.labels[context.dataIndex];
          return [`${label}`, `${value}%`]; // 두 줄로 표시: 첫 줄에 label, 두 번째 줄에 value
        },
        font: {
          family: 'semibold',
          size: 10, // 텍스트 크기 설정
        },
        anchor: 'center', // 텍스트가 중앙에 위치
        align: 'center', // 텍스트 중앙 정렬
      },
    },
  };

  return (
    <div css={chartContainerStyle}>
      <Pie data={consumptionCategoryData} options={options} />
    </div>
  );
}
