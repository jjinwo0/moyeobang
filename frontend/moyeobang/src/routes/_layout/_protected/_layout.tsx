import {createFileRoute, Outlet, useLocation} from '@tanstack/react-router';
import HeaderWithAlarmAndQR from '@/components/common/Header/HeaderWithAlarmAndQR';
import React from 'react';
import {css} from '@emotion/react';
import {useState} from 'react';
import PayModal from '@/components/Account/QR/PayModal';
import NotificationModal from '@/components/notification/NotificationModal';
import useCurrentTravelStore from '@/store/useCurrentTravelStore';
import NotTravelModal from '@/components/Account/QR/NotTravelModal';
import { useEffect } from 'react';
import moyeobang from '@/services/moyeobang';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';
import useMyInfo from '@/store/useMyInfoStore';
import { getCookie } from '@/util/cookie';

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
  const {accountId} = useCurrentTravelStore();

  const queryClient = useQueryClient();
  const {memberId} = useMyInfo();
  const token = getCookie('accessToken');

  const {pathname} = useLocation();


  // 여행 종료 후 환불 post API
  const {mutate: postRefund } = useMutation({
    mutationFn: ({accountId} : {accountId:AccountId}) => 
      moyeobang.postRefundAccount(accountId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['transactionList', accountId], // detail에 바로 업데이트
        refetchType: 'all',
      });
    },
  });

  // 여행 데이터 
  const {data: travelData} = useSuspenseQuery({
    queryKey: ['travelList', memberId],
    queryFn: () => {
      return moyeobang.getTravelList(memberId); 
    },
  });
  const travelList = travelData.data.data; // "endDate": "2023-09-05T12:34:56Z"

  // 날짜만 반환 함수
  const normalizeDate = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const hideHeader =
    pathname.includes('/detail') ||
    pathname.includes('/settle') ||
    pathname === '/profile' ||
    pathname.includes('resultByReceipt');
  function handleAlarmClick() {
    setIsAlarmOpen(prev => !prev);
  }

  function handleQRClick() {
    setIsQROpen(prev => !prev);
  }

 useEffect(()=>{

  if (!memberId || !accountId || !travelList) return;

  // 현재 시간
  const nowDate = new Date();

  travelList.map((travel) => {

    //  여행 끝 날짜
    const travelEndDate = normalizeDate(new Date(travel.endDate));

    // 일자 차이 계산 
    const dayDiff = (nowDate.getTime()-travelEndDate.getTime()) / (1000 * 60 * 60 * 24);

    // 이미 지난 여행이면
    if ( dayDiff>0 && dayDiff<=7) {
      postRefund({accountId})
    }
  })

  },[accountId, memberId,travelList,token])

  return (
    <>
      {!hideHeader && (
        <HeaderWithAlarmAndQR
          onAlarmClick={handleAlarmClick}
          onQRClick={handleQRClick}
          isBack={pathname === '/account' || pathname === '/travelLog'}
        />
      )}

      <div css={layoutStyle}>
        {/* QR 모달이 열리면 PayModal만 렌더링하고 Outlet은 렌더링하지 않음 */}
        <>
          {isQROpen ? (
            accountId === 0 ? (
              <NotTravelModal onClickOutside={handleQRClick} />
            ) : (
              <PayModal onXClick={handleQRClick} />
            )
          ) : undefined}
        </>

        {/* Alarm 모달이 열리면 NotificationModal만 렌더링하고 Outlet은 렌더링하지 않음 */}
        {isAlarmOpen && <NotificationModal onClose={handleAlarmClick} />}

        {/* QR 또는 Alarm 모달이 열리지 않았을 때만 Outlet 렌더링 */}
        {!isQROpen && !isAlarmOpen && <Outlet />}
      </div>
    </>
  );
}
