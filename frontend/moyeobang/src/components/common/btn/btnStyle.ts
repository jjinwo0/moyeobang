import {css} from '@emotion/react';
import {colors} from '@/styles/colors';

// 버튼 기본 스타일 정의
export const baseButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  border: 0;
  border-radius: 15px;
  font-family: 'semibold';

  &:hover {
    opacity: 0.8;
  }
`;

// size에 따른 스타일 설정
export const sizeStyles = {
  sotiny: css`
    width: 55px;
    height: 20px;
    font-size: 12px;
  `,
  tiny: css`
    width: 50px;
    height: 25px;
    font-size: 14px;
  `,
  small: css`
    width: 80px;
    height: 35px;
    font-size: 18px;
  `,
  middle: css`
    width: 87px;
    height: 35px;
    font-size: 18px;
  `,
  big: css`
    width: 330px;
    height: 50px;
    font-size: 20px;
  `,
  middleSquare: css`
    width: 140px;
    height: 100px;
    font-size: 18px;
  `,
  thinBig: css`
    width: 330px;
    height: 35px;
    font-size: 18px;
    font-family: 'medium';
  `,
  thinMiddle: css`
    width: 300px;
    height: 35px;
    font-size: 18px;
    font-family: 'medium';
  `,
};

// variant에 따른 스타일 설정
export const variantStyles = {
  blue: css`
    background-color: ${colors.third};
    color: ${colors.white};
  `,
  blueOutlined: css`
    background-color: transparent;
    color: ${colors.third};
    border: 1px solid ${colors.third};
  `,
  gray: css`
    background-color: ${colors.gray};
    color: ${colors.white};
  `,
  red: css`
    background-color: ${colors.customPink};
    color: ${colors.white};
  `,
  greenBlue: css`
    background-color: ${colors.customGreenBlue};
    color: ${colors.white};
  `,
};
