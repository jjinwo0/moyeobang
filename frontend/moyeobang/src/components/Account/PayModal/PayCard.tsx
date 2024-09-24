import React from "react"
import backgroundImage from '@/assets/images/skyBackground.jpg'
import { css } from "@emotion/react"
import { colors } from "@/styles/colors"

const cardLayoutStyle = css`
    width: 330px;
    height: 200px;
    margin-top: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${backgroundImage});
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-size: cover;
    position: relative;
    border-radius: 10px;
`;

const overlayStyle = css`
    position: absolute;
    box-sizing: border-box;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    z-index: 1;   
    border-radius: 10px; 
`;

const titleStyle = css`
    font-family: 'bold';
    font-size: 24px;
    color: ${colors.fifth};
`;

const timeStyle = css`
    font-family: 'semibold';
    font-size: 15px;
    color: ${colors.gray};
`;

const locationStyle = css`
    font-family: 'semibold';
    font-size: 20px;
`;

const balanceStyle = css`
    font-family: 'semibold';
    font-size: 20px; 
    text-align: right;
`;

export default function PayCard() {

    return (

        <div css={cardLayoutStyle}>
            <div css={overlayStyle}>
            <div css={titleStyle} >아기돼지 오형제</div>
            <div css={timeStyle} >2024-01-02~2024-09-02</div>
            <div css={locationStyle} >제주도</div>
            <div css={balanceStyle} >90000원</div>
            </div>
        </div>
    )
}