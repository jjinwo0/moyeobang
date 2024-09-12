import { createFileRoute,useRouter } from '@tanstack/react-router'
import HeaderWithXButton from '@/components/common/Header/HeaderWithXbutton'
import { css } from '@emotion/react'
import TwoBtn from '@/components/common/btn/TwoBtn';
import React from 'react';
import { useState } from 'react';
import SettleComponent from '@/components/Account/Settle/SettleComponent';

export const Route = createFileRoute('/_layout/_protected/_layout/account/settle/')({
  component: Settle
})  

const layoutStyle = css`
  margin-top:50px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  gap: 20px;
`;

// 정산페이지 (영수증인지 직접 입력인지)

export default function Settle() {

  // const navigate = useNavigate();
  const {history} = useRouter()

  const [activeComponent, setActiveComponent] = useState<string>('left')

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
    />
    { activeComponent==='left' && 
    <div>left</div>
    }
    { activeComponent==='right' && 
    <SettleComponent />
    }
  </div>
  </>
  )
}