import React from "react"
import { css } from "@emotion/react"
import { colors } from "@/styles/colors";
import Btn from "@/components/common/btn/Btn";
import {format} from 'date-fns';
import { ko} from 'date-fns/locale';
import { Link, useNavigate } from "@tanstack/react-router";
import UpdateCardByReceipt from "./UpdateCardByReceipt";
import { useState } from "react";
import moyeobang from "@/services/moyeobang";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import HeaderWithBackButton from "@/components/common/Header/HeaderWithBackButton";

const layoutStyle=css`
  position: absolute;
  inset: 0;
  z-index:99999;
  width:100%;
  height:100%;
  background-color:${colors.white};
  display:flex;
  flex-direction:column;
`;

const upContainerStyle=css`
  margin-top: 50px;
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

const linkStyle =css`
  text-decoration: none;
`


interface ResultByReceiptComponentProps {
  data:TransactionDetailByReceipt;
  isNew:boolean;
  onClose:VoidFunction;
}

// 영수증 인식 결과
// isNew : True (post) 처음 | isNew : false (fetch) 수정
export default function ResultByReceiptComponenet({data, isNew, onClose}:ResultByReceiptComponentProps) {

  const [ updateDetails, setUpdateDetails] = useState<SettledItemByReceipt[]>(data.details);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 영수증 정산 update API
  const {mutate: updateSettleByReceipt } = useMutation({
    mutationFn: ({transactionId, data} : {transactionId: TransactionId, data: TransactionDetailByReceipt}) => 
      moyeobang.postSettleByReceipt(transactionId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['receipt'],
        refetchType: 'all',
      });
      await navigate({to: `/account/${data.transactionId}/detail`});
      onClose();
    },
  });

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

        if (!prevDetails) return []; 

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
    // console.log(updateDetails) // 이거 이용해서 데이터 변환
  }

  function handleSubmit() {
    const updateReceipt = {
      ...data,
      details:updateDetails,
      splitMethod:'receipt',
    }
    updateSettleByReceipt({transactionId: data.transactionId , data : updateReceipt})
    console.log('정산 클릭 정산될 데이터:', updateReceipt)
  }

  function handleRestart() {
    onClose();
    navigate({to:`/account/${data.transactionId}/settle`})
  }

  function handleBackButton() {
    onClose();
  }

  return (
    <div css={layoutStyle}>
      <HeaderWithBackButton onClick={handleBackButton}/>
        <div css={upContainerStyle} >
          <div css={titleStyle}>{data.paymentName}</div>
            <div css={amountStyle}>{data.money}원</div>
            <div css={timeStyle}>
              {data.createdAt && format(data.createdAt, 'yyyy-MM-dd HH:mm', { locale: ko })}
          </div>
        </div>
        <div css={middleContainerStyle}>
          {data.details.map((detail, index) => (
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
        <Link to={`/account/${data.transactionId}/settle`} css={linkStyle}>
          <Btn buttonStyle={{size:'big', style:'greenBlue'}} onClick={handleRestart}>영수증 다시 찍기</Btn>
        </Link>
        { isNew ? 
        <Btn buttonStyle={{size:'big', style:'blue'}} onClick={handleSubmit}>정산 완료</Btn> : 
        <Btn buttonStyle={{size:'big', style:'blue'}} onClick={handleSubmit}>수정 완료</Btn>}
      </div>
    </div>
  )
}