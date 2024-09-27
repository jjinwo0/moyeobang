import React from 'react';
import {PieChart, Pie, Cell, Tooltip} from 'recharts';
import {css} from '@emotion/react';
import {colors} from '@/styles/colors';

const chartContainerStyle = css`
  width: 100%;
  height: 100%; /* Adjust container height */
`;

const pieStyle = css`
  margin-top: 10px;
`;

interface PieChartProps {
  consumptionByCategory: {categoryName: string; proportion: number}[];
}

export function PieChartComponent({consumptionByCategory}: PieChartProps) {
  const data = consumptionByCategory.map(category => ({
    name: category.categoryName,
    value: category.proportion,
  }));

  const COLORS = [colors.third, colors.second, colors.fifth, colors.first];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    // 중간 위치를 innerRadius와 outerRadius 중간에 계산
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6; // 0.5에서 0.6으로 수정하여 더 안쪽에 위치
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor="middle" // 텍스트 중앙 정렬
        dominantBaseline="central"
        style={{fontSize: '10px', fontFamily: 'semibold'}}
      >
        <tspan x={x} dy="0">
          {data[index].name}
        </tspan>
        <tspan x={x} dy="12">
          {`${(percent * 100).toFixed(0)}%`}
        </tspan>
      </text>
    );
  };

  return (
    <div css={chartContainerStyle}>
      <div css={pieStyle}>
        <PieChart width={150} height={150}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={70}
            fill="#8884d8"
            labelLine={false} // 기본 라벨 선을 없앰
            label={renderCustomizedLabel} // 커스텀 라벨 함수
            stroke="none" // 경계선 없애기
            cornerRadius={0} // 모서리 둥글지 않게 설정
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}
