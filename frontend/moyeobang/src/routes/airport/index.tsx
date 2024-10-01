import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';
import airportBackground from '@/assets/icons/airportBackground.png';
import { css } from '@emotion/react';
import Btn from '@/components/common/btn/Btn';
import { v4 as uuidv4 } from "uuid";
import QrPayByOnline from '@/components/QrPayByOnline/QrPayByOnline';

const backgroundStyle=css`
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    margin:0 auto;
    img {
        width:600px;
        background-size:cover;
        background-repeat:no-repeat;
    }
`;

const buttonLayoutStyle=css`
    position:fixed;
    bottom:30px;
`;

const airportData = {
    paymentRequestId: uuidv4(),
    placeId: '123-air',
    placeName : '모여방윙스',
    placeAddress: '',
    amount : 459000,
    latitude: 0,
    longitude: 0,
    sourceAccountNumber: '0012280102000441'
}

export const Route = createFileRoute('/airport/')({
  component: AirportSite,
})

export default function AirportSite() {

    const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);

    function handleClick() {
        setIsQrModalOpen(true);
    }

    function handleClose() {
        setIsQrModalOpen(false)
    }

    return (
        <div css={backgroundStyle}>
            { isQrModalOpen && <QrPayByOnline data={airportData} onClickOutside={handleClose} />}
            <img src={airportBackground} alt=""/>
            <div css={buttonLayoutStyle}>
                <Btn buttonStyle={{size:'big', style:'blue'}} onClick={handleClick}>항공권 결제하기</Btn>
            </div>
        </div>
    )
}