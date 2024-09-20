import React from 'react';
import { createFileRoute, useNavigate} from '@tanstack/react-router'
import { css } from '@emotion/react'
import UpdateCardByReceipt from '@/components/Account/SettleByReceipt/UpdateCardByReceipt'
import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import Btn from '@/components/common/btn/Btn';
import { colors } from '@/styles/colors';
import moyeobang from '@/services/moyeobang';
import { useState } from 'react';

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
  
  const accountId : AccountId = 1; // 임시
  const { transactionId } :{ transactionId : TransactionId} = Route.useParams();
  const navigate = useNavigate({from:'/account/$transactionId/resultByReceipt'});
  const [receiptData, setReceiptData] = useState<TransactionDetailByReceipt>();
  const queryClient = useQueryClient();
  
  // get 기본 데이터 가져오기! (1/n정산된 데이터)
  const { data } = useSuspenseQuery({
    queryKey: ['receipt', transactionId],
    queryFn: () => moyeobang.getTransactionDetail(accountId, transactionId),
  });

  const receipt = data.data.data as TransactionDetailByReceipt;
  console.log(receipt)
  setReceiptData(receipt);

  const {mutate: updateReceipt } = useMutation({
    mutationFn: ({transactionId, data} : {transactionId: TransactionId, data: TransactionDetailByReceipt}) => moyeobang.postSettleByReceipt(transactionId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['receipt'],
        refetchType: 'all',
      });
      await navigate({to: '/account/$transactionId/detail'});
    },
  });

  function handleSubmit() {
    if (!receiptData) {
      console.error("영수증 데이터 없음")
      return
    }
      updateReceipt({transactionId:transactionId, data:receiptData})
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
      const updatedDetails = receiptData?.details.map((detail) =>
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
        setReceiptData((prevData) => {
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
  

  return (
    <div css={layoutStyle}>
          <div css={upContainerStyle} >
            <div css={titleStyle}>{receiptData?.paymentName}</div>
            <div css={amountStyle}>{receiptData?.money}원</div>
            <div css={timeStyle}>
              {format(receiptData?.createdAt ?? new Date() , 'yyyy-MM-dd HH:mm', { locale: ko })}
            </div>
          </div>
          <div css={middleContainerStyle}>
            {receiptData?.details.map((detail, index) => (
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