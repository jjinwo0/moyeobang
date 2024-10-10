import type {InputHTMLAttributes, ReactNode} from 'react';
import {css} from '@emotion/react';
import 'react';
import searchImg from '@/assets/icons/Search.png';

type LocationInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string | ReactNode;
  onClick: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // 엔터치면 검색
};

const locationInputWrapperStyle = css`
  width: 330px;
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-family: 'regular';
`;

const locationInputStyle = css`
  width: 330px;
  height: 50px;
  border: 1px solid #1ec0ff;
  border-radius: 50px;
  padding: 12px 16px;
  box-sizing: border-box;
  margin-top: 10px;
  padding-right: 10px;
  font-size: 16px;
  font-family: 'semibold';

  &::placeholder {
    color: #b9b9b9;
    font-family: 'regular';
    font-size: 18px;
  }
`;

const searchImgStyle = css`
  position: absolute;
  right: 16px;
  top: 68%;
  width: 25px;
  height: 25px;
  transform: translateY(-50%);
  cursor: pointer;
  pointer-events: auto;
`;

export default function LocationInput({
  label,
  onClick,
  onKeyDown,
  ...props
}: LocationInputProps) {
  return (
    <label css={locationInputWrapperStyle}>
      {label && <span style={{height: '20px'}}>{label}</span>}
      <input
        type="text"
        {...props}
        css={locationInputStyle}
        onKeyDown={onKeyDown}
      />
      <img
        src={searchImg}
        css={searchImgStyle}
        alt="Search"
        onClick={onClick}
      />
    </label>
  );
}
