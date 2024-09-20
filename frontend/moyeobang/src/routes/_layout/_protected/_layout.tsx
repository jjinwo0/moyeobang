import {createFileRoute, Outlet, useLocation} from '@tanstack/react-router';
import HeaderWithAlarmAndQR from '@/components/common/Header/HeaderWithAlarmAndQR';
import React from 'react';
import {css} from '@emotion/react';
import {useState} from 'react';
import PayModal from '@/components/Account/PayModal/PayModal';
import NotificationModal from '@/components/notification/NotificationModal';
import  CompleteTransactionContextProvider  from '@/context/TransactionContext';
import ReceiptContextProvider from '@/context/ReceiptContext'


export const Route = createFileRoute('/_layout/_protected/_layout')({
  component: Header,
});

const layoutStyle = css`
  display: flex;
  flex-direction: column;
`;

export default function Header() {
  const [isQROpen, setIsQROpen] = useState(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);

  const {pathname} = useLocation();

  const hideHeader =
    pathname.includes('/detail') ||
    pathname === '/profile' ||
    pathname.includes('resultByReceipt');
  function handleAlarmClick() {
    setIsAlarmOpen(prev => !prev);
  }

  function handleQRClick() {
    setIsQROpen(prev => !prev);
  }

  return (
    <>
    <CompleteTransactionContextProvider>
      <ReceiptContextProvider>
        {!hideHeader && (
          <HeaderWithAlarmAndQR
            onAlarmClick={handleAlarmClick}
            onQRClick={handleQRClick}
          />
        )}
        <div css={layoutStyle}>
          {/* QR 모달이 열리면 PayModal만 렌더링하고 Outlet은 렌더링하지 않음 */}
          {isQROpen && <PayModal onXClick={handleQRClick} />}

          {/* Alarm 모달이 열리면 NotificationModal만 렌더링하고 Outlet은 렌더링하지 않음 */}
          {isAlarmOpen && <NotificationModal onXClick={handleAlarmClick} />}

          {/* QR 또는 Alarm 모달이 열리지 않았을 때만 Outlet 렌더링 */}
          {!isQROpen && !isAlarmOpen && <Outlet />}
        </div>
       </ReceiptContextProvider>
      </CompleteTransactionContextProvider>
    </>
  );
}
