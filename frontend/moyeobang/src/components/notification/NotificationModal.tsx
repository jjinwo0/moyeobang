import React, {useState, useEffect} from 'react';
import PublicRequest from './PublicRequest'; // Import your existing component
import {css} from '@emotion/react';

interface PublicRequestData {
  title: string;
  message: string;
  requestId: string;
  amount: number;
  accountId: string;
  action: string; // action 필드 추가
}

const layoutStyle = css`
  margin-top: 50px;
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

  // 푸시 알림 처리
  useEffect(() => {
    const handlePushNotification = (event: MessageEvent) => {
      console.log('Notification received:', event.data);
      // 데이터 추출 및 상태 설정
      const {title, message, requestId, amount, accountId, action} =
        event.data.data;
      setPublicRequestData({
        title,
        message,
        requestId,
        amount,
        accountId,
        action,
      });
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
        action: 'deposit_request', // action 필드
      },
    };

    // const hurrydummyNotification = {
    //   data: {
    //     title: '긴급 알림',
    //     message: '긴급 알림 메시지',
    //     requestId: '긴급알림ID',
    //     amount: 0,
    //     accountId: '긴급알림계좌ID',
    //     action: '',
    //   },
    // };
    window.postMessage(dummyNotification, '*');

    return () => {
      window.removeEventListener(
        'message',
        handlePushNotification as EventListener
      );
    };
  }, []);

  // action에 따라 렌더링할 컴포넌트 결정
  const renderComponent = () => {
    if (!publicRequestData) return null; // 데이터가 없으면 아무 것도 렌더링하지 않음

    switch (publicRequestData.action) {
      case 'deposit_request':
        return (
          <PublicRequest
            message={publicRequestData.message}
            accountId={publicRequestData.accountId}
            amount={publicRequestData.amount}
          />
        );
      case 'another_action': // 다른 액션 처리
        // return <AnotherComponent message={publicRequestData.message} />;
        return <></>;
      default:
        return <div>알 수 없는 요청입니다.</div>; // 알 수 없는 액션에 대한 처리
    }
  };

  return <div css={layoutStyle}>{renderComponent()}</div>;
}
