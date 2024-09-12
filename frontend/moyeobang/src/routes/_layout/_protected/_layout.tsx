import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import HeaderWithAlarmAndQR from '@/components/common/Header/HeaderWithAlarmAndQR';
import React from 'react';
import { css } from '@emotion/react';
import { useState } from "react";
import PayModal from "@/components/Account/PayModal/PayModal";


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

  const {pathname} = useLocation();

  const hideHeader = pathname === '/account/receipt' || pathname === '/account/calculate' || pathname.startsWith('/account/detail/');
  function handleAlarmClick() {
    setIsAlarmOpen(true);
  
  }

  function handleQRClick() {
    setIsQROpen((prev) => !prev);
  }

  return (
     <>
        { !hideHeader &&  <HeaderWithAlarmAndQR onAlarmClick={handleAlarmClick} onQRClick={handleQRClick} />}
        <div css={layoutStyle}>
        {isQROpen ? <PayModal
          onXClick={handleQRClick}/> : 
          <>
          <Outlet/>
          </>
          }
          </div>
      </>
  )
}