import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react'
import { css } from '@emotion/react'
import Btn from '@/components/common/btn/Btn'
import QrScanByPos from '@/components/QrByPos/QrScanByPos'
import ResultByPos from '@/components/QrByPos/ResultByPos'

const starbucks: PosPay = {
    placeId : 'starbucks-12',
    placeName: '스타벅스 제주점',
    placeAddress: '제주시 서대문로 12번길',
    amount: 25000,
    latitude:34.5,
    longitude:90.2,
    storeAccountNumber: '0012280102000441',
  }

const kurosiro: PosPay = {
    placeId : 'kurosiro-186',
    placeName: '쿠로시로 제주점',
    placeAddress: '제주도 올레길 27번길',
    amount: 20000,
    latitude:34.5,
    longitude:90.2,
    storeAccountNumber: '0012280102000441',
  }

const abebeBakery: PosPay = {
    placeId : 'starbucks-12',
    placeName: '아베베 베이커리',
    placeAddress: '제주시 제주로 올레시장',
    amount: 34000,
    latitude:34.5,
    longitude:90.2,
    storeAccountNumber: '0012280102000441',
  }

const surfing: PosPay = {
    placeId : 'surfing-112',
    placeName: '서핑시티 제주점',
    placeAddress: '제주시 서귀포 중문 색달해수욕장',
    amount: 66000,
    latitude:34.5,
    longitude:90.2,
    storeAccountNumber: '0012280102000441',
  }

const suksungdo: PosPay = {
    placeId : 'suksungdo-12',
    placeName: '숙성도 제주점',
    placeAddress: '제주시 제주 44번길',
    amount: 82000,
    latitude:34.5,
    longitude:90.2,
    storeAccountNumber: '0012280102000441',
  }

const farm: PosPay = {
    placeId : 'farm-10',
    placeName: '양떼 목장',
    placeAddress: '제주도 서귀포',
    amount: 50000,
    latitude:34.5,
    longitude:90.2,
    storeAccountNumber: '0012280102000441',
  }

export const Route = createFileRoute('/pos/')({
  component: Pos,
})

const layoutStyle = css`
  width: 100%;
  height: 100%;
  box-sizing:border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding-bottom:30px;

  input {
    width: 300px;
    height: 30px;
    border-radius: 15px;
    font-size: 16px;
    padding: 0 15px;
  }

  div {
    padding: 10px;
  }

  p {
    padding: 10px;
  }
`;

const storeLayoutStyle=css`
  display:flex;
  flex-direction:column;
  gap:10px;
`;

// uuid(paymentRequestId), paymentName, address, money 필요
export default function Pos() {

  // 가맹점 계좌번호 고정!
  // const storeAccountNumber = '0012280102000441'

  const [isOpenQrModal, setIsOpenQrModal] = useState<boolean>(false)
  const [data, setData] = useState<PosPay>() // requestId, 결제자 계좌 아이디 없는 data 즉 결제기 데이터
  const [isOpenResultModal, setIsOpenResultModal] = useState<boolean>(false);
  const [resultData, setResultData] = useState<PaymentProps>(); // 결제 최종 데이터 


  function handleQrClose() {
    setIsOpenQrModal(false);
  }

  function handleResult(data:PaymentProps) {
    setResultData(data); // 결제 최종 데이터 받아오기
    setIsOpenResultModal(true)

    // 결제 api
  }

  function handleOnClickOutside() {
    setIsOpenResultModal(false);
  }
  
  function handleOpen(data:PosPay) {
    setData(data)
  }

  function handleSettle() {
    setIsOpenQrModal(true)
  }

  return (
    <div css={layoutStyle}>
      {isOpenQrModal && data && <QrScanByPos onClose={handleQrClose} paymentData={data} onResult={handleResult}/> }
      {isOpenResultModal && resultData && <ResultByPos {...resultData} onClickOutside={handleOnClickOutside}/>}
      { !isOpenQrModal && !isOpenResultModal &&
        <>
        <div css={storeLayoutStyle}>
          <Btn buttonStyle={{size:'big', style:'red'}} onClick={() => handleOpen(starbucks)}>스타벅스 제주점</Btn>
          <Btn buttonStyle={{size:'big', style:'red'}} onClick={() => handleOpen(kurosiro)}>쿠로시로</Btn>
          <Btn buttonStyle={{size:'big', style:'red'}} onClick={() => handleOpen(abebeBakery)}>아베베베이커리</Btn>
          <Btn buttonStyle={{size:'big', style:'red'}} onClick={() => handleOpen(surfing)}>제주 서핑</Btn>
          <Btn buttonStyle={{size:'big', style:'red'}} onClick={() => handleOpen(suksungdo)}>숙성도</Btn>
          <Btn buttonStyle={{size:'big', style:'red'}} onClick={() => handleOpen(farm)}>양떼 목장</Btn>
        </div>
          <Btn
            buttonStyle={{ size: 'big', style: 'blue' }}
            onClick={handleSettle}
          >
            결제하기
          </Btn>
          <div>
            {data ? 
            <>
            <div>amount(결제금액) : {data.amount}</div>
            <div>placeId(장소Id) : {data.placeId}</div>
            <div>placeName(장소명) : {data.placeName}</div>
            <div>placeAddress(주소) : {data.placeAddress}</div>
            <div>latitude(위도) : {data.latitude}</div>
            <div>longitude(경도) : {data.longitude}</div>
            <div>storeAccountNumber(가맹점 계좌번호) : {data.storeAccountNumber}</div>
            </> : 
            undefined
          }
          </div>
        </>
      }
    </div>
  )
}
