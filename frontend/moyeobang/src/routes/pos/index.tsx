import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';
import { css } from '@emotion/react';
import Btn from '@/components/common/btn/Btn';
import QrScanByPos from '@/components/QrByPos/QrScanByPos';
import ResultByPos from '@/components/QrByPos/ResultByPos';

const starbucks: PosPay = {
    placeId : 'starbucks-12',
    placeName: '스타벅스 제주중문점',
    placeAddress: '제주 서귀포시 중문관광로110번길 32 (색달동)',
    amount: 25000,
    latitude:33.251224,
    longitude:126.4128286,
    targetAccountNumber: '0018418012115489',
    tag:'CAFE'
  }

const kurosiro: PosPay = {
    placeId : 'ramen-186',
    placeName: '자매국수',
    placeAddress: '제주 제주시 항골남길 46 자매국수',
    amount: 20000,
    latitude:33.4985643,
    longitude:126.458788,
    targetAccountNumber: '0018418012115489',
    tag:'RESTAURANT'
  }

const abebeBakery: PosPay = {
    placeId : 'bakery-12',
    placeName: '아베베베이커리',
    placeAddress: '제주 제주시 동문로6길 4 동문시장 12번 게이트 옆',
    amount: 34000,
    latitude:34.5,
    longitude:90.2,
    targetAccountNumber: '0018418012115489',
    tag:'CAFE'
  }

const surfing: PosPay = {
    placeId : 'surfing-112',
    placeName: '제주서핑스쿨',
    placeAddress: '제주 서귀포시 중문관광로 192 1층 제주서핑스쿨 제주해양레저',
    amount: 66000,
    latitude:33.2584491,
    longitude:126.4131125,
    targetAccountNumber: '0018418012115489',
    tag:'ACTIVITY'
  }

const suksungdo: PosPay = {
    placeId : 'suksungdo-12',
    placeName: '숙성도 제주본점',
    placeAddress: '제주 제주시 제원길 30 2, 3층',
    amount: 82000,
    latitude:33.5423994,
    longitude:126.6712053,
    targetAccountNumber: '0018418012115489',
    tag:'RESTAURANT'
  }

const farm: PosPay = {
    placeId : 'farm-10',
    placeName: '제주양떼목장',
    placeAddress: '제주 제주시 애월읍 도치돌길 289-13',
    amount: 50000,
    latitude:33.411167,
    longitude:126.3653,
    targetAccountNumber: '0018418012115489',
    tag:'ACTIVITY'
  }

const shop: PosPay = {
    placeId : 'shop-10',
    placeName: '제주소품샵 올망',
    placeAddress: '제주 제주시 애월읍 어도봉남길 27 제주소품샵 올망',
    amount: 42000,
    latitude:33.4160325,
    longitude:126.3028545,
    targetAccountNumber: '0018418012115489',
    tag:'SHOPPING'
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
  // const targetAccountNumber = '0012280102000441'
  // 신규 const targetAccountNumber '0018418012115489'

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
          <Btn buttonStyle={{size:'big', style:'red'}} onClick={() => handleOpen(starbucks)}>스타벅스 제주중문점</Btn>
          <Btn buttonStyle={{size:'big', style:'red'}} onClick={() => handleOpen(kurosiro)}>자매국수</Btn>
          <Btn buttonStyle={{size:'big', style:'red'}} onClick={() => handleOpen(abebeBakery)}>아베베베이커리</Btn>
          <Btn buttonStyle={{size:'big', style:'red'}} onClick={() => handleOpen(surfing)}>제주서핑스쿨</Btn>
          <Btn buttonStyle={{size:'big', style:'red'}} onClick={() => handleOpen(suksungdo)}>숙성도 제주본점</Btn>
          <Btn buttonStyle={{size:'big', style:'red'}} onClick={() => handleOpen(farm)}>제주양떼목장</Btn>
          <Btn buttonStyle={{size:'big', style:'red'}} onClick={() => handleOpen(shop)}>제주소품샵 올망</Btn>
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
            <div>targetAccountNumber(가맹점 계좌번호) : {data.targetAccountNumber}</div>
            <div>tag(카테고리 이름) : {data.tag}</div>
            </> : 
            undefined
          }
          </div>
        </>
      }
    </div>
  )
}
