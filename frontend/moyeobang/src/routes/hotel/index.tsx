import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { css } from '@emotion/react';
import { v4 as uuidv4 } from "uuid";
import QrPayByOnline from '@/components/QrPayByOnline/QrPayByOnline'
import hotelBackground from '@/assets/icons/hotelBackground.png'
import { useState, useEffect } from 'react';
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
    const [eventSource, setEventSource] = useState<EventSourcePolyfill || null>(null);

    const fetchSEE = () => {
        const eventSource = new EventSourcePolyfill(import.meta.env.VITE_BASEURL+`/pg/payment/connect?paymentRequestId=${hotelQrData.paymentRequestId}`, {
            // headers: {
            //     Authorization: `Bearer ${token}`, 
            // },
        })

        eventSource.onopen = () => {
            console.log('hotel sse open')
        }

        eventSource.addEventListener('connect', (event) => {

            const messageEvent = event as MessageEvent<string>;
            const connectMessage : ConnectMessage = messageEvent.data;
            console.log('connect:', connectMessage);
        });

        eventSource.addEventListener('payment-success', (event) => {

            const messageEvent = event as MessageEvent<string>;
            const parsedData = JSON.parse(messageEvent.data);
            console.log('payment-succes:', parsedData);
        });

        eventSource.onerror = (event) => {
            
        eventSource.close();
            if (event) {
                console.log('sse요청 error발생', event)
            }

            if (event.target.readyState === EventSource.CLOSED) {
                console.log('see연결 종료')
            }
        };

        // eventSource 상태에 저장
        setEventSource(eventSource);
    }

    useEffect(() => {
        fetchSEE();

        // 컴포넌트 언마운트 시 SSE 연결 종료
        return () => {
            if (eventSource) {
                eventSource.close();
                console.log('sse 연결 종료')
            }
        };
    }, []);


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