import { css } from "@emotion/react";
import { colors } from "@/styles/colors";

export const layoutStyle = css`
    width:100%;
    display:flex;
    flex-direction: column;
`;

export const textLayoutStyle = css`
    display:flex;
    flex-direction:column;
    gap:15px;
    margin-bottom:15px;
    padding: 0 30px;
`;

export const place = css`
    font-family: 'semibold';
    font-size:24px;
`;

export const balance = css`
    font-family:'semibold';
    font-size:18px;
`;

export const time = css`
    font-family: 'regular';
    font-size: 16px;
`;

export const refresh = css`
    font-family:'semibold';
    font-size: 14px; 
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    img {
        width:24px;
        height:24px;
    }
    
`;

export const allButtonStyle = (isAll: boolean) => css`
    button {
    height:100%;
    font-family:'semibold';
    background-color: ${ isAll ? colors.white : colors.fourth};
    border-radius: 15px;
    border: solid 2px ${colors.fourth};
    color: ${ isAll ? colors.fourth : colors.white};

`;

export const allRefreshLayoutStyle = css`
    display: flex;
    flex-direction:row;
    justify-content:space-between;

`;
export const settleListLayoutStyle = css`
    /* margin: 10px 0; */
    width:100%;
    height: 450px;
    display:flex;
    flex-direction: column;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none; 
    }
`;

export const buttonLayoutStyle = css`
    padding-top:10px;
    width:100%;
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
`;

export const nButtonStyle = css`
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: center;
    gap: 10px;
    font-family: 'medium';
    font-size: 20px;
    color: ${colors.third};
    padding-right: 20px;
    padding-top: 10px;

    button {
        font-family: 'semibold';
        font-size: 16px;
        width: 45px;
        height: 45px;
        color: ${colors.third};
        background-color: ${colors.white};
        border-radius: 50%;
        border: solid 2px ${colors.third};
    }
`;