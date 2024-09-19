import React, {useState, useEffect, useRef} from 'react';
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

const imageStyle = css`
  width: 30px;
  height: 30px;
  border-radius: 50%; /* 둥근 이미지 */
  border: 2px solid ${colors.second}; /* stroke 효과 */
  margin-top: 5px;
`;

const amountStyle = css`
  position: absolute;
  bottom: 110%; /* 막대 위로 더 띄우기 */
  left: 50%;
  transform: translateX(-50%); /* 중앙 정렬 */
  background-color: ${colors.lightGray}; /* 배경색 */
  color: ${colors.black}; /* 텍스트 색상 */
  padding: 5px 10px; /* 박스 안 여백 */
  border-radius: 5px; /* 둥근 모서리 */
  font-size: 12px;
  font-family: 'regular';
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 */
  white-space: nowrap; /* 긴 텍스트도 한 줄에 표시 */
  z-index: 100;
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
  const [clickedParticipant, setClickedParticipant] = useState<number | null>(
    null
  ); // 클릭된 참가자 상태
  const containerRef = useRef<HTMLDivElement>(null); // 컨테이너 참조 생성

  // amount로 정렬 후 상위 3명의 데이터를 추출
  const topThree = [...participantsConsumption]
    .sort((a, b) => b.amount - a.amount) // amount 기준 내림차순 정렬
    .slice(0, 3); // 상위 3명만 추출

  // 참가자를 클릭했을 때 실행되는 함수
  const handleClick = (index: number) => {
    setClickedParticipant(index === clickedParticipant ? null : index); // 클릭된 참가자를 토글
  };

  // 영역 밖을 클릭했을 때 툴팁을 숨기는 함수
  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setClickedParticipant(null); // 영역 밖 클릭 시 툴팁 숨기기
    }
  };

  // 마운트 시 전역 클릭 이벤트 리스너 추가, 언마운트 시 제거
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div css={podiumContainerStyle} ref={containerRef}>
      {topThree.map((participant, index) => (
        <div
          key={index}
          css={podiumStyle(index + 1)}
          onClick={() => handleClick(index)} // 클릭 이벤트 추가
        >
          {/* 등수를 막대 안에 배치 */}
          <div css={rankStyle}>{index + 1}</div>
          {/* 사람 이름과 bangBang 이미지를 막대 위로 표시 */}
          {clickedParticipant === index && (
            <div css={amountStyle}>
              {participant.name}
              <br />
              {participant.amount.toLocaleString()}원
            </div>
          )}
          <div css={nameStyle}>
            {participant.name}
            <img src={bangBang} alt="BangBang" css={imageStyle} />
          </div>
        </div>
      ))}
    </div>
  );
}
