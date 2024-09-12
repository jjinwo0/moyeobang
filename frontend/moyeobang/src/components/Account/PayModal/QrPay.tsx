import React from "react";
import { css } from "@emotion/react";
import QRCode from 'react-qr-code';
import PayCard from "./PayCard";
import { colors } from "@/styles/colors";

interface QrData {
    paymentSessionId: number
    travelAccount: string
}

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

export default function QrPay( ) {

    const data : QrData= {
        paymentSessionId: 12,
        travelAccount: '333-3333-333'
    }
    return (
        <>
            <div css={qrContainerStyle}>
            <QRCode value={JSON.stringify(data)} css={QRStyle}/>
            </div>

            <PayCard />

        </>
    )
}