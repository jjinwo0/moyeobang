import { css } from "@emotion/react";
import { colors } from "@/styles/colors";

export const layout = css`
    width:330px;
    height: 115px;
    border-top: solid 1px ${colors.lightGray};
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const upContainer = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-grow: 1;
`;

export const textContainer = css`
    width: 200px;
    display : flex;
    flex-direction: column;
    gap: 10px;
`;

export const time = css`
    font-family: 'regular';
    font-size: 10px;
`;

export const location = css`
    padding-right: 15px;
    font-family: 'semibold';
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const carousel = css`
    display:flex;
    width: 150px;
    justify-content: flex-start;
    flex-direction: row;
    gap: 5px;

    overflow-x: auto;

    &::-webkit-scrollbar {
    display: none;
    }

`;


export const downContainer = css`
    display : flex;
    flex-direction: column;
    gap: 10px;
    flex-grow: 1;
    
`;

export const deposit = css`
    display: flex;
    justify-content: flex-end;
    font-family:'regular';
    font-size: 20px;
    p { 
        padding: 0 5px;
        color: ${colors.fifth}
    }
`;

export const notDeposit = css`
    display: flex;
    justify-content: flex-end;
    font-family:'regular';
    font-size: 20px;
    p { 
        padding: 0 5px;
        color: ${colors.customRed}
    }
`;

export const balance = css`
    display: flex;
    justify-content: flex-end;
    font-family:'regular';
    font-size: 16px;

    p { 
        padding: 0 5px;
    }
    
`;