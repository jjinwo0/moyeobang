import { css } from "@emotion/react"
import HeaderWithXButton from "@/components/common/Header/HeaderWithXbutton";
import React from "react";
import TwoBtn from "@/components/common/btn/TwoBtn";
import { useState } from "react";
import QrPay from "./QrPay";
import QRScan from "./QrScan";
import PayCompletedModal from "./PayCompletedModal";
import useCurrentTravelStore from "@/store/useCurrentTravelStore";
import useTravelDetailStore from "@/store/useTravelDetailStore";
import { useLocation } from "@tanstack/react-router";
import QrScanFailModal from "./QrScanFailModal";

const layoutStyle = css`
    margin-top: 50px;
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height:100%;
    display:flex;
    flex-direction:column;
    align-items: center;
    z-index: 2;
`;

interface QRPayProps {
    onXClick: () => void;
}

export default function PayModal({onXClick} : QRPayProps) {
    const [ activeComponenet, setActiveComponent ] = useState<string>('left');
    const [openCompleteModal, setOpenCompleteModal] = useState<boolean>(false);
    const [successTransactionId, setSuccessTransactionId] = useState<TransactionId | null>(null);
    
    const [openScanFailModal, setopenScanFailModal] = useState<boolean>(false);
    const [scanRestart, setScanRestart] = useState<boolean>(false);
    const [failName, setfailName] = useState<string>('');


    const location = useLocation();
    const isHome = location.pathname ==='/'
    // home에서 연거면 현재 진행중인 여행. account에서 연거면 해당 여행
    const {accountNumber}= isHome ? useCurrentTravelStore() : useTravelDetailStore(); // '0012280102000441'
    const {accountId}= isHome ? useCurrentTravelStore() : useTravelDetailStore();
    const {travelId}= isHome ? useCurrentTravelStore() : useTravelDetailStore();
    const {participantsInfo}= isHome ? useCurrentTravelStore() : useTravelDetailStore();

    function handleLeft() {
        setActiveComponent('left')
    };

    function handleRight() {
        setActiveComponent('right')
    };

    function handleMessage(trasactionId:TransactionId) {
        setSuccessTransactionId(trasactionId);
        setOpenCompleteModal(true);
    }

    // 정산완료후 닫기버튼! default 직접정산 1/n하기
    function handleClose() {
        setOpenCompleteModal(false);
        onXClick();
    }

    function handleScanError(errorMessage:string) {
        if (errorMessage==='여행 계좌에 잔액이 부족합니다.') {
            setfailName('noBalance')
        } else {
            setfailName('scanError')
        }
        setopenScanFailModal(true); // scan실패 컴포넌트 오픈
    }

    function handleRestart() {
        setopenScanFailModal(false)
        setScanRestart(!scanRestart);
        setActiveComponent('right')
    }

    return (
        <>
        {openScanFailModal && <QrScanFailModal onClose={onXClick} onRestart={handleRestart} errorName={failName}/>}
        {openCompleteModal && successTransactionId &&
            <PayCompletedModal 
            isHome={isHome} 
            travelId={travelId} 
            accountId={accountId} 
            transactionId={Number(successTransactionId)} 
            participants={participantsInfo} 
            onClose={handleClose}
            />
        }
        <HeaderWithXButton onXClick={onXClick} />
        <div css={layoutStyle}>
            <TwoBtn  
            leftText = {<><span>QR</span>&nbsp;결제</>}
            rightText = {<><span>QR</span>&nbsp;인식</>}
            onLeftClick={handleLeft}
            onRightClick={handleRight}
            />
            {activeComponenet==='left' ? 
            (
                <QrPay 
                onMessage={handleMessage}
                isHome={isHome}
                accountNumber={accountNumber}
                />
            ) :
            (
                <QRScan 
                onMessage={handleMessage}
                accountNumber={accountNumber}
                onError={handleScanError}
                restart={scanRestart}
                />  
            )
            }
        </div>
        </>
    )
}