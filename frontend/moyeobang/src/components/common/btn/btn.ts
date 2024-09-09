// import {css} from '@emotion/react';
// import styled from '@emotion/styled';
// import {colors} from '@/styles/colors';

// // 버튼 기본 스타일 정의
// const baseButtonStyle = css`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   cursor: pointer;
//   border: 0;
//   border-radius: 5px;

//   &:hover {
//     opacity: 0.8;
//   }

//   &:disabled,
//   &.disabled {
//     color: ${colors.white};
//     pointer-events: none;
//     background-color: ${colors.gray};
//     border-color: ${colors.gray};
//   }
// `;

// //  size에 따른 스타일 설정
// const size = {
//   tiny: css`
//     width: 115px;
//     height: 30px;
//   `,
//   small: css`
//     width: 160px;
//     height: 40px;
//   `,
//   middle: css`
//     width: 200px;
//     height: 50px;
//   `,
//   big: css`
//     width: 250px;
//     height: 60px;
//   `,
// };

// // variant에 따른 스타일 설정
// const variantStyles = {
//   primary: css`
//     background-color: ${colors.first};
//     color: ${colors.white};
//   `,
//   secondary: css`
//     background-color: ${colors.second};
//     color: ${colors.black};
//   `,
//   danger: css`
//     background-color: ${colors.customRed};
//     color: ${colors.white};
//   `,
// };

// // Emotion을 사용한 버튼 컴포넌트
// const StyledButton = styled.button<{
//   variant: 'primary' | 'secondary' | 'danger';
//   size: 'tiny' | 'small' | 'middle' | 'big';
// }>`
//   ${baseButtonStyle}
//   ${({ variant }) => variantStyles[variant]}
//   ${({ size }) => size[size]}
// `;

// export default StyledButton;


import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';

// 버튼 기본 스타일 정의
const baseButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  border: 0;
  border-radius: 5px;

  &:hover {
    opacity: 0.8;
  }

  &:disabled,
  &.disabled {
    color: ${colors.white};
    pointer-events: none;
    background-color: ${colors.gray};
    border-color: ${colors.gray};
  }
`;

// size에 따른 스타일 설정
const sizeStyles = {
  tiny: css`
    width: 115px;
    height: 30px;
  `,
  small: css`
    width: 160px;
    height: 40px;
  `,
  middle: css`
    width: 200px;
    height: 50px;
  `,
  big: css`
    width: 250px;
    height: 60px;
  `,
};

// variant에 따른 스타일 설정
const variantStyles = {
  primary: css`
    background-color: ${colors.first};
    color: ${colors.white};
  `,
  secondary: css`
    background-color: ${colors.second};
    color: ${colors.black};
  `,
  danger: css`
    background-color: ${colors.customRed};
    color: ${colors.white};
  `,
};

// Emotion을 사용한 버튼 컴포넌트
const StyledButton = styled.button<{
  variant: 'primary' | 'secondary' | 'danger';
  buttonSize: 'tiny' | 'small' | 'middle' | 'big'; // prop 이름 변경
}>`
  ${baseButtonStyle}
  ${({ variant }) => variantStyles[variant]}
  ${({ buttonSize }) => sizeStyles[buttonSize]}  // 충돌 해결
`;

export default StyledButton;
