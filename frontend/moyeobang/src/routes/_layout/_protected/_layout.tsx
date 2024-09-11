import { createFileRoute, Outlet } from '@tanstack/react-router';
import HeaderWithAlarmAndQR from '@/components/common/Header/HeaderWithAlarmAndQR';
import React from 'react';
import { css } from '@emotion/react';
import { useState } from "react";
import PayModal from "@/components/groupAccount/PayModal/PayModal";


export const Route = createFileRoute('/_layout/_protected/_layout')({
  component: Header
})

const layoutStyle = css`
  display:flex;
  flex-direction:column;
`;

export default function Header() {
  const [ isQROpen, setIsQROpen ] = useState(false);
  const [ isAlarmOpen, setIsAlarmOpen ] = useState(false);


  function handleAlarmClick() {
    setIsAlarmOpen(true);
  
  }

  function handleQRClick() {
    setIsQROpen((prev) => !prev);
  }

  return (
    <div css={layoutStyle}>
      <HeaderWithAlarmAndQR onAlarmClick={handleAlarmClick} onQRClick={handleQRClick} />
      {isQROpen ? <PayModal
        onXClick={handleQRClick}/> : 
        <>
        <Outlet/>
        </>
        }
    </div>
  )
}