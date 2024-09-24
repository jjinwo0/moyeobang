import {createFileRoute, useRouter, useLocation} from '@tanstack/react-router';
import React, {useEffect} from 'react';

// 초대 링크 라우트 생성
export const Route = createFileRoute(
  '/_layout/_protected/_layout/quiz/invite/$travelId'
)({
  component: InviteQuizPage,
});

// 초대 링크 처리 컴포넌트
function InviteQuizPage() {
  const router = useRouter();
  const location = useLocation(); // location 정보 가져오기

  // location.pathname을 통해 travelId 추출
  const pathSegments = location.pathname.split('/');
  const travelId = pathSegments[pathSegments.length - 1]; // 마지막 segment가 travelId

  // 리다이렉트 처리
  useEffect(() => {
    if (travelId) {
      router.navigate({to: `/quiz/${travelId}`});
    }
  }, [travelId, router]);

  return <div>초대 링크를 처리 중입니다...</div>; // 로딩 중 메시지 (선택 사항)
}
