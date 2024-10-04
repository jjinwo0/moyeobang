import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { colors } from '@/styles/colors';
import { css } from '@emotion/react';
import { isConsumptionByMember } from '@/util/typeGaurd';
import { colorList } from '@/util/chartCategoryList';
import { getCategoryImageAndColor } from '@/util/chartCategoryList';

const titleStyle=css`
    font-family:'regular';
    font-size:15px;
    color: ${colors.strongGray};
    text-align:end;
    padding-right:10px;
`;

// 차트에 쓰일 데이터로 변환
function transformChart(data : (ConsumptionProportionByCategory[] | ConsumptionProportionByMember[])) {

  const transformedData = data.reduce((acc, item) => {

    if (isConsumptionByMember(item)) {
      acc[item.member.memberName] = item.proportion;
    } else {
      acc[item.categoryName] = item.proportion;
    }

    return acc;
  }, {} as Record<string, number>); // key가 문자열이고 값이 숫자임을 명시.

  return [{name:'소비비율', ...transformedData}]
}

interface HorizonBarGraphProps {
  data?: ConsumptionProportionByCategory[] | ConsumptionProportionByMember[];
}

export default function HorizonBarGraph({data = []}: HorizonBarGraphProps) {

  // 차트만들 데이터로 변환.
  const chartData = transformChart(data)

  return (
    <div style={{ width: '100%', height: '60px' }}> 
        <div css={titleStyle}>
            {isConsumptionByMember(data[0]) ? '멤버별 입금 비율' : '카테고리별 소비 비율'}
        </div>
      <ResponsiveContainer width="100%" height="100%"> 
        <BarChart
        layout="vertical"
          data={chartData}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }} 
          barGap={0} // 막대 그룹 간 간격 조정
        >
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
          {chartData.length > 0 && Object.keys(chartData[0])
            .filter((key) => key !== 'name') // 'name' 키는 제외
            .map((key, index, arr) => (
              <Bar 
              key={key} 
              dataKey={key} 
              stackId="a" 
              fill={ isConsumptionByMember(data[0]) ? colorList[index] : getCategoryImageAndColor(key).color}  
              radius={ arr.length===1 ? [20, 20, 20, 20] : index===0 ? [20, 0, 0, 20] : index===arr.length-1 ? [0, 20, 20, 0] : undefined} 
              />
            ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
