import {css} from '@emotion/react';
import {colors} from '@/styles/colors';
import sadBangbang from '@/assets/icons/sadBangbang.png';
import React from 'react';

const noTravelContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  gap: 20px;
`;

const noTravelMessageStyle = css`
  font-family: 'semibold';
  font-size: 30px;
  color: ${colors.black};
`;

const textStyle = css`
  font-family: 'semibold';
  font-size: 24px;
  color: ${colors.black};
`;

const sadIconStyle = css`
  width: 250px;
  height: 250px;
  margin-top: 10px;
`;

export default function NoTravel() {
  return (
    <div css={noTravelContainerStyle}>
      <p css={noTravelMessageStyle}>여행이 없습니다</p>
      <p css={textStyle}>여행을 만들어방</p>
      <img src={sadBangbang} css={sadIconStyle} alt="No travel" />
    </div>
  );
}
