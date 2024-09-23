import React, { useEffect } from 'react';
import { createFileRoute, useNavigate} from '@tanstack/react-router'
import { css } from '@emotion/react'
import UpdateCardByReceipt from '@/components/Account/SettleByReceipt/UpdateCardByReceipt'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {format} from 'date-fns';
import { ko} from 'date-fns/locale';
import Btn from '@/components/common/btn/Btn';
import { colors } from '@/styles/colors';
import moyeobang from '@/services/moyeobang';
import { useState } from 'react';
import { detailsByReceipt } from '@/data/data'
import { useReceiptContext } from '@/context/ReceiptContext';

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
  const queryClient = useQueryClient();
  const { receiptData } = useReceiptContext();
  const {isNew} : {isNew : boolean} = Route.useSearch();
  const isNewState = isNew!==undefined ? false : true;

  console.log('수정으로 들어오면 isNew : ', isNewState, '임')
  
  // get 기본 데이터 가져오기! (1/n정산된 데이터)
  // const { data } = useQuery({
  //   queryKey: ['receipt', transactionId],
  //   queryFn: () => moyeobang.getTransactionDetail(accountId, transactionId),
  //   enabled: !isNewState
  // });

  // const receipt = isNewState ? receiptData : data?.data.data as TransactionDetailByReceipt;
  const receipt = isNewState ? receiptData : detailsByReceipt; // 임시

  useEffect(() => {
    setUpdateDetails(receipt.details);
  }, [])

  const [updateDetails , setUpdateDetails] = useState<SettledItemByReceipt[]>(receipt.details);

  const {mutate: updateReceipt } = useMutation({
    mutationFn: ({transactionId, data} : {transactionId: TransactionId, data: TransactionDetailByReceipt}) => 
      moyeobang.postSettleByReceipt(transactionId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['receipt'],
        refetchType: 'all',
      });
      await navigate({to: '/account/$transactionId/detail'});
    },
  });

  function handleSubmit() {
    const updatereceipt = {
      ...receipt,
      details:updateDetails,
      splitMethod:'receipt',
    }
    updateReceipt({transactionId:transactionId, data:updatereceipt})
    console.log('정산완료 클릭')
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

      setUpdateDetails((prevDetails) => {

        if (!prevDetails) return prevDetails; 

        return prevDetails?.map((detail) => 
          detail.orderItemId === itemId ?
          {...detail,
            orderItemTitle:title,
            orderItemQuantity:quantity,
            orderItemPrice:price,
            participants:participants
          } : detail
        )
      })
    console.log(updateDetails) // 이거 이용해서 데이터 변환
  }

  function handleRestart(){
    navigate({to:'/account/$transactionId/settle'})
  }
  

  return (
    <div css={layoutStyle}>
          <div css={upContainerStyle} >
            <div css={titleStyle}>{receipt?.paymentName}</div>
            <div css={amountStyle}>{receipt?.money}원</div>
            <div css={timeStyle}>
              {format(receipt?.createdAt, 'yyyy-MM-dd HH:mm', { locale: ko })}
            </div>
          </div>
          <div css={middleContainerStyle}>
            {receipt?.details.map((detail, index) => (
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