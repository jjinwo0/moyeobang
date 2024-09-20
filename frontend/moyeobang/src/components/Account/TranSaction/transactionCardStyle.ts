import { css } from "@emotion/react";
import { colors } from "@/styles/colors";

export const layoutStyle = css`
    width:330px;
    height: 115px;
    border-top: solid 1px ${colors.lightGray};
    padding: 15px 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    text-decoration: none; 
    color: inherit; 
    &:hover {
        text-decoration: none; 
        color: inherit; 
    }
`;

export const upContainerStyle = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-grow: 1;
`;

export const textContainerStyle = css`
    width: 200px;
    display : flex;
    flex-direction: column;
    gap: 10px;
`;

export const timeStyle = css`
    font-family: 'regular';
    font-size: 10px;
`;

export const locationStyle = css`
    padding-right: 15px;
    font-family: 'semibold';
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const carouselStyle = css`
    display:flex;
    width: 150px;
    justify-content: flex-start;
    flex-direction: row;
    gap: 5px;
    padding: 1px 0;

    overflow-x: auto;

    &::-webkit-scrollbar {
    display: none;
    }

`;


export const downContainerStyle = css`
    display : flex;
    flex-direction: column;
    gap: 10px;
    flex-grow: 1;
    
`;

export const depositStyle = css`
    display: flex;
    justify-content: flex-end;
    font-family:'regular';
    font-size: 20px;
    p { 
        padding: 0 5px;
        color: ${colors.fifth}
    }
`;

export const notDepositStyle = css`
    display: flex;
    justify-content: flex-end;
    font-family:'regular';
    font-size: 20px;
    p { 
        padding: 0 5px;
        color: ${colors.customRed}
    }
`;

export const balanceStyle = css`
    display: flex;
    justify-content: flex-end;
    font-family:'regular';
    font-size: 16px;

    p { 
        padding: 0 5px;
    }
    
`;