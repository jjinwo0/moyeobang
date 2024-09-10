import React from "react";
import { css } from "@emotion/react";
import QRCode from 'react-qr-code';
import Btn from "@/components/common/btn/Btn";
import { colors } from "@/styles/colors";

export default function QrPay() {

    const qrContainerStyle = css`
        border: solid 5px ${colors.third};
        
    `;

    return (
        <div>
            <div css={qrContainerStyle}>
            <QRCode value={'333-333-333'} />
            </div>

        </div>
    )
}