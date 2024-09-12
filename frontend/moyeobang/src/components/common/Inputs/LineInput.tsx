import React, {useState, InputHTMLAttributes} from 'react';
import {css} from '@emotion/react';
import {colors} from '@/styles/colors';
import deleteCircle from '@/assets/icons/deleteCircle.png'; // 삭제 아이콘 경로

type LineInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const inputContainerStyle = css`
  width: 330px;
  display: flex;
  flex-direction: column;
  position: relative; /* 아이콘 위치를 위한 relative */
  box-sizing: border-box;
`;

const lineInputStyle = css`
  width: 100%;
  border: none;
  border-bottom: 2px solid black; /* 밑줄 스타일 */
  padding: 8px 0;
  font-size: 20px;
  font-family: 'regular';
  outline: none;
  padding-right: 40px; /* 아이콘 공간 확보를 위한 오른쪽 패딩 */
  transition: border-color 0.3s ease;
  box-sizing: border-box; /* 패딩과 보더를 너비에 포함 */

  &:focus {
    border-bottom: 2px solid ${colors.third}; /* 포커스 시 밑줄 색 변경 */
  }

  &::placeholder {
    color: #b9b9b9;
    font-size: 16px;
  }
`;

const labelStyle = css`
  margin-bottom: 8px;
  font-family: 'regular';
  font-size: 14px;
  color: #333;
`;

const deleteIconStyle = css`
  position: absolute;
  right: 10px; /* 아이콘을 인풋 필드의 오른쪽 끝에 고정 */
  top: 65%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export default function LineInput({label, ...props}: LineInputProps) {
  const [inputValue, setInputValue] = useState<string>(''); // 입력 값을 관리하는 상태

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    setInputValue(''); // 입력 값을 지우는 함수
  };

  return (
    <label css={inputContainerStyle}>
      <span css={labelStyle}>{label}</span>
      <input
        type="text"
        {...props}
        value={inputValue}
        onChange={handleInputChange}
        css={lineInputStyle}
      />
      {inputValue && (
        <img
          src={deleteCircle}
          alt="삭제 아이콘"
          css={deleteIconStyle}
          onClick={clearInput} // 클릭 시 입력 값을 지우는 함수 호출
        />
      )}
    </label>
  );
}
