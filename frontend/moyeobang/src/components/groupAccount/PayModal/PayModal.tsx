import { css } from "@emotion/react"
import HeaderWithXButton from "@/components/common/Header/HeaderWithXbutton";
import React from "react";
import TwoBtn from "@/components/common/btn/TwoBtn";
import { useState } from "react";
import QrPay from "./QrPay";
import QRScan from "./QrScan";

const layoutStyle = css`
    margin-top: 50px;
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height:100%;
    display:flex;
    flex-direction:column;
    z-index: 2;
`;

interface QRPayProps {
    onXClick: () => void;
}

export default function PayModal({onXClick} : QRPayProps) {
    const [ activeComponenet, setActiveComponent ] = useState<string>('left');


    function handleLeft() {
        setActiveComponent('left')
    }

    function handleRight() {
        setActiveComponent('right')
    }
    return (
        <>
        <HeaderWithXButton onXClick={onXClick} />
        <div css={layoutStyle}>
            <TwoBtn  
            leftText = 'QR 결제'
            rightText = 'QR 스캔'
            onLeftClick={handleLeft}
            onRightClick={handleRight}
            />
            qrmodal
            {activeComponenet==='left' ? 
            (
                <QrPay />
            ) :
            (
              <QRScan />  
            )
            }
        </div>
        </>
    )
}