import {css} from '@emotion/react';

export const headerStyle = css`
  position: fixed;
  top: 0;
  left: 50%; /* 가로 중앙으로 설정 */
  transform: translateX(-50%); /* 가로 중앙으로 이동 */
  display: flex;
  align-items: center;
  justify-content: space-between; /* 아이콘 사이에 공간을 추가 */
  max-width: 390px;
  width: 100%; /* 전체 너비에 맞게 */
  height: 50px;
  padding: 0 10px;
  z-index: 2;
  box-sizing: border-box;
  background-color: transparent; /* 배경을 투명으로 */
`;

export const backButtonHeaderStyle = css`
  ${headerStyle}
  background-color: white;
  justify-content: flex-start;
`;

export const closeButtonHeaderStyle = css`
  ${headerStyle}
  background-color: white;
  justify-content: flex-end;
  z-index: 2;
`;

export const twoIconsHeaderStyle = css`
  ${headerStyle}
  background-color: transparent;
  justify-content: flex-end;
  z-index: 2;
`;
