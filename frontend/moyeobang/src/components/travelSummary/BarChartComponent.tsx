import React from 'react';
import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  Cell,
  XAxis,
  LabelList,
  YAxis,
} from 'recharts';
import {css} from '@emotion/react';
import {colors} from '@/styles/colors';

const chartContainerStyle = css`
  width: 100%;
  height: 160px; /* 차트 높이 낮추기 */
`;

// Emotion 스타일 정의
const labelStyle = css`
  font-size: 10px;
  font-family: 'semibold';
  fill: ${colors.black};
`;

interface BarChartProps {
  totalAmount: number;
  amountUsed: number;
}

// Adjust CustomLabelProps to handle optional types and undefined values
interface CustomLabelProps {
  x?: number | string;
  y?: number | string;
  value?: number | string;
}

export function BarChartComponent({totalAmount, amountUsed}: BarChartProps) {
  // 데이터 구조 설정
  const chartData = [
    {name: '총 예산', value: totalAmount},
    {name: '사용 금액', value: amountUsed},
    {name: '잔액', value: totalAmount - amountUsed},
  ];

  // 각 막대의 색상을 정의하는 배열
  const barColors = [colors.gray, colors.second, colors.first];

  // CustomLabel 컴포넌트: 각 막대 위에 커스텀 레이블 표시
  const CustomLabel = ({x, y, value}: CustomLabelProps) => (
    <text
      x={Number(x) + 20} // 레이블 위치 조정 (x를 숫자로 변환)
      y={Number(y) - 5} // 레이블 위치 조정 (y를 숫자로 변환)
      css={labelStyle} // Emotion 스타일 적용
      textAnchor="middle"
    >
      {value !== null && value !== undefined ? `${value}원` : '0원'}
    </text>
  );

  return (
    <div css={chartContainerStyle}>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={chartData}>
          {/* X축 */}
          <XAxis
            dataKey="name"
            tick={{
              fontFamily: 'semibold',
              fontSize: 12,
              fill: colors.lightBlack,
            }}
            tickFormatter={tick => tick || ''} // X축에 표시할 레이블을 설정
            interval={0} // 모든 레이블을 다 표시
            axisLine={false} // X축 선 숨기기
            tickLine={false} // X축 틱 라인 숨기기
          />
          {/* Y축 추가하여 totalAmount에 맞춰 범위 설정 */}
          <YAxis domain={[0, totalAmount * 1.3]} hide={true} />{' '}
          {/* 범위를 1.3배로 조정 */}
          <Tooltip />
          <Bar dataKey="value" barSize={35} radius={[8, 8, 8, 8]}>
            {/* 막대 위에 값 표시 */}
            <LabelList dataKey="value" content={CustomLabel} />
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={barColors[index % barColors.length]} // 각 막대에 색상 적용
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
