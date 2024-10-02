import React from 'react';
import {css} from '@emotion/react';
import {colors} from '@/styles/colors';
import plusButton from '@/assets/icons/plusButton.png';

const plusImg = css`
  width: 48px;
  height: 48px;
`;

const PlusBtn = ({onClick,}) => {
  return (
    <span onClick={onClick}>
      <img src={plusButton} css={plusImg} />
    </span>
  );
};

export default PlusBtn;
