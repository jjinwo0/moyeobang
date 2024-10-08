import {useRouter} from '@tanstack/react-router';
// import XImg from '@/assets/icons/deleteButton.png'
import XImg from '@/assets/icons/closeButton.png';

import {css} from '@emotion/react';

const XButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  background-color: transparent;
  border: 0;
`;

const XButtonImgStyle = css`
  width: 15px;
  height: 15px;
`;

export default function XButton() {

  return (
    <button css={XButtonStyle}>
      <img css={XButtonImgStyle} src={XImg} />
    </button>
  );
}
