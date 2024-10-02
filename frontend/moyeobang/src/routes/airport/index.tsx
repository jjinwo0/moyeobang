import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';
import airportBackground from '@/assets/icons/airportBackground.png';
import { css } from '@emotion/react';
import { v4 as uuidv4 } from "uuid";
import QrPayByOnline from '@/components/QrPayByOnline/QrPayByOnline';
import { EventSourcePolyfill } from 'event-source-polyfill';

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
    width:100%;
    height:500px;
    position:fixed;
    bottom:0;
    div {
        width:100%;
        height:100%;
    }
`;

const airportData = {
    paymentRequestId: uuidv4(),
    placeId: '123-air',
    amount : 459000,
}

export const Route = createFileRoute('/airport/')({
  component: AirportSite,
})

export default function AirportSite() {

    const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
    const [eventSource, setEventSource] = useState<EventSourcePolyfill | null>(null);

    const fetchSEE = () => {
        const eventSource = new EventSourcePolyfill('https://j11c102.p.ssafy.io/pg/payment/connect'+`/payment/connect?paymentRequestId=${airportData.paymentRequestId}`, {
            // headers: {
            //     Authorization: `Bearer ${token}`, 
            // },
        })

        eventSource.onopen = () => {
            console.log('sse open')
        }

        eventSource.addEventListener('connect', (event) => {

            const messageEvent = event as MessageEvent<string>;
            const connectMessage : ConnectMessage = messageEvent.data;
            console.log('connect 응답 결과:', connectMessage);
        });
    }

    function handleClick() {
        setIsQrModalOpen(true);
    }

    function handleClose() {
        setIsQrModalOpen(false)
    }

    return (
        <div css={backgroundStyle}>
            { isQrModalOpen && <QrPayByOnline qrData={airportData} onClickOutside={handleClose} />}
            <img src={airportBackground} alt=""/>
            <div css={buttonLayoutStyle}>
                <div onClick={handleClick}></div>
            </div>
        </div>
    )
}