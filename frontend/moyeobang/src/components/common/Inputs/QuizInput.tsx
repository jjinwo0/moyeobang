import type {InputHTMLAttributes} from 'react';
import {css} from '@emotion/react';
import 'react';

type QuizInputProps = InputHTMLAttributes<HTMLInputElement> & {
  title?: string; // Title is optional now
  label: string;
};

const containerStyle = css`
  box-sizing: border-box;
  width: 326px;
  display: flex;
  flex-direction: column; /* Stack elements vertically */
  /* margin-right: 10px; */
`;

const titleStyle = css`
  margin-bottom: 8px; /* Add space between title and input */
  font-family: 'regular';
`;

const inputContainerStyle = css`
  display: flex;
  justify-content: space-between; /* Aligns the label and input */
  align-items: center; /* Centers them vertically */
`;

const labelStyle = css`
  margin-right: 22px; /* Adds space between the label and input */
  font-family: 'englishbold'; /* Ensures font style consistency */
  margin-left: 5px;
  margin-top: 10px;
`;

const quizInputStyle = css`
  flex-grow: 1; /* Allow the input to take remaining space */
  height: 50px;
  border: 1px solid #1ec0ff;
  border-radius: 50px;
  padding: 12px 16px;
  box-sizing: border-box;
  margin-top: 10px;
  font-family: 'semibold';
  font-size: 16px;

  &::placeholder {
    color: #b9b9b9 !important;
    font-family: 'regular';
  }
`;

export default function QuizInput({title, label, ...props}: QuizInputProps) {
  return (
    <div css={containerStyle}>
      {/* Render the title only if it's provided */}
      {title && <p css={titleStyle}>{title}</p>}
      <label css={inputContainerStyle}>
        <span css={labelStyle}>{label}</span>
        <input type="text" {...props} css={quizInputStyle} />
      </label>
    </div>
  );
}
