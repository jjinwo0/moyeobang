import React from "react"
import backgroundImage from '@/assets/images/skyBackground.jpg'
import { css } from "@emotion/react"

export default function PayCard() {

    const cardLayoutStyle = css`
        width: 330px;
        height: 200px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    `

    const titleStyle = css`
        font-family: bold;
        font-size: 24px;

    `;

    const timeStyle = css`
        font-family: semiBold;

    `;

    return (

        <div>
            <img src={backgroundImage} alt="" />
            <div css={titleStyle} >아기돼지 오형제</div>
            <div css={timeStyle} >2024-01-02~2024-09-02</div>
            <div css={locationStyle} >제주도</div>
            <div css={moneyStyle} >90000원</div>
        </div>
    )
}