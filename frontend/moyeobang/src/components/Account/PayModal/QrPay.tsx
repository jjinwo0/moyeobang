import React, { useRef } from "react";
import { css } from "@emotion/react";
import QRCode from 'react-qr-code';
import PayCard from "./PayCard";
import { colors } from "@/styles/colors";
import { v4 as uuidv4 } from "uuid";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useEffect, useState } from "react";
import PayCompletedModal from "./PayCompletedModal";
import useCurrentTravelStore from "@/store/useCurrentTravelStore";

const qrContainerStyle = css`
    width: 200px;
    height: 200px;
    border: solid 5px ${colors.third};
    padding: 30px;
    border-radius: 15px;
    margin-top: 100px;
`;

const QrCodeStyle = css`
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

    const paymentRequestId = useRef<string>(uuidv4());
    const [openCompleteModal, setOpenCompleteModal] = useState<boolean>(false);
    const [resultMessage, setResultMessage] = useState<ResultMessage| null>(null);
    const [eventSource, setEventSource] = useState<EventSourcePolyfill | null>(null);
    const {accountNumber}= useCurrentTravelStore();

    const data : QrData= {
        paymentRequestId: paymentRequestId.current,
        sourceAccountNumber: accountNumber,
    }

    // new EventSource(url, options)
    const fetchSEE = () => {
        const eventSource = new EventSourcePolyfill(import.meta.env.VITE_BASEURL+`/api/payment/connect?paymentRequestId=${paymentRequestId.current}`, {
            // headers: {
            //     Authorization: `Bearer ${token}`, 
            // },
        });

        eventSource.onopen = () => {
            console.log("sse연결 open")
        }

        // 각 이벤트 이름에 맞는 메시지를 처리
        eventSource.addEventListener('connect', (event) => {

            const messageEvent = event as MessageEvent<string>;
            const connectMessage : ConnectMessage = messageEvent.data;
            console.log('connect 응답 결과:', connectMessage);
        });

        eventSource.addEventListener('payment-success', (event) => {
            console.log('payment-success' , event)

            const messageEvent = event as MessageEvent<string>;
            const parsedData : ResultMessage = JSON.parse(messageEvent.data);
            console.log('payment-succes 응답 결과:', parsedData);
            setResultMessage(parsedData);                                                                                           
            setOpenCompleteModal(true);
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
    };

    
    useEffect(() => {
        fetchSEE();
        console.log('paymentRequestId : ', paymentRequestId.current)
        // 컴포넌트 언마운트 시 SSE 연결 종료
        return () => {
            if (eventSource) {
                eventSource.close();
                console.log('sse 연결 종료')
            }
        };
    }, []);

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
                    <QRCode value={JSON.stringify(data)} css={QrCodeStyle} />
                </div>
                <PayCard/>
            </>
        )}
    </>
    )
}