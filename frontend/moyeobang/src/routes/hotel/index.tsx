import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { css } from '@emotion/react';
import { v4 as uuidv4 } from "uuid";
import QrPayByOnline from '@/components/QrPayByOnline/QrPayByOnline'
import hotelBackground from '@/assets/icons/hotelBackground.png'
import { useState} from 'react';

const backgroundStyle=css`
    display:flex;
    justify-content:center;
    align-items:center;
    margin:0 auto;
    img {
        width:600px;
        background-size:cover;
        background-repeat:no-repeat;
    }
`;

const buttonLayoutStyle=css`
    position:fixed;
    bottom:230px;
    right:200px;
    width: 350px;
    height:700px;
    background-color:transparent;
    color:transparent;
    text-align:center;
    div {
        width:100%;
        height:100%;
    }
`;

const hotelQrData = {
    paymentRequestId: uuidv4(),
    placeId: 'hotel-1',
    amount:519883
}

export const Route = createFileRoute('/hotel/')({
  component: HotelSite,
})


export default function HotelSite() {

    const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);

    function handleClick() {
        setIsQrModalOpen(true);
    }

    function handleClose() {
        setIsQrModalOpen(false)
    }


    return (
        <div css={backgroundStyle}>
            {isQrModalOpen && <QrPayByOnline qrData={hotelQrData} onClickOutside={handleClose}/>}
            <img src={hotelBackground} alt="" />
            <div css={buttonLayoutStyle}>
                <div onClick={handleClick}>예약 하기</div>
            </div>
        </div>
    )
}