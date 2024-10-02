import React, { useRef } from "react";
import Backdrop from "../Account/FinalModal/Backdrop/Backdrop";
import QRCode from "react-qr-code";
import { css } from "@emotion/react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { colors } from "@/styles/colors";

const qrContainerStyle=css`
    border-radius:5px;
    background-color: ${colors.white};
    display:flex;
    flex-direction:column;
    align-items:center;
    width: 400px;
    height:500px;
    padding: 30px 10px;
    span {
        font-family: 'english';
        font-size: 46px;
        padding: 2px;
    }
`;

const qrStyle = css`
    box-sizing:border-box;
    width:300px;
    height:300px;
    border-radius:10px;
    padding: 15px;
    border:solid 4px ${colors.third};
`;

const titleStyle=css`
    padding:10px;
    font-size:40px;
    font-family:'semibold';
`;

const contentStyle=css`
    padding: 20px 0;
    font-size:20px;
`;

const amountStyle=css`
    padding: 20px 0;
    font-size:24px;
`;


interface QrPayByOnlineProps {
    onClickOutside: VoidFunction;
    qrData:OnlineQrData;
}


export default function QrPayByOnline({qrData, onClickOutside} : QrPayByOnlineProps) {

    const modalRef = useRef<HTMLDivElement>(null)
    useOnClickOutside(modalRef, onClickOutside)
    console.log('QR 데이터 확인', qrData)

    return (
        <Backdrop>
            <div ref={modalRef} css={qrContainerStyle}>
                <div css={titleStyle}><span>QR</span>결제</div>
                <QRCode value={JSON.stringify(qrData)} css={qrStyle} />
                <div css={contentStyle}>카메라를 통해 <span>QR</span>을 스캔해주세요</div>
                <div css={amountStyle}>결제 금액 : {qrData.amount.toLocaleString()}원</div>
            </div>
        </Backdrop>
    )
}