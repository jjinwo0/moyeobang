import React from 'react';
import { createFileRoute,useRouter } from '@tanstack/react-router'
import HeaderWithXButton from '@/components/common/Header/HeaderWithXbutton'
import { css } from '@emotion/react'
import TwoBtn from '@/components/common/btn/TwoBtn';
import { useState } from 'react';
import SettleByCustomComponent from '@/components/Account/SettleByCustom/SettleByCustomComponent';
import SettleByReceiptComponent from '@/components/Account/SettleByReceipt/SettleByReceiptComponent';
import { useSuspenseQuery } from "@tanstack/react-query";
import moyeobang from '@/services/moyeobang';


export const Route = createFileRoute('/_layout/_protected/_layout/account/$transactionId/settle/')({
  component: Settle
})  

const layoutStyle = css`
  width:100%;
  height:100%;
  margin-top:50px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  gap: 20px;
`;

const accountId = 1; //임시

// 정산페이지 (영수증인지 직접 입력인지)
export default function Settle() {

  const {transactionId} : {transactionId:TransactionId} = Route.useParams(); 
  const {history} = useRouter()
  const {method} :{method:SplitMethod} = Route.useSearch();
  
  const [activeComponent, setActiveComponent] = useState<'left' | 'right'>(
    method === 'custom' ? 'right' : 'left'
    );
  
  const isUpdate : boolean = method==='custom'
  
  // 정산 내역 상세 조회 get API
  const {data} = useSuspenseQuery({
  queryKey: ['transactionDetail', transactionId],
  queryFn: () => moyeobang.getTransactionDetail(accountId, Number(transactionId)),
  });

  const transactionDetailData = data.data.data;

  function handleLeft() {
    setActiveComponent('left')
  }
  
  function handleRight() {
    setActiveComponent('right')
  }
  
  function handleXClick() {
    history.back()
  }

  // 타입 가드 함수
  function isSettledParticipantByCustom(
    details: SettledItemByReceipt[] | SettledParticipantByCustom[]
  ): details is SettledParticipantByCustom[] {
    console.log(details)
    return Array.isArray(details) && details.length > 0 && (details as SettledParticipantByCustom[])[0].participant!== undefined;
  }

  return (
      <>
        <HeaderWithXButton onXClick={handleXClick}/> 
        <div css={layoutStyle}>
          <TwoBtn 
            leftText='영수증 인식'
            rightText='직접 입력'
            onLeftClick={handleLeft}
            onRightClick={handleRight}
            defaultActive={activeComponent}
          />
          { activeComponent === 'left' && 
            <SettleByReceiptComponent 
              transactionId={Number(transactionId)}
              money={transactionDetailData.money}
              address={transactionDetailData.address}
              paymentName={transactionDetailData.paymentName}
              createdAt={transactionDetailData.createdAt}
              acceptedNumber={transactionDetailData.acceptedNumber}
            />
          }
          { activeComponent === 'right' &&
            <SettleByCustomComponent
              transactionId={Number(transactionId)}
              paymentName={transactionDetailData.paymentName}
              createdAt={transactionDetailData.createdAt}
              totalMoney={transactionDetailData.money}
              details={isSettledParticipantByCustom(transactionDetailData.details) ? transactionDetailData.details : []} 
              acceptedNumber={transactionDetailData.acceptedNumber}
              isUpdate={isUpdate} // method있으면 수정 | 없으면 새로 생성
            />
          }
        </div>
      </>
    )
}