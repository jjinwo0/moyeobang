/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import React from 'react';

const messageStyle = css`
  background-color: white;
  border: #6f6f6f solid 1.5px;
  border-radius: 5px;
  font-size: 18px;
  font-family: 'medium';
  letter-spacing: -0.25px;
  margin-top: 6.8px;
  padding: 10px 8px;
  position: relative;
  min-width: 160px;
  max-width: 230px;
  z-index: 100;
  text-align: center;
  white-space: normal;
  line-height: 1.4; /* 줄 간격 설정으로 가독성 향상 */

  &:after {
    border-color: transparent transparent white transparent;
    border-style: solid;
    border-width: 0px 5.5px 8px 5.5px;
    content: '';
    display: block;
    right: 30px;
    position: absolute;
    bottom: -8px;
    width: 0;
    z-index: 1;
    transform: rotate(180deg);
  }

  &:before {
    border-color: transparent transparent #6f6f6f transparent;
    border-style: solid;
    border-width: 0 7px 9px 7px;
    content: '';
    display: block;
    right: 28.5px;
    position: absolute;
    bottom: -9px;
    width: 0;
    z-index: 0;
    transform: rotate(180deg);
  }
`;

const MessagePopup = ({children}: {children: string | JSX.Element}) => {
  return <div css={messageStyle}>{children}</div>;
};

export default MessagePopup;
