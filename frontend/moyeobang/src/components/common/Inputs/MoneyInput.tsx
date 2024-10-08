import React from 'react';

import type {InputHTMLAttributes} from 'react';
import {css} from '@emotion/react';
import 'react';

type MoneyInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const moneyContainerStyle = css`
  width: 180px;
  display: flex;
  justify-content: center;
`;

const moneyInputStyle = css`
  width: 150px;
  height: 50px;
  border: 1px solid #1ec0ff;
  border-radius: 50px;
  padding: 12px 16px;
  box-sizing: border-box;
  text-align: center;

  &::placeholder {
    color: #b9b9b9 !important;
  }
`;

const labelInputStyle = css`
  display: flex;
  width: 30px;
  height: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function MoneyInput({label, ...props}: MoneyInputProps) {
  return (
    <div css={moneyContainerStyle}>
      <input type="text" {...props} css={moneyInputStyle} placeholder="금액" />
      <div css={labelInputStyle}>원</div>
    </div>
  );
}
