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

type ConnectMessage=string;

interface QrPayProps {
    onClose:VoidFunction;
}

export default function QrPay({onClose}:QrPayProps) {

    const [paymentRequestId] = useState<string>(uuidv4());
    const [openCompleteModal, setOpenCompleteModal] = useState<boolean>(false);
    const [resultMessage, setResultMessage] = useState<ResultMessage| null>(null);
    const [eventSource, setEventSource] = useState<EventSourcePolyfill | null>(null);
    console.log('paymentRequestId : ', paymentRequestId)

    const data : QrData= {
        paymentRequestId: paymentRequestId,
        sourceAccountNumber: '9993247649535796'
    }

    // new EventSource(url, options)
    const fetchSEE = () => {
        const eventSource = new EventSourcePolyfill(import.meta.env.VITE_BASEURL+`/payment/connect?paymentRequestId=${paymentRequestId}`, {
            // headers: {
            //     Authorization: `Bearer ${token}`, 
            // },
        });

        eventSource.onopen = () => {
            console.log("sse연결 open")
        }

        // 각 이벤트 이름에 맞는 메시지를 처리
        eventSource.addEventListener('connect', (event:any) => {
            const connectMessage : ConnectMessage = event.data;
            console.log('connect 응답 결과:', connectMessage);
        });

        eventSource.addEventListener('payment-success', (event:any) => {
            const parsedData : ResultMessage = JSON.parse(event.data);
            console.log('payment-succes 응답 결과:', parsedData);
            setResultMessage(parsedData);                                                                                           
            setOpenCompleteModal(true);
        });

        eventSource.onerror = (event:any) => {
            eventSource.close();
            if (event.error) {
                console.log('sse요청 error발생', event.error)
            }

            if (event.target.readyState === EventSource.CLOSED) {
                console.log('see연결 종료')
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
                console.log('sse 연결 종료')
            }
        };
    }, []);

    // openCompleteModal이 true가 되면 SSE 연결 종료
    // useEffect(() => {
    //     if (openCompleteModal && eventSource) {
    //         eventSource.close();
    //     }
    // }, [openCompleteModal, eventSource]);

    // 정산완료후 닫기버튼! default 직접정산 1/n하기
    function handleClose() {
        setOpenCompleteModal(false);
        onClose();
    }   


    return (
    <>
        {openCompleteModal && resultMessage ? (
            <PayCompletedModal transactionId={Number(resultMessage.transactionId)} onClose={handleClose}/>
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