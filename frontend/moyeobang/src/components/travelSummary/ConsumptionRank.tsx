import React from 'react';
import {css} from '@emotion/react';
import {colors} from '@/styles/colors';
import bangBang from '@/assets/icons/bangBang.png'; // 이미지 import

const podiumContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: flex-end; /* 아래쪽에 정렬 */
  height: 150px;
  margin-top: 20px;
`;

const podiumStyle = (rank: number) => css`
  display: flex;
  justify-content: center;
  align-items: flex-end; /* 막대 안에 등수를 아래쪽으로 배치 */
  background-color: rgba(175, 255, 255, 0.7);
  width: 60px;
  height: ${rank === 1 ? '85px' : rank === 2 ? '55px' : '35px'};
  border: solid 1px ${colors.second};
  font-size: 16px;
  position: relative;
  order: ${rank === 1
    ? 2
    : rank === 2
      ? 1
      : 3}; /* 1등은 가운데로, 2등은 왼쪽, 3등은 오른쪽 */
`;

const rankStyle = css`
  position: absolute;
  font-family: 'surround';
  top: 0; /* 막대의 꼭대기 아래로 위치 */
  transform: translateY(5px); /* 막대의 꼭대기와 일정 거리 */
  font-size: 14px;
`;

const nameStyle = css`
  position: absolute;
  bottom: 100%; /* 막대 위로 올리기 */
  font-size: 14px;
  font-family: 'regular';
  text-align: center;
  width: 100%;
  transform: translateY(-10px); /* 막대와의 거리 조절 */
`;

// 동그랗게 만들고 테두리(stroke)를 추가하는 bangBang 이미지 스타일
const imageStyle = css`
  width: 30px;
  height: 30px;
  border-radius: 50%; /* 둥근 이미지 */
  border: 2px solid ${colors.second}; /* stroke 효과 */
  margin-top: 5px;
`;

interface Participant {
  name: string;
  amount: number;
}

interface ConsumptionRankProps {
  participantsConsumption: Participant[];
}

export default function ConsumptionRank({
  participantsConsumption,
}: ConsumptionRankProps) {
  // 상위 3명의 데이터를 추출
  const topThree = participantsConsumption.slice(0, 3);

  return (
    <div css={podiumContainerStyle}>
      {topThree.map((participant, index) => (
        <div key={index} css={podiumStyle(index + 1)}>
          {/* 등수를 막대 안에 배치 */}
          <div css={rankStyle}>{index + 1}</div>
          {/* 사람 이름과 bangBang 이미지를 막대 위로 표시 */}
          <div css={nameStyle}>
            {participant.name}
            {/* bangBang 이미지 */}
            <img src={bangBang} alt="BangBang" css={imageStyle} />
          </div>
        </div>
      ))}
    </div>
  );
}
