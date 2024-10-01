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
    justify-content:center;
    align-items:center;
    width: 200px;
    height:350px;
    padding: 0 10px;
    span {
        // box-sizing:border-box;
        font-family:'english';
        margin-bottom:10px;
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
`;

const contentStyle=css`
    padding: 10px 0;
    font-size:14px;
`;

interface QrPayByOnlineProps {
    onClickOutside: VoidFunction;
    data: Omit<PaymentProps, 'targetAccountNumber'>
}


export default function QrPayByOnline({data, onClickOutside} : QrPayByOnlineProps) {

    const modalRef = useRef<HTMLDivElement>(null)
    useOnClickOutside(modalRef, onClickOutside)

    return (
        <Backdrop>
            <div ref={modalRef} css={qrContainerStyle}>
                <div css={titleStyle}><span>QR</span>결제</div>
                <QRCode value={JSON.stringify(data)} css={qrStyle} />
                <div css={contentStyle}>카메라를 통해 <span>QR</span>을 스캔해주세요</div>
            </div>
        </Backdrop>
    )
}