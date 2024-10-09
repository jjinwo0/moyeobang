import {createFileRoute} from '@tanstack/react-router';
import AllowNotification from '@/components/notification/AllowNotification';
import React, {useEffect} from 'react';
import useFcmStore from '@/store/useFcmStore';
import useMyInfo from '@/store/useMyInfoStore';
import {useNavigate} from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/entrance/success/allowNoti/')({
  component: AllowNoti,
});

function AllowNoti() {
  const {isfcmToken} = useFcmStore();
  const {accountId} = useMyInfo();
  const navigate = useNavigate();

  useEffect(() => {
    // isfcmToken이 true이고 accountId가 존재할 경우 홈으로 이동
    if (isfcmToken && accountId) {
      navigate({
        to: '/',
        replace: true, // 현재 페이지를 대체하여 히스토리에 남지 않음
      });
    }
  }, [isfcmToken, accountId, navigate]);

  // // isfcmToken이 false일 경우 AllowNotification 컴포넌트 렌더링
  // if (!isfcmToken) {
  //   return <AllowNotification onClose={}/>;
  // }

  // // isfcmToken이 true지만 accountId가 없을 경우 다른 로직을 추가할 수 있음
  // return <AllowNotification />;
}
