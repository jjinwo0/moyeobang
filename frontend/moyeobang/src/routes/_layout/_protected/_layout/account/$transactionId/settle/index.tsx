import { createFileRoute,useRouter } from '@tanstack/react-router'
import HeaderWithXButton from '@/components/common/Header/HeaderWithXbutton'
import { css } from '@emotion/react'
import TwoBtn from '@/components/common/btn/TwoBtn';
import React, { useEffect } from 'react';
import { useState } from 'react';
import SettleByCustomComponent from '@/components/Account/SettleByCustom/SettleByCustomComponent';
import SettleByReceiptComponent from '@/components/Account/SettleByReceipt/SettleByReceiptComponent';
import { useSuspenseQuery } from "@tanstack/react-query";
// import { detailsByCustom } from "@/data/data";
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

  // const navigate = useNavigate();
  const {transactionId} : {transactionId:TransactionId} = Route.useParams(); // 임시 1 넣어둠.
  const {history} = useRouter()
  const {method} :{method:SplitMethod} = Route.useSearch();
  const [isHidden, setIsHidden] = useState(false);

  // get으로 transaction의 상세 데이터 가져오기!
  const {data} = useSuspenseQuery({
  queryKey: ['transactionDetail', accountId, transactionId],
  queryFn: () => moyeobang.getTransactionDetail(accountId, Number(transactionId)),
  });

  const transactionDetailData = data.data.data;
  // const transactionDetailData = detailsByCustom; // 임시

  const [activeComponent, setActiveComponent] = useState<'left' | 'right'>(
    method === 'custom' ? 'right' : 'left'
    );

  function handleLeft() {
    setActiveComponent('left')
  }
  
  function handleRight() {
    setActiveComponent('right')
  }
  
  function handleXClick() {
    history.back()
  }

  function handleHidden() {
    setIsHidden(true);
  }

  // 타입 가드 함수
  function isSettledParticipantByCustom(
    detail: SettledItemByReceipt[] | SettledParticipantByCustom[]
  ): detail is SettledParticipantByCustom[] {
    return (detail as SettledParticipantByCustom[])[0]!.participant !== undefined;
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
    { activeComponent==='left' && 
      <SettleByReceiptComponent 
        transactionId={transactionId}
        money={transactionDetailData.money}
        adress={transactionDetailData.adress}
        paymentName={transactionDetailData.paymentName}
        createdAt={transactionDetailData.createdAt}
        handleHidden={handleHidden}
      />
    }
    { activeComponent==='right' && isSettledParticipantByCustom(transactionDetailData.details) &&
      <SettleByCustomComponent
        transactionId={transactionId}
        paymentName={transactionDetailData.paymentName}
        createdAt={transactionDetailData.createdAt}
        totalMoney={transactionDetailData.money}
        details={transactionDetailData.details}
      />
    }
  </div>
  </>
  )
}