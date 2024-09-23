import React, { useState } from 'react';
import { useNavigate} from '@tanstack/react-router'
import UpdateCardByReceipt from '@/components/Account/SettleByReceipt/UpdateCardByReceipt'
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import Btn from '@/components/common/btn/Btn';
import HeaderWithBackButton from '@/components/common/Header/HeaderWithBackButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {layoutStyle,  upContainerStyle, titleStyle, amountStyle, timeStyle, middleContainerStyle, buttonContainerStyle} from './resultByReceipt';
import moyeobang from '@/services/moyeobang';

interface ResultByReceiptComponentProps {
  data:TransactionDetailByReceipt;
  onClose: VoidFunction;
}


export default function ResultByReceiptComponent({data, onClose}:ResultByReceiptComponentProps) {
  
  const navigate = useNavigate({from:'/account/$transactionId/settle'});
  const queryClient = useQueryClient();
  const [updatedData, setUpdatedData] = useState<TransactionDetailByReceipt>(data);
  const transactionId = data.transactionId;

  const {mutate: updateReceipt } = useMutation({
    mutationFn: ({transactionId, data} : {transactionId: TransactionId, data: TransactionDetailByReceipt}) => moyeobang.postSettleByReceipt(transactionId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['receipt'],
        refetchType: 'all',
      });
      await navigate({to: '/account/$transactionId/detail'});
      onClose(); // 결과 컴포넌트 닫기
    },
  });

  // 영수증 인식 후 결과 컴포넌트
  function handleSubmit() {
    if (!updatedData) {
      console.error("영수증 데이터 없음")
      return
    }
    updateReceipt({transactionId:transactionId, data:updatedData})
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
        setUpdatedData((prevData) => {
          if (!prevData) return prevData; // 기존 데이터가 없으면 그대로 반환
    
          return {
            ...prevData,
            details: updatedDetails,
            splitMethod: prevData.splitMethod ?? 'receipt'
          };
        });
    }
    console.log(updatedDetails) // 이거 이용해서 데이터 변환해서 PUT으로 보내기
  }

  function handleRestart(){
    onClose();
    navigate({to:'/account/$transactionId/settle'})
  }

  return (
    <div css={layoutStyle}>
      <HeaderWithBackButton />
          <div css={upContainerStyle} >
            <div css={titleStyle}>{updatedData.paymentName}</div>
            <div css={amountStyle}>{updatedData.money}원</div>
            <div css={timeStyle}>
              { format(updatedData.createdAt, 'yyyy-MM-dd HH:mm', { locale: ko }) }
            </div>
          </div>
          <div css={middleContainerStyle}>
            {updatedData.details.map((detail, index) => (
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