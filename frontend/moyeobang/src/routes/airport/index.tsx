import { createFileRoute } from '@tanstack/react-router';
import React, { useState, useEffect} from 'react';
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
    placeId: 'airport-1',
    amount : 459000,
}

export const Route = createFileRoute('/airport/')({
  component: AirportSite,
})

export default function AirportSite() {

    const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
    const [eventSource, setEventSource] = useState<EventSourcePolyfill | null>(null);

    const fetchSEE = () => {
        const eventSource = new EventSourcePolyfill(import.meta.env.VITE_BASEURL+`/pg/payment/connect?paymentRequestId=${airportData.paymentRequestId}`, {
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
            console.log('connect:', connectMessage);
        });

        eventSource.addEventListener('payment-success', (event) => {
            console.log('payment-success' , event)

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

    function handleClick() {
        setIsQrModalOpen(true);
    }

    function handleClose() {
        setIsQrModalOpen(false)
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