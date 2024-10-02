import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { css } from '@emotion/react'
import Btn from '@/components/common/btn/Btn';
import { v4 as uuidv4 } from "uuid";
import QrPayByOnline from '@/components/QrPayByOnline/QrPayByOnline'
import hotelBackground from '@/assets/icons/hotelBackground.png'
import { useState } from 'react';
import { colors } from '@/styles/colors';

const backgroundStyle=css`
    display:flex;
    justify-content:center;
    align-items:center;
    // height:100vh;
    margin:0 auto;
    img {
        width:600px;
        background-size:cover;
        background-repeat:no-repeat;
    }
`;

const buttonLayoutStyle=css`
    position:fixed;
    bottom:320px;
    right:70px;
    width: 160px;
    height:25px;
    background-color:${colors.third};
    color:${colors.white};
    text-align:center;
    div {
        padding-top:6px;
        font-family:'semibold';
    }
`;

const hotelData = {
    paymentRequestId: uuidv4(),
    placeId: '123-hotel',
    placeName : '호텔모여방',
    placeAddress: '',
    amount : 519883,
    latitude: 0,
    longitude: 0,
    sourceAccountNumber: '0012280102000441'
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
            {isQrModalOpen && <QrPayByOnline data={hotelData} onClickOutside={handleClose}/>}
            <img src={hotelBackground} alt="" />
            <div css={buttonLayoutStyle}>
                <div onClick={handleClick}>예약 하기</div>
            </div>
        </div>
    )
}