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
  font-size: 16px;
  font-family: 'regular';
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
  background-color: ${AMPMSelection === 'PM' ? colors.third : colors.white};
  color: ${AMPMSelection === 'PM' ? colors.white : colors.gray};
  border: 1px solid ${AMPMSelection === 'PM' ? colors.third : colors.gray};
`;

export const memoStyle = css`
  width: 320px;
  height: 100px;
  border-radius: 15px;
  border: 1px solid ${colors.third};
  font-size: 16px;
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
  justify-content: space-around;
  width: 390px;
  margin: 5px 0;
`;

export const inputContainerStyle = css`
  width: 330px;
  flex-direction: column;
  display: flex;
  font-size: 20px;
  font-family: 'regular';
`;

export const labeledInputStyle = css`
  width: 100%;
  height: 50px;
  border: 1px solid #1ec0ff;
  border-radius: 50px;
  padding: 12px 16px;
  box-sizing: border-box;
  margin-top: 10px;
  font-size: 16px;
  font-family: 'semibold';

  &::placeholder {
    color: #b9b9b9 !important;
    font-family: 'regular';
    font-size: 16px;
  }
`;

export const LocationInputLayout = css`
  z-index: 40;
  width: 330px;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-family: 'regular';
`;

export const LocationInputAllLayout = css`
  display: flex;
  justify-content: space-around;
  width: 330px;
  gap: 10px;
`;

export const inputImgWrapper = css`
  position: relative;
  width: 220px;
  height: 50px;
`;

export const LocationInputStyle = css`
  width: 100%;
  height: 100%;
  border: 1px solid #1ec0ff;
  border-radius: 50px;
  padding: 12px 16px;
  box-sizing: border-box;
  margin-top: 10px;
  font-size: 16px;
  font-family: 'semibold';

  &::placeholder {
    color: #b9b9b9;
    font-family: 'regular';
    font-size: 16px;
  }
`;

export const searchImgStyle = css`
  position: absolute;
  right: 16px;
  top: 70%;
  width: 25px;
  height: 25px;
  transform: translateY(-50%);
  cursor: pointer;
`;

export const relativeContainer = css`
  position: relative;
`;

export const placeListStyle = css`
  margin-top: 10px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 12px 16px;
  width: 100px;
  height: 50px;
  border-radius: 15px;
  border: 1px solid #1ec0ff;
  font-size: 16px;
  font-family: 'semibold';
`;

export const dropdownContentStyle = css`
  position: absolute;
  top: 100%; /* Summary 바로 아래에 위치 */
  left: 0;
  width: 100%; /* 부모 요소와 같은 너비 */
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 100;
  padding: 10px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
