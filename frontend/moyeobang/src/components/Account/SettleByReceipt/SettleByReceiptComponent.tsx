import React, { useEffect } from "react"
import { css } from "@emotion/react"
import { colors } from "@/styles/colors";
import Btn from "@/components/common/btn/Btn";
import {format} from 'date-fns';
import { ko} from 'date-fns/locale';
import { Link, useNavigate } from "@tanstack/react-router";
import SettleCardByReceipt from "./SettleCardByReceipt";
import { useState } from "react";
import moyeobang from "@/services/moyeobang";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import HeaderWithBackButton from "@/components/common/Header/HeaderWithBackButton";
import useTravelDetailStore from "@/store/useTravelDetailStore";

const layoutStyle=css`
  position: absolute;
  inset: 0;
  z-index:99999;
  width:100%;
  height:100%;
  background-color:${colors.white};
`;

const containerStyle=css`
  width:100%;
`;

const upContainerStyle=css`
  width:100%;
  box-sizing:border-box;
  margin-top: 50px;
  display:flex;
  flex-direction:column;
  gap:15px;
  padding: 15px 0 15px 30px;
  align-items:flex-start;
`;

const titleStyle=css`
  color: ${colors.fifth};
  font-family:'semibold';
  font-size:24px;
`;

const amountStyle=css`
  display:flex;
  flex-direction:column;
  gap:15px;
  font-family:'semibold';
  font-size:20px;
`;

const remainMoneyStyle=css`
  span {
    color:${colors.fifth};
  }
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
  height:470px;
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
`;

const remainMessageStyle=css`
  color: ${colors.customRed};
`;

interface ResultByReceiptComponentProps {
  data:TransactionDetailByReceipt;
  isUpdate:boolean;
  onClose:VoidFunction;
}

