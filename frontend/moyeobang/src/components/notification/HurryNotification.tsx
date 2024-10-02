import {css} from '@emotion/react';
import React from 'react';
import siren from '@/assets/icons/siren.webp';

const containerStyle = css`
  width: 100%;
  height: 90px;
`;

const contentStyle = css`
  display: flex; /* 이미지와 텍스트를 가로로 배치 */
  align-items: center; /* 세로 중앙 정렬 */
  padding: 20px;

  img {
    width: 34px;
    margin-right: 20px; /* 이미지와 텍스트 사이 간격 */
  }
`;

const titleStyle = css`
  font-family: 'semibold';
  font-size: 18px;
`;

const textStyle = css`
  font-family: 'regular';
  font-size: 18px;
  margin-left: 5px; /* 제목과 텍스트 사이의 간격 */
`;

const timeStyle = css`
  font-family: 'regular';
  font-size: 12px;
  margin-bottom: 5px;
`;

const requestStyle = css`
  font-family: 'regular';
  font-size: 18px;
  margin-top: 3px;
`;

const travelName: string = '아기돼지오형제';

const memberName: MemberName = '훈민';

export default function HurryNotification() {
  return (
    <div css={containerStyle}>
      <div css={contentStyle}>
        <img src={siren} alt="Notification Icon" />
        <div>
          <p css={timeStyle}>2024.09.03 13:10</p>
          <span css={titleStyle}>{travelName}</span>
          <span css={textStyle}>
            에서 <span css={titleStyle}>{memberName}</span>님의 몫이
            300,000원(20%) 밖에 남지 않았어요!
          </span>
          <p css={requestStyle}>개인입금을 통해 통장에 돈을 채워주세요!</p>
        </div>
      </div>
    </div>
  );
}
