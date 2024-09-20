import React, { useEffect, useState } from 'react';
import { useNavigate} from '@tanstack/react-router'
import { isValid, parseISO } from 'date-fns';
import UpdateCardByReceipt from '@/components/Account/SettleByReceipt/UpdateCardByReceipt'
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import Btn from '@/components/common/btn/Btn';
import { useReceiptContext } from '@/context/ReceiptContext';
import HeaderWithBackButton from '@/components/common/Header/HeaderWithBackButton';
import {layoutStyle,  upContainerStyle, titleStyle, amountStyle, timeStyle, middleContainerStyle, buttonContainerStyle} from './resultByReceipt';

export default function ResultByReceiptComponent({data} : {data : TransactionDetailByReceipt}) {
  
  const navigate = useNavigate({from:'/account/$transactionId/settle'});
  const {receiptData, isNew} = useReceiptContext();
  const [updatedData, setUpdatedData] = useState<TransactionDetailByReceipt>(data);

  // isNew 기준으로 true 이면 POST. false 이면 PUT
  useEffect(()=>{
    // 수정
    if (!isNew) {
      // get요청
    } else {
      // receiptData 가져오기
      setUpdatedData(receiptData)
    }
  }, [isNew]);

  function handleSubmit() {

    if (isNew) {
      // POST 요청
    } else {
      // PUT 이미 영수증 인식했던거 다시 인식 근데 굳이? 
    }

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
    navigate({to:'/account/$transactionId/settle'})
  }
  
  // 날짜가 유효한지 확인
  const validCreatedAt = updatedData.createdAt && isValid(new Date(data.createdAt));

  return (
    <>
    <HeaderWithBackButton />
    <div css={layoutStyle}>
          <div css={upContainerStyle} >
            <div css={titleStyle}>{updatedData.paymentName}</div>
            <div css={amountStyle}>{updatedData.money}원</div>
            <div css={timeStyle}>
              {validCreatedAt
              ? format(new Date(updatedData.createdAt), 'yyyy-MM-dd HH:mm', { locale: ko })
              : '날짜 없음'}
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
    </>
  )
}