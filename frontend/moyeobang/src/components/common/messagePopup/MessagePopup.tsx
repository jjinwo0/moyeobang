/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import React from 'react';

const messageStyle = css`
  background-color: white;
  border: #6f6f6f solid 1.5px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  height: auto;
  letter-spacing: -0.25px;
  margin-top: 6.8px;
  padding: 10px 8px;
  position: relative;
  width: fit-content;
  z-index: 100;
  text-align: center;

  &:after {
    border-color: transparent transparent white transparent;
    border-style: solid;
    border-width: 0px 5.5px 8px 5.5px; /* 삼각형을 위쪽으로 변경 */
    content: '';
    display: block;
    right: 30px;
    position: absolute;
    bottom: -8px; /* 말풍선 아래쪽으로 위치 조정 */
    width: 0;
    z-index: 1;
    transform: rotate(180deg); /* 삼각형 회전 적용 */
  }

  &:before {
    border-color: transparent transparent #6f6f6f transparent;
    border-style: solid;
    border-width: 0 7px 9px 7px; /* 테두리 삼각형도 위쪽으로 변경 */
    content: '';
    display: block;
    right: 28.5px;
    position: absolute;
    bottom: -9px; /* 말풍선 아래쪽으로 테두리 삼각형 위치 조정 */
    width: 0;
    z-index: 0;
    transform: rotate(180deg); /* 삼각형 회전 적용 */
  }
`;

const MessagePopup = ({message}: {message: string}) => {
  return <div css={messageStyle}>{message}</div>;
};

export default MessagePopup;
