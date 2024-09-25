import React, {useState, useEffect} from 'react';
import PublicRequest from './PublicRequest'; // Import your existing component
import {css} from '@emotion/react';

interface PublicRequestData {
  title: string;
  message: string;
  requestId: string;
  amount: number;
  accountId: string;
}

const layoutStyle = css`
  margin-top: 70px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
`;
export default function NotificationModal() {
  const [publicRequestData, setPublicRequestData] =
    useState<PublicRequestData | null>(null);

  // // 실제 푸시알림으로 진행할때는
  // useEffect(() => {
  //   const handlePushNotification = (event: MessageEvent) => {
  //     console.log('Notification received:', event.data);
  //     const {title, message, requestId, amount, accountId} = event.data;
  //     setPublicRequestData({title, message, requestId, amount, accountId});
  //   };

  //   navigator.serviceWorker.addEventListener('message', handlePushNotification);

  //   return () => {
  //     navigator.serviceWorker.removeEventListener('message', handlePushNotification);
  //   };
  // }, []);

  // 푸시 알림 처리
  useEffect(() => {
    const handlePushNotification = (event: MessageEvent) => {
      console.log('Notification received:', event.data);
      // 데이터 추출 및 상태 설정
      const {title, message, requestId, amount, accountId} = event.data.data;
      setPublicRequestData({title, message, requestId, amount, accountId});
    };

    window.addEventListener('message', handlePushNotification as EventListener);

    // 일단 더미데이터
    const dummyNotification = {
      data: {
        title: '입금 알림',
        message: '꿀꿀이들의 여행 모임 통장에 200000원을 입금하시겠습니까?',
        requestId: '789012', // 공금 입금 요청의 고유 ID
        amount: 200000,
        accountId: '123456',
        action: 'deposit_request',
      },
    };
    window.postMessage(dummyNotification, '*');

    return () => {
      window.removeEventListener(
        'message',
        handlePushNotification as EventListener
      );
    };
  }, []);

  return (
    <div css={layoutStyle}>
      {/* Only render the PublicRequest component when there's data */}
      {publicRequestData && (
        <PublicRequest message={publicRequestData.message} />
      )}
    </div>
  );
}
