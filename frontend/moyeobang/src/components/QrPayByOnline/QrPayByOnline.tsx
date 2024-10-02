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
    width: 250px;
    height:330px;
    padding: 30px 10px;
    span {
        font-family: 'english';
        font-size: 28px;
        padding: 2px;
    }
`;

const qrStyle = css`
    box-sizing:border-box;
    width:150px;
    height:150px;
    border-radius:10px;
    padding: 15px;
    border:solid 4px ${colors.third};
`;

const titleStyle=css`
    padding:10px;
    font-size:24px;
    font-family:'semibold';
`;

const contentStyle=css`
    padding: 20px 0;
    font-size:14px;
`;

interface QrPayByOnlineProps {
    onClickOutside: VoidFunction;
    data: Omit<PaymentProps, 'targetAccountNumber'>
}


export default function QrPayByOnline({data, onClickOutside} : QrPayByOnlineProps) {

    const modalRef = useRef<HTMLDivElement>(null)
    useOnClickOutside(modalRef, onClickOutside)
    console.log(data)

    return (
        <Backdrop>
            <div ref={modalRef} css={qrContainerStyle}>
                <div css={titleStyle}><span>QR</span>결제</div>
                <QRCode value={JSON.stringify(data)} css={qrStyle} />
                <div css={contentStyle}>카메라를 통해 <span>QR</span>을 스캔해주세요</div>
                <div>결제 금액 : {data.amount.toLocaleString()}원</div>
            </div>
        </Backdrop>
    )
}