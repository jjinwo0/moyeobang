import { css } from "@emotion/react";

export const headerStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  max-width:390px;
  height: 50px;
  padding: 0 10px;
  perspective: 0;
  z-index: 9999;
  background-color: transparent;
  box-sizing: border-box;
`;

export const backButtonHeaderStyle = css`
  ${headerStyle}
  justify-content: flex-start;
`;

export const closeButtonHeaderStyle = css`
  ${headerStyle}
  justify-content: flex-end;
`;

export const twoIconsHeaderStyle = css`
  ${headerStyle}
  justify-content: flex-end;
`;
