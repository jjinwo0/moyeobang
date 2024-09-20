import React, { useEffect, useState } from 'react';
import { createFileRoute, useNavigate, useLocation} from '@tanstack/react-router'
import { css } from '@emotion/react'
import { isValid, parseISO } from 'date-fns';
// import { detailDataByReceiptAfterSettle, chatData } from "@/data/data";
import UpdateCardByReceipt from '@/components/Account/SettleByReceipt/UpdateCardByReceipt'
import { useSuspenseQuery } from '@tanstack/react-query';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import Btn from '@/components/common/btn/Btn';
import { colors } from '@/styles/colors';

export const Route = createFileRoute('/_layout/_protected/_layout/account/$transactionId/resultByReceipt/_layout/')({
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
  
  const { transactionId } :{ transactionId : TransactionId} = Route.useParams();
  const navigate = useNavigate({from:'/account/$transactionId/resultByReceipt'});
  const [data, setData] = useState<TransactionDetailByReceipt>();
  
  // const chData = extractItems(chatData, transactionId);
  // console.log(chData) // 영수증 정산 완료된 후 들어오는 임시 데이터
  
  // get으로 정산 후 기본 데이터 가져오기!
  const { receipt } = useSuspenseQuery({
    queryKey: ['receipt', transactionId],
    // queryFn: ({transactionId})
  })



  function handleSubmit() {
      // 정산하기

  }

  function handleChange({
    itemId,
    title,
    quantity,
    price,
    participants,
    }: {
      itemId: OrderItemId;
      title: OrderItemTitle;
      quantity: OrderItemQuantity;
      price: OrderItemPrice;
      participants: ParticipantInfo[];
    }) {
      const updatedDetails = data?.details.map((detail) =>
        detail.orderItemId === itemId
          ? {
              ...detail,
              orderItemAmount: price,
              orderItemQuantity: quantity,
              orderItemTitle: title,
              participants: participants,
            }
          : detail
      );
    
      if (updatedDetails) {
        setData((prevData) => {
          if (!prevData) return prevData; // 기존 데이터가 없으면 그대로 반환
    
          return {
            ...prevData,
            details: updatedDetails,
            splitMethod: prevData.splitMethod ?? 'receipt'
          };
        });
    }
    console.log(updatedDetails) // 이거 이용해서 데이터 변환
  }

  function handleRestart(){
    navigate({to:'/account/$transactionId/settle'})
  }
  
  // 날짜가 유효한지 확인
  const validCreatedAt = data?.createdAt && isValid(new Date(data.createdAt));

  return (
    <div css={layoutStyle}>
          <div css={upContainerStyle} >
            <div css={titleStyle}>{data?.paymentName}</div>
            <div css={amountStyle}>{data?.money}원</div>
            <div css={timeStyle}>
              {validCreatedAt
              ? format(new Date(data?.createdAt), 'yyyy-MM-dd HH:mm', { locale: ko })
              : '날짜 없음'}
            </div>
          </div>
          <div css={middleContainerStyle}>
            {data?.details.map((detail, index) => (
              <UpdateCardByReceipt 
              key={index}
              itemId={detail.orderItemId}
              itemTitle={detail.orderItemTitle}
              itemQuantity={detail.orderItemQuantity}
              itemPrice={detail.orderItemPrice} 
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