import { css } from "@emotion/react";
import { colors } from "@/styles/colors";

export const layoutStyle = css`
    position: absolute;
    inset: 0;
    z-index:9999;
    margin-top:50px;
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    background-color: ${colors.white};
`;

export const upContainerStyle=css`
  display:flex;
  flex-direction:column;
  gap:15px;
  padding-left:30px;
  padding-top:20px;
  padding-bottom:20px;
`;

export const titleStyle=css`
  font-family:'semibold';
  font-size:24px;
`;

export const amountStyle=css`
  font-family:'semibold';
  font-size:20px;
`;

export const timeStyle=css`
  font-family:'regular';
  font-size:16px;
`;

export const middleContainerStyle=css`
  display:flex;
  flex-direction:column;
  box-sizing:border-box;
  width:100%;
  max-width: 100%;
  height:515px;
  gap:20px;
  overflow-y:auto;
  padding-bottom: 20px;

  &::-webkit-scrollbar {
        display: none;
    }
  
`;

export const buttonContainerStyle=css`
  /* position:fixed; */
  bottom:30px;
  background-color: ${colors.white};
  width:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  gap:20px;
  padding-top: 10px;
`;
