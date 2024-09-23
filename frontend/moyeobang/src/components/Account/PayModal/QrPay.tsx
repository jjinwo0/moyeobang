import React from "react";
import { css } from "@emotion/react";
import QRCode from 'react-qr-code';
import PayCard from "./PayCard";
import { colors } from "@/styles/colors";
import { v4 as uuidv4 } from "uuid";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useEffect, useState } from "react";
import PayCompletedModal from "./PayCompletedModal";

const qrContainerStyle = css`
    width: 200px;
    height: 200px;
    border: solid 5px ${colors.third};
    padding: 30px;
    border-radius: 15px;
    margin-top: 100px;
`;

const QRStyle = css`
    width: 100%;
    height: 100%;
`;

interface ResultMessage {
    transactionId: TransactionId;
}

interface ConnectMessage {
    message:string;
}

export default function QrPay( ) {

    const paymentRequestId : string = uuidv4();
    const [openCompleteModal, setOpenCompleteModal] = useState<boolean>(false);
    const [resultMessage, setResultMessage] = useState<ResultMessage| null>(null);
    const [eventSource, setEventSource] = useState<EventSourcePolyfill | null>(null);


    const data : QrData= {
        paymentRequestId: paymentRequestId,
        sourceAccountNumber: '333-3333-333'
    }

    // new EventSource(url, options)
    const fetchSEE = () => {
        const eventSource = new EventSourcePolyfill(`http://localhost:8080/api/payment/connect?paymentRequestId=${paymentRequestId}`, {
            // headers: {
            //     Authorization: `Bearer ${token}`, 
            // },
        });

        eventSource.onopen = () => {
            console.log("sse연결 open")
        }

        // 각 이벤트 이름에 맞는 메시지를 처리
        eventSource.addEventListener('connected', (event:any) => {
            const parsedData : ConnectMessage = JSON.parse(event.data);
            console.log('연결 성공 여부:', parsedData.message);
        });

        eventSource.addEventListener('payment-success', (event:any) => {
            const parsedData : ResultMessage = JSON.parse(event.data);
            console.log('paymentResult:', parsedData);
            setResultMessage(parsedData);
            setOpenCompleteModal(true);
        });

        eventSource.onerror = (event:any) => {
            eventSource.close();
            if (event.error) {
                console.log('sse요청 error발생', event.error)
            }

            if (event.target.readyState === EventSource.CLOSED) {
                // 종료 시 할일
            }
        };

        // eventSource 상태에 저장
        setEventSource(eventSource);
    };

    useEffect(() => {
        fetchSEE();

        // 컴포넌트 언마운트 시 SSE 연결 종료
        return () => {
            if (eventSource) {
                eventSource.close();
            }
        };
    }, []);

    // openCompleteModal이 true가 되면 SSE 연결 종료
    useEffect(() => {
        if (openCompleteModal && eventSource) {
            eventSource.close();
        }
    }, [openCompleteModal, eventSource]);

    function handleClose() {
        setOpenCompleteModal(false);
    }


    return (
    <>
        {openCompleteModal && resultMessage ? (
            <PayCompletedModal transactionId={Number(resultMessage.transactionId)} onClose={handleClose} />
        ) : (
            <>
                <div css={qrContainerStyle}>
                    <QRCode value={JSON.stringify(data)} css={QRStyle} />
                </div>
                <PayCard />
            </>
        )}
    </>
    )
}