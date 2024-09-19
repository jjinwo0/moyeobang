import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react'
import { css } from '@emotion/react';
import Btn from '@/components/common/btn/Btn';
import { locale } from 'dayjs';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

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

export const Route = createFileRoute('/pos/')({
  component: Pos
})

const layoutStyle =css`
  display:flex;
  flex-direction:column;
  align-items: center;
  gap:10px;
  justify-content:center;
  padding: 0 10px;

  input {
    width:300px;
    height:50px;
    border-radius:15px;
    font-size: 20px;
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
    flex-direction:row;
    /* align-items:center; */
    /* justify-content:center; */
    gap:20px;
`;


// createdAt, uuid(paymentRequestId), paymentName, adress, money 필요
export default function Pos() {
  const [paymentName, setPaymentName] = useState<PaymentName>('');
  const [money, setMoney] = useState<Money>(0);
  const [adress, setAdress]= useState<Adress>('');
  const [createdAt, setCreatedAt]= useState<Date>(new Date());
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({}); // 각 상품의 수량을 저장

  function handlePaymentName(e: React.ChangeEvent<HTMLInputElement>) {
    setPaymentName(e.target.value)
  }

  function handleAdress(e: React.ChangeEvent<HTMLInputElement>) {
    setAdress(e.target.value)
  }

  function handleMoney(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === '') {
      setMoney(0);
    }

    const newMoney = parseFloat(e.target.value); // 숫자로변환

    if ( !isNaN(newMoney) ) {
      setMoney(newMoney)
    }
  }

  function handleCreatedAt(e: React.ChangeEvent<HTMLInputElement>) {
    setCreatedAt(new Date(e.target.value));
  }

  // 수량 증가
  function increaseQuantity(itemId: number) {
    const itemPrice = Items.find((item) => item.orderItemId === itemId)?.orderItemPrice || 0;

    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[itemId] || 0) + 1;
      setMoney((prevMoney) => prevMoney + itemPrice); 
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
      const newQuantity = (prevQuantities[itemId] || 0) - 1;
      setMoney((prevMoney) => prevMoney - itemPrice); 
      return {
        ...prevQuantities,
        [itemId]: newQuantity,
      };
    });
  }

  function handleClick() {
  }

  return (
    <div css={layoutStyle}>
      <div>
        <p>가게명(paymentName)</p>
        <input type="text" value={paymentName} onChange={handlePaymentName}/>
      </div>
      <div>
        <p>주소(Adress)</p>
      <input type="text" value={adress} onChange={handleAdress}/>
      </div>
      <div>
        <p>총금액(Money)</p>
      <input type="text" value={money} onChange={handleMoney}/>
      </div>
      <div>
        <p>날짜(CreatedAt) - {format(createdAt, 'yyyy-MM-dd HH:mm', { locale: ko })}</p>
        <input type="date" value={createdAt} onChange={handleCreatedAt} />
      </div>

      {Items.map((item) => (
        <div key={item.orderItemId} css={boxStyle}>
          <div>
            <div>{item.orderItemTitle}</div>
            <div>{item.orderItemPrice}원</div>
            <div>수량: {quantities[item.orderItemId] || 0}</div> 
          </div>
            <div const={buttonLayoutStyle}>
            <div>
              <Btn 
                buttonStyle={{size:'middle', style:'blue'}}
                onClick={() => increaseQuantity(item.orderItemId)}
                >+</Btn>
            </div>
            <div>
              <Btn 
                buttonStyle={{size:'middle', style:'red'}}
                onClick={() => decreaseQuantity(item.orderItemId)}
                >-</Btn>
            </div>
            </div>
        </div>
      ))}
      <Btn buttonStyle={{size:'big', style:'blue'}} onClick={handleClick}>결제하기</Btn>
    </div>
  )
}