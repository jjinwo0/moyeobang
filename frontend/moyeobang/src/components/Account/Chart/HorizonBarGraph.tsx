import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { colors } from '@/styles/colors';
import { css } from '@emotion/react';
import { RIGHT } from 'react-swipeable';

const rawData = [
  {
    name: '소비 비율',
    '가현': 40,
    '두홍': 24,
    '지연': 10,
    '두열': 16,
  },
];

// 값 합계를 구하고, 각 값을 100으로 정규화
const total = rawData[0]['가현'] + rawData[0]['두홍'] + rawData[0]['지연'] + rawData[0]['두열'];

const data = [
  {
    name: '소비%',
    '가현': ((rawData[0]['가현'] / total) * 100).toFixed(1),
    '두홍': ((rawData[0]['두홍'] / total) * 100).toFixed(1),
    '지연': ((rawData[0]['지연'] / total) * 100).toFixed(1),
    '두열': ((rawData[0]['두열'] / total) * 100).toFixed(1),
  },
];

const titleStyle=css`
    font-family:'regular';
    font-size:15px;
    color: ${colors.strongGray};
    text-align:end;
    padding-right:10px;
`;

export default function HorizonBarGraph() {
  return (
    <div style={{ width: '100%', height: '60px' }}> 
        <div css={titleStyle}>
            사용 금액 21,5000 (100%) 기준
        </div>
      <ResponsiveContainer width="100%" height="100%"> 
        <BarChart
        layout="vertical"
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }} 
          barGap={0} // 막대 그룹 간 간격 조정
        >
        {/* 그리드 제거 */}
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis 
          type="number" 
          domain={[0, 100]} 
          tick={false}  
          axisLine={false} 
          tickLine={false} 
          height={0}
          />
          <YAxis 
          type="category" 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={false} 
          width={0}
          />
          <Tooltip />
          {/* 해당 색에 대한 설명 제거 */}
          {/* <Legend /> */} 
          <Bar dataKey="가현" stackId="a" fill={`${colors.gray}`} radius={[20, 0, 0, 20]}/>
          <Bar dataKey="두홍" stackId="a" fill={`${colors.customGreenBlue}`}/>
          <Bar dataKey="지연" stackId="a" fill={`${colors.third}`}/>
          <Bar dataKey="두열" stackId="a" fill={`${colors.fourth}`} radius={[0, 20, 20, 0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