// 영수증 인식 결과
// isNew : True (post) 처음 | isNew : false (fetch) 수정
export default function SettleByReceiptComponenet({data, isUpdate, onClose}:ResultByReceiptComponentProps) {

  const [ updateDetails, setUpdateDetails] = useState<SettledItemByReceipt[]>([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {travelId} = useTravelDetailStore();
  const {accountId} = useTravelDetailStore();
  const [canSettle, setCanSettle] = useState<boolean>(false);
  const [remianMoney, setRemainMoney] = useState<Money>(data.money);  

  // 영수증 정산 update API
  const {mutate: updateSettleByReceipt } = useMutation({
    mutationFn: ({transactionId, travelId, data} : {transactionId: TransactionId, travelId:Id, data: PostTransactionDetailByReceipt}) => 
      moyeobang.updateSettleByReceipt(transactionId, travelId, data),
    onSuccess: async () => {

      await queryClient.invalidateQueries({
            queryKey: ['transactionDetail', accountId, data.transactionId], // detail에 바로 업데이트
            refetchType: 'all',
      });
      await navigate({to: `/account/${data.transactionId.toString()}/detail`});
      onClose();

    },
  });

  // 영수증 정산 post API
  const {mutate: postSettleByReceipt } = useMutation({
    mutationFn: ({transactionId, travelId, data} : {transactionId: TransactionId, travelId:Id, data: PostTransactionDetailByReceipt}) => 
      moyeobang.postSettleByReceipt(transactionId, travelId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['transactionDetail', data.transactionId], // detail에 바로 업데이트
        refetchType: 'all',
      });
      await navigate({to: `/account/${data.transactionId.toString()}/detail`});
      onClose();
    },
  });

  // 항목당 한명이상의 참가자가 포함되었는지 & 남은 금액 0인지
  function updateCanSettle(details: SettledItemByReceipt[], remainMoney:Money) {
    const isAllDetailHaveParticipants = details.every(
      (detail) => detail.participants.length > 0
    );
    setCanSettle(isAllDetailHaveParticipants && remainMoney===0)
  }

  // onChange
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

        const details = prevDetails?.map((detail) => {
          const updatedDetails = detail.orderItemId === itemId ?
            {...detail,
              orderItemTitle:title,
              orderItemQuantity:quantity,
              orderItemPrice:price,
              participants:participants
            } 
            : detail

          return updatedDetails;
          });
        
        const remainingMoney = data.money - details.reduce((acc, detail) => acc+detail.orderItemPrice, 0);
        setRemainMoney(remainingMoney)
        setUpdateDetails(details);
        updateCanSettle(details, remainingMoney);
        return details;
      });
  }

  // 데이터 전송
  function handleSubmit() {

    // 회원 아이디만 넣은 details
    const updatedDetail = updateDetails
    ?.filter(detail => detail.orderItemPrice>0)
    .map((detail) => {
        const memberIds = detail.participants.map((member) => member.memberId)

        return {
          ...detail,
          orderItemPrice:Math.floor(detail.orderItemPrice/memberIds.length),
          participants : memberIds
        };
      });

    // 보낼 데이터
    const updatedReceipt : PostTransactionDetailByReceipt = {
      paymentName: data.paymentName,
      address: data.address,
      money: data.money,
      createdAt: data.createdAt,
      acceptedNumber: data.acceptedNumber,
      details: updatedDetail,
      splitMethod:'receipt',
    }

    
    if ( isUpdate ) {
      updateSettleByReceipt({transactionId: data.transactionId, travelId:travelId, data : updatedReceipt})
    } else {
      postSettleByReceipt({transactionId: data.transactionId, travelId:travelId, data : updatedReceipt})
    }
    console.log('정산 클릭 정산될 데이터:', updatedReceipt)
  }

  function handleRestart() {
    onClose();
    navigate({to:`/account/${data.transactionId}/settle`})
  }

  function handleBackButton() {
    onClose();
  }

  // 초기 데이터 설정
  useEffect(()=>{

    if (!isUpdate) {
      // 영수증 인식 후 데이터 
      let totalMoney = data.money;
      
      const updateDetails = data.details.map((detail) => {
  
        if (totalMoney >= detail.orderItemPrice) {
          totalMoney -= detail.orderItemPrice;
          return detail;
        } else {
          // 영수증 금액이 남은 금액 넘는 순간 나머지 0처리
          const remainMoney = totalMoney;
          totalMoney = 0;
          return {...detail, orderItemPrice:remainMoney}
        }
      });
      setUpdateDetails(updateDetails) 
      setRemainMoney(totalMoney) 
    } else {
      // 업데이트일때 십의자리까지 반올림
      const updateDetails = data.details.map((detail) => {
        return {...detail, orderItemPrice:Math.ceil(detail.orderItemPrice/10)*10};
      })
      setUpdateDetails(updateDetails);
      setRemainMoney(0);
    }
  }, [data, isUpdate])

  return (
    <div css={layoutStyle}>
      <HeaderWithBackButton onClick={handleBackButton}/>
      <div css={containerStyle}>
        <div css={upContainerStyle} >
          <div css={titleStyle}>{data.paymentName}</div>
            <div css={amountStyle}>
              <div>총 금액 {data.money.toLocaleString()}원</div>
              <div css={remainMoneyStyle}>남은 금액 <span>{remianMoney.toLocaleString()}</span>원</div>
            </div>
            <div css={timeStyle}>
              {data.createdAt && format(data.createdAt, 'yyyy-MM-dd HH:mm', { locale: ko })}
            </div>
            <div css={remainMessageStyle}>{ remianMoney<0 && '금액을 초과했어요!😥 수정해주세요!'}</div>
  
        </div>
        <div css={middleContainerStyle}>
          {updateDetails && updateDetails.map((detail, index) => (
            <SettleCardByReceipt 
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
        <Link to={`/account/${data.transactionId}/settle`} search={{ method:'receipt', isUpdate:true }} css={linkStyle}>
          <Btn buttonStyle={{size:'big', style:'greenBlue'}} onClick={handleRestart}>영수증 다시 찍기</Btn>
        </Link>
        { isUpdate ? 
        <Btn 
        buttonStyle={{size:'big', style: canSettle ? 'blue' : 'gray'}} 
        onClick={handleSubmit} 
        disabled={!canSettle}
        >수정 완료
        </Btn> : 
        <Btn 
        buttonStyle={{size:'big', style: canSettle ? 'blue' : 'gray'}} 
        onClick={handleSubmit} 
        disabled={!canSettle}
        >정산 완료
        </Btn>}
      </div>
    </div>
  </div>
  )
}