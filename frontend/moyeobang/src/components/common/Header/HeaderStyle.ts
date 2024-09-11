import {css} from '@emotion/react';

export const headerStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  max-width: 390px;
  height: 50px;
  padding: 0 10px;
  perspective: 0;
  z-index: 10;
  box-sizing: border-box;
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
  z-index: 10;
`;

export const twoIconsHeaderStyle = css`
  ${headerStyle}
  background-color: transparent;
  justify-content: flex-end;
  z-index: 10;
`;
