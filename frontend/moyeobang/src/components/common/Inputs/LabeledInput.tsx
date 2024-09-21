import type {InputHTMLAttributes, ReactNode} from 'react';
import {css} from '@emotion/react';
import 'react';

type LabeledInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string | ReactNode;
};

const inputContainerStyle = css`
  width: 330px;
  flex-direction: column;
  display: flex;
  font-size: 20px;
  font-family: 'regular';
`;

const labeledInputStyle = css`
  width: 100%;
  height: 50px;
  border: 1px solid #1ec0ff;
  border-radius: 50px;
  padding: 12px 16px;
  box-sizing: border-box;
  margin-top: 10px;
  font-size: 18px;

  &::placeholder {
    color: #b9b9b9 !important;
    font-family: 'regular';
    font-size: 18px;
  }
`;

export default function LabeledInput({label, ...props}: LabeledInputProps) {
  return (
    <label css={inputContainerStyle}>
      {label}
      <input type="text" {...props} css={labeledInputStyle} />
    </label>
  );
}
