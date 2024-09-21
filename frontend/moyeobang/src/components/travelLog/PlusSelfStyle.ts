import {css} from '@emotion/react';
import {colors} from '@/styles/colors';

export const plusSelfLayout = css`
  z-index: 20;
  position: fixed;
  top: 50px;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

export const labelStyle = css`
  width: 320px;
  font-family: 'regular';
  font-size: 20px;
  margin-bottom: 10px;
`;

export const timeInputStyle = css`
  display: flex;
  gap: 10px;
`;

export const AMPMSytle = css`
  display: flex;
  flex-direction: column;
`;

const buttonBaseStyle = css`
  width: 60px;
  height: 24px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease; /* 애니메이션 효과 추가 */
`;

export const AMBtnSytle = (AMPMSelection: 'AM' | 'PM') => css`
  ${buttonBaseStyle}
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  border-color: ${colors.gray};
  width: 60px;
  height: 24px;
  font-size: 18px;
  background-color: ${AMPMSelection === 'AM' ? colors.third : colors.white};
  color: ${AMPMSelection === 'AM' ? colors.white : colors.gray};
  border: 1px solid ${AMPMSelection === 'AM' ? colors.third : colors.gray};
`;
export const PMBtnSytle = (AMPMSelection: 'AM' | 'PM') => css`
  ${buttonBaseStyle}
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  border-color: ${colors.gray};
  width: 60px;
  height: 24px;
  font-size: 18px;
  background-color: ${AMPMSelection === 'PM' ? colors.third : colors.white};
  color: ${AMPMSelection === 'PM' ? colors.white : colors.gray};
  border: 1px solid ${AMPMSelection === 'PM' ? colors.third : colors.gray};
`;

export const memoStyle = css`
  width: 320px;
  height: 100px;
  border-radius: 15px;
  border: 1px solid ${colors.third};
  font-size: 18px;
  font-family: 'regular';
  padding: 10px;

  ::placeholder {
    color: #b9b9b9;
  }
`;

export const imgLayout = css`
  display: flex;
  flex-direction: column;
  width: 320px;
  /* align-items: center; */
`;

export const imgLabelStyle = css`
  font-family: 'regular';
  font-size: 20px;
  margin-bottom: 10px;
`;

export const btnLayout = css`
  display: flex;
  justify-content: flex-end;
  width: 320px;
`;
