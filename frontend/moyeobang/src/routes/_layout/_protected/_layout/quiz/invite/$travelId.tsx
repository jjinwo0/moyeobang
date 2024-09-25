import {createFileRoute, useRouter, useLocation} from '@tanstack/react-router';
import {useSuspenseQuery} from '@tanstack/react-query';
import React, {useEffect} from 'react';

// 초대 링크 라우트 생성
export const Route = createFileRoute(
  '/_layout/_protected/_layout/quiz/invite/$travelId'
)({
  component: InviteQuizPage,
});

// // 초대 링크 처리 컴포넌트
// function InviteQuizPage() {
//   const router = useRouter();
//   const location = useLocation(); // location 정보 가져오기

//   // location.pathname을 통해 travelId 추출
//   const pathSegments = location.pathname.split('/');
//   const travelId = pathSegments[pathSegments.length - 1]; // 마지막 segment가 travelId

//   // 리다이렉트 처리
//   useEffect(() => {
//     if (travelId) {
//       router.navigate({to: `/quiz/${travelId}`});
//     }
//   }, [travelId, router]);

//   return <div>초대 링크를 처리 중입니다...</div>; // 로딩 중 메시지 (선택 사항)
// }

const fetchTokenValidation = async (travelId: number, token: string | null) => {
  if (!token) {
    throw new Error('Invalid token');
  }
  return {isValid: true}; // 토큰이 유효하다고 가정
};

function InviteQuizPage({travelId}: {travelId: number}) {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('token');

  const {data, isError} = useSuspenseQuery({
    queryKey: ['validateToken', travelId, token],
    queryFn: () => fetchTokenValidation(travelId, token),
  });

  useEffect(() => {
    if (data?.isValid) {
      // token이 유효하면 quiz 페이지로 리다이렉트
      window.location.replace(`/quiz/${travelId}`);
    }
  }, [data, travelId]);

  if (isError) {
    alert('잘못된 초대 링크입니다.');
    return <div>초대 링크가 잘못되었습니다.</div>;
  }

  return <div>초대 링크 처리 중...</div>;
}
