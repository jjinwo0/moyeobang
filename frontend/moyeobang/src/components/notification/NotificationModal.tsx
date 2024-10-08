// import React, {useState, useEffect} from 'react';
// import PublicRequest from './PublicRequest'; // 기존 컴포넌트
// import HurryNotification from './HurryNotification'; // 새로운 알림 컴포넌트
// import TimeNotification from './TimeNotification'; // 새로운 알림 컴포넌트
// import {css} from '@emotion/react';
// import HeaderWithXButton from '../common/Header/HeaderWithXbutton';

// interface NotificationData {
//   title: string;
//   content: string;
//   action?: string; // 알림의 유형을 구분할 필드
// }

// const layoutStyle = css`
//   margin-top: 50px;
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   z-index: 100;
// `;

// export default function NotificationModal({onClose}: {onClose: () => void}) {
//   const [notificationData, setNotificationData] =
//     useState<NotificationData | null>(null);

//   // 푸시 알림 처리
//   useEffect(() => {
//     const handlePushNotification = (event: MessageEvent) => {
//       console.log('Notification received:', event.data);
//       const {title, content, action} = event.data.data; // 푸시 알림 데이터 추출
//       setNotificationData({title, content, action});
//     };

//     window.addEventListener('message', handlePushNotification as EventListener);

//     return () => {
//       window.removeEventListener(
//         'message',
//         handlePushNotification as EventListener
//       );
//     };
//   }, []);

//   // 알림 유형에 따라 컴포넌트 렌더링
//   const renderNotificationComponent = () => {
//     if (!notificationData) return null;

//     // action 또는 title을 기반으로 알림 유형을 구분하여 렌더링
//     if (notificationData.action === 'deposit_request') {
//       return (
//         <PublicRequest
//           message={notificationData.content}
//           accountId={1234}
//           amount={200000}
//         />
//       );
//     } else if (notificationData.title.includes('여행 공금 입금 요청')) {
//       return <HurryNotification message={notificationData.content} />;
//     } else if (notificationData.title.includes('잔액 알림')) {
//       return <TimeNotification message={notificationData.content} />;
//     } else {
//       return <div>알 수 없는 알림입니다.</div>;
//     }
//   };

//   return (
//     <div css={layoutStyle}>
//       <HeaderWithXButton onXClick={onClose} />
//       {renderNotificationComponent()}
//     </div>
//   );
// }

import React, {useState, useEffect} from 'react';
import PublicRequest from './PublicRequest'; // 기존 컴포넌트
import HurryNotification from './HurryNotification'; // 새로운 알림 컴포넌트
import TimeNotification from './TimeNotification'; // 새로운 알림 컴포넌트
import {css} from '@emotion/react';
import HeaderWithXButton from '../common/Header/HeaderWithXbutton';
import sadBangbang from '@/assets/icons/sadBangbang.png';
import sky from '@/assets/images/skyBackground.jpg';

interface NotificationData {
  title: string;
  content: string;
  action?: string; // 알림의 유형을 구분할 필드
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

const emptyMessageStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;
  font-family: 'semibold';
  font-size: 24px;
  // color: gray;
  margin-top: 210px;

  img {
    width: 200px;
  }
`;

export default function NotificationModal({onClose}: {onClose: () => void}) {
  const [notifications, setNotifications] = useState<NotificationData[]>([]); // 알림 저장 상태

  // 로컬 스토리지에서 알림을 불러오는 함수
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications)); // 로컬 스토리지에서 알림을 불러옴
    }
  }, []);

  // // 더미 알림 생성 함수
  // useEffect(() => {
  //   const dummyNotifications = [
  //     {
  //       title: '공금 입금 요청',
  //       content: '공금 50000원을 입금 요청했습니다.',
  //       action: 'deposit_request',
  //     },
  //     {
  //       title: '여행 공금 입금 요청',
  //       content: '공금 50000원을 입금 요청했습니다.',
  //       action: 'hurry_notification',
  //     },
  //     {
  //       title: '잔액 알림',
  //       content: '잔액이 200000원 남았습니다.',
  //       action: 'balance_check',
  //     },
  //   ];

  //   // 일정 시간마다 더미 알림 추가
  //   const intervalId = setInterval(() => {
  //     const randomNotification =
  //       dummyNotifications[
  //         Math.floor(Math.random() * dummyNotifications.length)
  //       ];

  //     setNotifications(prevNotifications => {
  //       const updatedNotifications = [...prevNotifications, randomNotification];
  //       localStorage.setItem(
  //         'notifications',
  //         JSON.stringify(updatedNotifications)
  //       ); // 로컬 스토리지에 저장
  //       return updatedNotifications;
  //     });
  //   }, 3000); // 3초마다 알림 추가

  //   // cleanup
  //   return () => clearInterval(intervalId);
  // }, []);

  // 알림 유형에 따라 컴포넌트 렌더링
  const renderNotificationComponent = (
    notification: NotificationData,
    index: number
  ) => {
    // action 또는 title을 기반으로 알림 유형을 구분하여 렌더링
    if (notification.action === 'deposit_request') {
      return (
        <PublicRequest
          key={index}
          message={notification.content}
          accountId={1234}
          amount={200000}
        />
      );
    } else if (notification.title.includes('여행 공금 입금 요청')) {
      return <HurryNotification key={index} message={notification.content} />;
    } else if (notification.title.includes('잔액 알림')) {
      return <TimeNotification key={index} message={notification.content} />;
    } else {
      return <div key={index}>알 수 없는 알림입니다.</div>;
    }
  };

  return (
    <div css={layoutStyle}>
      <HeaderWithXButton onXClick={onClose} />
      {notifications.length > 0 ? (
        notifications.map((notification, index) =>
          renderNotificationComponent(notification, index)
        )
      ) : (
        <div css={emptyMessageStyle}>
          <img src={sadBangbang} />
          <p>아직 알림이 없습니다</p>
        </div>
      )}
    </div>
  );
}
