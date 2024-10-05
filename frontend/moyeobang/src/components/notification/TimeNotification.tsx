import {css} from '@emotion/react';
import React from 'react';
import exclamationMark from '@/assets/icons/exclamationMark.png';

const containerStyle = css`
  width: 100%;
  height: 80px;
`;

const contentStyle = css`
  display: flex; /* 이미지와 텍스트를 가로로 배치 */
  align-items: center; /* 세로 중앙 정렬 */
  padding: 20px;

  img {
    width: 40px;
    margin-right: 12px; /* 이미지와 텍스트 사이 간격 */
  }
`;

const titleStyle = css`
  font-family: 'semibold';
  font-size: 18px;
`;

const textStyle = css`
  font-family: 'regular';
  font-size: 18px;
`;

const timeStyle = css`
  font-family: 'regular';
  font-size: 12px;
  margin-bottom: 5px;
`;

const travelName: string = '아기돼지오형제';

export default function TimeNotification({message}: {message: string}) {
  const timestamp = new Date().toLocaleString();
  return (
    <div css={containerStyle}>
      <div css={contentStyle}>
        <img src={exclamationMark} alt="Notification Icon" />
        <div>
          <p css={timeStyle}>{timestamp}</p>
          {/* <span css={textStyle}>하루를 마무리하는 현재</span>
          <span css={titleStyle}> {travelName}</span>
          <span css={textStyle}>
            에 300,000원 남아있어요!
            <br />
          </span> */}
          <div css={textStyle}>{message}</div>
        </div>
      </div>
    </div>
  );
}
