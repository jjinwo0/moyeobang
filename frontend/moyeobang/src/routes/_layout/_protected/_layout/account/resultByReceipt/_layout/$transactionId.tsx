import React from 'react';
import { createFileRoute, useNavigate} from '@tanstack/react-router'
import { css } from '@emotion/react'
import { useState } from 'react';
import { detailDataByEqualAfterSettle, chatData } from "@/data/data";
import { extractItems } from '@/utils/receiptParser';
import UpdateCardByReceipt from '@/components/Account/SettleByReceipt/UpdateCardByReceipt'
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import Btn from '@/components/common/btn/Btn';
import { OrderItemId, OrderItemQuantity} from '@/types/ex';
import { colors } from '@/styles/colors';
const dummyData = detailDataByEqualAfterSettle;
const chData = extractItems(chatData);

export const Route = createFileRoute('/_layout/_protected/_layout/account/resultByReceipt/_layout/$transactionId')({
  component: settledReceipt
})  

const layoutStyle = css`
  margin-top:50px;
  width:100%;
  display:flex;
  flex-direction:column;
`;

const upContainerStyle=css`
  display:flex;
  flex-direction:column;
  gap:15px;
  padding-left:30px;
  padding-top:20px;
  padding-bottom:20px;
`;

const titleStyle=css`
  font-family:'semibold';
  font-size:24px;
`;

const amountStyle=css`
  font-family:'semibold';
  font-size:20px;
`;

const timeStyle=css`
  font-family:'regular';
  font-size:16px;
`;

const middleContainerStyle=css`
  display:flex;
  flex-direction:column;
  box-sizing:border-box;
  width:100%;
  max-width: 100%;
  height:515px;
  gap:20px;
  overflow-y:auto;
  padding-bottom: 20px;

  &::-webkit-scrollbar {
        display: none;
    }
  
`;

const buttonContainerStyle=css`
  position:fixed;
  bottom:30px;
  background-color: ${colors.white};
  width:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  gap:20px;
  padding-top: 10px;
`;

export default function settledReceipt() {
  
  const navigate = useNavigate({from:'/account/resultByReceipt'});
  const {transactionId} :{ transactionId : TransactionId} = Route.useParams();
  const [data, setData] = useState(null); // 기존 거래 데이터를 저장할 상태
  // const [isLoading, setIsLoading] = useState(true); // 로딩 상태


  console.log(chData) // 영수증 정산 완료된 후 들어오는 임시 데이터

  // async function fetchData(id:number) {
  //   // 거래 데이터를 불러와 상태에 저장
  //   const response = await fetch(`/api/transaction/${id}`);
  //   const result = await response.json();
  //   setData(result);
  //   setIsLoading(false);
  // }

  function handleSubmit() {
    // if (transactionId) {
    //   // 수정 PUT
    //   fetch(`/api/transaction/${transactionId}`, {
    //     method: 'PUT',
    //     body: JSON.stringify(data),
    //   });
    // } 
  }

  // if (isLoading) {
  //   return <div>로딩 중...</div>;
  // }

  function handleChange({itemId, title, quantity, amount, participants} : {
    itemId:OrderItemId
    title:OrderItemTitle
    quantity:OrderItemQuantity
    amount:OrderItemAmount
    participants:ParticipantInfo[]
  }) {
    // console.log('업데이트확인',itemId, title, quantity, amount, participants)
    const updatedData = dummyData.details.map((detail) => 
      detail.orderItemId===itemId ? (
        { ...detail, 
          orderItemAmount:amount, 
          orderItemQuantity:quantity, 
          orderItemTitle:title, 
          participants:participants}) : detail
    )
    console.log(updatedData) // 이거 이용해서 데이터 변환해서 PUT으로 보내기
  }

  function handleRestart(){
    navigate({to:'/account/settle'})
  }

  return (
    <div css={layoutStyle}>
          <div css={upContainerStyle} >
            <div css={titleStyle}>{dummyData.place}</div>
            <div css={amountStyle}>{dummyData.amount}원</div>
            <div css={timeStyle}>{format(dummyData.createdAt,'yyyy-MM-dd HH:mm', {locale: ko})}</div>
          </div>
          <div css={middleContainerStyle}>
            {dummyData.details.map((detail, index) => (
              <UpdateCardByReceipt 
              key={index}
              itemId={detail.orderItemId}
              itemTitle={detail.orderItemTitle}
              itemQuantity={detail.orderItemQuantity}
              itemAmount={detail.orderItemAmount} 
              participants={detail.participants}
              onChange={handleChange}
              />
            ))}
        </div>
        <div css={buttonContainerStyle}>
          <Btn buttonStyle={{size:'big', style:'greenBlue'}} onClick={handleRestart}>영수증 다시 찍기</Btn>
          <Btn buttonStyle={{size:'big', style:'blue'}} onClick={handleSubmit}>정산 완료</Btn>
        </div>
    </div>
  )
}