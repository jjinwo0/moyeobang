import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react'
import { css } from '@emotion/react';
import Btn from '@/components/common/btn/Btn';
import { locale } from 'dayjs';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import QrScanByPos from '@/components/QrByPos/QrScanByPos';

const Items = [
  {
    orderItemId : 1,
    orderItemTitle:'아이스 아메리카노',
    orderItemPrice: 1500,
  },
  {
    orderItemId : 2,
    orderItemTitle:'카페라떼',
    orderItemPrice: 3000,
  },
  {
    orderItemId : 3,
    orderItemTitle:'카라멜마끼아또',
    orderItemPrice: 3500,
  },
  {
    orderItemId : 4,
    orderItemTitle:'티라미수 케이크',
    orderItemPrice: 6500,
  },
];

export const Route = createFileRoute('/pos/_layout/')({
  component: Pos
})

const layoutStyle =css`
  display:flex;
  flex-direction:column;
  align-items: center;
  justify-content:center;
  padding: 0 10px;

  input {
    width:300px;
    height:30px;
    border-radius:15px;
    font-size: 16px;
    padding: 0 15px;
  }

  div {
    padding: 10px;
  }

  p {
    padding:10px;
  }
`;

const boxStyle=css`
  width:100%;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
`;

const buttonLayoutStyle=css`
    display:flex;
    flex-direction:column;
    /* align-items:center; */
    /* justify-content:center; */
    gap:5px;
`;


// createdAt, uuid(paymentRequestId), paymentName, adress, money 필요
export default function Pos() {
  const [placeId, setPlaceId] = useState<number>(0);
  const [placeName, setPlaceName] = useState<PaymentName>('');
  const [amount, setAmount] = useState<Money>(0);
  const [placeAdress, setPlaceAdress]= useState<Adress>('');
  const [latitude, setLatitude]= useState<number>(0);
  const [longitude, setLongitude]= useState<number>(0);
  const [targetAccountNumber, setTargetAccountNumber]= useState<string>("");

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({}); // 각 상품의 수량을 저장
  const [isOpenQrModal, setIsOpenQrModal] = useState<boolean>(false);
  const [ data, setData ] = useState<PosPay>();

  function handlePlaceId(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === '') {
      setPlaceId(0);
    }
    const newId= parseFloat(e.target.value); // 숫자로변환
    if ( !isNaN(newId) ) {
      setPlaceId(newId)
    }
  }

  function handlePlaceName(e: React.ChangeEvent<HTMLInputElement>) {
    setPlaceName(e.target.value)
  }

  function handlePlaceAdress(e: React.ChangeEvent<HTMLInputElement>) {
    setPlaceAdress(e.target.value)
  }

  function handleAmount(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === '') {
      setAmount(0);
    }
    const newAmount = parseFloat(e.target.value); // 숫자로변환
    if ( !isNaN(newAmount) ) {
      setAmount(newAmount)
    }
  }

  function handleLatitude(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === '') {
      setLatitude(0);
    }
    const newLatitude = parseFloat(e.target.value); // 숫자로변환
    if ( !isNaN(newLatitude) ) {
      setLatitude(newLatitude)
    }
  }

  function handleLongitude(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === '') {
      setLongitude(0);
    }
    const newLongitude = parseFloat(e.target.value); // 숫자로변환
    if ( !isNaN(newLongitude) ) {
      setLongitude(newLongitude)
    }
  }

  function handleTargetAccountNumber(e: React.ChangeEvent<HTMLInputElement>) {
    setTargetAccountNumber(e.target.value);
  }

  // 수량 증가
  function increaseQuantity(itemId: number) {
    const itemPrice = Items.find((item) => item.orderItemId === itemId)?.orderItemPrice || 0;

    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[itemId] || 0) + 1;
      setAmount((prevAmount) => prevAmount + itemPrice); 
      return {
        ...prevQuantities,
        [itemId]: newQuantity,
      };
    });
  }

  // 수량 감소
  function decreaseQuantity(itemId: number) {
    const itemPrice = Items.find((item) => item.orderItemId === itemId)?.orderItemPrice || 0;

    setQuantities((prevQuantities) => {
      const currentQuantity = (prevQuantities[itemId] || 0)
      const newQuantity = currentQuantity>=1 ? (currentQuantity - 1 ): 0;

      if (currentQuantity > 0) {
        setAmount((prevAmount) => prevAmount - itemPrice); 
      }

      return {
        ...prevQuantities,
        [itemId]: newQuantity,
      };
    });
  }

  // 정산하기
  function handleSettle() {
    const data : PosPay = {
      placeId,
      placeName,
      placeAdress,
      latitude,
      longitude,
      targetAccountNumber,
    }
    setData(data)
    setIsOpenQrModal(true);
  }

  function handleQrClose() {
    setIsOpenQrModal(false);
  }

  return (
    <div css={layoutStyle}>
      {isOpenQrModal && data ? (
        <QrScanByPos onClose={handleQrClose} paymentData={data} /> ) : (
    <>
      <div>
        <p>가맹점 id (placeId)</p>
        <input type="text" value={placeId} onChange={handlePlaceId} />
      </div>
      <div>
        <p>가맹점 이름 (placeName)</p>
        <input type="text" value={placeName} onChange={handlePlaceName} />
      </div>
      <div>
        <p>가맹점 주소(placeAdress)</p>
        <input type="text" value={placeAdress} onChange={handlePlaceAdress} />
      </div>
      <div>
        <p>가맹점 계좌번호(targetAccountNumber)</p>
        <input type="text" value={targetAccountNumber} onChange={handleTargetAccountNumber} />
      </div>
      <div>
        <p>위도(latitude)</p>
        <input type="text" value={latitude} onChange={handleLatitude} />
      </div>
      <div>
        <p>경도(longitude)</p>
        <input type="text" value={longitude} onChange={handleLongitude} />
      </div>
      <div>
        <p>총금액(Money)</p>
        <input type="text" value={amount} onChange={handleAmount} />
      </div>


      {Items.map((item) => (
        <div key={item.orderItemId} css={boxStyle}>
          <div>
            <div>{item.orderItemTitle}</div>
            <div>{item.orderItemPrice}원</div>
            <div>수량: {quantities[item.orderItemId] || 0}</div>
          </div>
          <div css={buttonLayoutStyle}>
            <div>
              <Btn
                buttonStyle={{ size: 'middle', style: 'blue' }}
                onClick={() => increaseQuantity(item.orderItemId)}
              >
                +
              </Btn>
            </div>
            <div>
              <Btn
                buttonStyle={{ size: 'middle', style: 'red' }}
                onClick={() => decreaseQuantity(item.orderItemId)}
              >
                -
              </Btn>
            </div>
          </div>
        </div>
      ))}
      <Btn buttonStyle={{ size: 'big', style: 'blue' }} onClick={handleSettle}>
        결제하기
      </Btn>
    </>
  )}
</div>
  )
}