import type {InputHTMLAttributes} from 'react';
import {css} from '@emotion/react';
import 'react';

type TimeInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const timeContainerStyle = css`
  width: 120px;
  display: flex;
  justify-content: center;
`;

const timeInputStyle = css`
  width: 100px;
  height: 45px;
  border: 1px solid #1ec0ff;
  border-radius: 50px;
  padding: 12px 16px;
  box-sizing: border-box;
  text-align: center;
  font-size: 18px;

  &::placeholder {
    color: #b9b9b9 !important;
    font-size: 18px;
  }
`;

const labelInputStyle = css`
  display: flex;
  width: 33px;
  height: 46px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function TimeInput({label, ...props}: TimeInputProps) {

  return (
    <div css={timeContainerStyle}>
      <input type="text" {...props} css={timeInputStyle} placeholder={label} />
      <div css={labelInputStyle}>{label}</div>
    </div>
  );
}
