import React from "react";
import { css } from "@emotion/react";
import QRCode from 'react-qr-code';
import PayCard from "./PayCard";
import { colors } from "@/styles/colors";

export default function QrPay() {

    const qrContainerStyle = css`
        width: 200px;
        height: 200px;
        border: solid 5px ${colors.third};
        padding: 30px;
        border-radius: 15px;
        margin-top: 100px;
         
    `;

    const QRStyle = css`
        width: 100%;
        height: 100%;
        
    `;

    return (
        <div>
            <div css={qrContainerStyle}>
            <QRCode value={'333-333-333'} css={QRStyle}/>
            </div>

            <PayCard />

        </div>
    )
}