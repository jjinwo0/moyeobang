import { createFileRoute,useRouter } from '@tanstack/react-router'
import HeaderWithXButton from '@/components/common/Header/HeaderWithXbutton'
import { css } from '@emotion/react'
import TwoBtn from '@/components/common/btn/TwoBtn';
import React, { useEffect } from 'react';
import { useState } from 'react';
import SettleByCustomComponent from '@/components/Account/SettleByCustom/SettleByCustomComponent';
import SettleByReceiptComponent from '@/components/Account/SettleByReceipt/SettleByReceiptComponent';
import { useLocation } from '@tanstack/react-router';
import { useCompleteTransaction } from '@/context/TransactionContext';


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

// LocationState 타입 정의
interface LocationState {
  active?: string; // active 속성이 있을 수 있는 타입 지정
}

// 정산페이지 (영수증인지 직접 입력인지)
export default function Settle() {

  // const navigate = useNavigate();
  const {transactionId} : {transactionId:TransactionId} = Route.useParams(); // 임시 1 넣어둠.
  const {history} = useRouter()
  const location = useLocation();
  const state = location.state as LocationState || null;
  const {transactionData} = useCompleteTransaction();


  const [activeComponent, setActiveComponent] = useState<'left' | 'right'>(
    state?.active === 'right' ? 'right' : 'left'
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
        money={transactionData.money}
        adress={transactionData.adress}
        paymentName={transactionData.paymentName}
        createdAt={transactionData.createdAt}
        isNew={transactionData.isNew}
      />
    }
    { activeComponent==='right' && 
      <SettleByCustomComponent 
        transactionId={transactionId} 
        totalMoney={transactionData.money}
        isNew={transactionData.isNew}
        adress={transactionData.adress}
        paymentName={transactionData.paymentName}
        createdAt={transactionData.createdAt}
      />
    }
  </div>
  </>
  )
}