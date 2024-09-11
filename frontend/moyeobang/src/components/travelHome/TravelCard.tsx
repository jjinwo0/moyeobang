import {css} from '@emotion/react';
import defalutSky from '@/assets/images/defaultSky.jpg';
import React from 'react';
import {colors} from '@/styles/colors';

const cardStyle = css`
  display: flex;
  flex-direction: column;
  width: 328px;
  height: 158px;
  border-radius: 10px;
  background-image: url(${defalutSky});
  background-size: cover;
  position: relative; /* 자식 요소를 절대 위치로 배치할 수 있도록 함 */
  padding: 16px;
  margin: 16px 0; /* 위아래로 16px의 간격 추가 */
  overflow: hidden; /* 내부 콘텐츠가 박스 밖으로 나가지 않게 함 */
  box-sizing: border-box;
`;

const overlayStyle = css`
  width: 100%; /* 흰색 박스 크기 */
  height: 100%; /* 흰색 박스 크기 */
  background-color: rgba(255, 255, 255, 0.7); /* 흰색 배경 + 70% 투명도 */
  border-radius: 10px; /* 모서리 둥글게 */
  position: absolute; /* 부모 요소 안에서 절대 위치 */
  top: 0; /* 상단부터 채우기 */
  left: 0; /* 왼쪽부터 채우기 */
  z-index: 1; /* 배경 이미지보다 위에 오도록 설정 */
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const titleStyle = css`
  font-size: 24px;
  font-family: 'bold';
  color: ${colors.fifth};
  margin-bottom: 15px;
`;

const participantsStyle = css`
  font-size: 15px;
  font-family: 'semibold';
  margin-bottom: 15px;
`;

const dateStyle = css`
  font-size: 15px;
  font-family: 'semibold';
  color: ${colors.strongGray};
  margin-bottom: 15px;
`;

const locationStyle = css`
  font-size: 20px;
  font-family: 'semibold';
`;

interface TravelCardProps {
  title: string;
  startDate: string;
  endDate: string;
  place: string[];
}

const TravelCard: React.FC<TravelCardProps> = ({
  title,
  startDate,
  endDate,
  place,
}) => {
  return (
    <div css={cardStyle}>
      <div css={overlayStyle}>
        <h2 css={titleStyle}>{title}</h2>
        <p css={participantsStyle}>n 명과 함께</p>
        <p css={dateStyle}>
          {startDate} ~ {endDate}
        </p>
        <p css={locationStyle}>{place.join(', ')}</p>
      </div>
    </div>
  );
};

export default TravelCard;
