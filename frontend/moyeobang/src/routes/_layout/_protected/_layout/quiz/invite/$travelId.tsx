import {createFileRoute, useRouter, useLocation} from '@tanstack/react-router';
import {useEffect} from 'react';

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

// import {createFileRoute, useMatch, useRouter} from '@tanstack/react-router';
// import {useEffect} from 'react';

// // 초대 링크 라우트 생성
// export const Route = createFileRoute(
//   '/_layout/_protected/_layout/quiz/invite/$travelId'
// )({
//   component: InviteQuizPage,
// });

// // 초대 링크 처리 컴포넌트
// function InviteQuizPage() {
//   // useMatch로 매치된 경로에서 params 가져오기 (타입 명시)
//   // useMatch로 매치된 경로에서 params 가져오기 (객체로 from 지정)
//   const match = useMatch({
//     from: '/_layout/_protected/_layout/quiz/invite/$travelId', // 경로를 from 객체로 전달
//     strict: true, // 경로 매칭을 엄격하게 적용
//   });
//   const travelId = match?.params?.travelId;

//   // useRouter를 통해 navigate 호출
//   const router = useRouter();

//   // 리다이렉트 처리
//   useEffect(() => {
//     if (travelId) {
//       router.navigate({to: `/quiz/${travelId}`});
//     }
//   }, [travelId, router]);

//   return <div>초대 링크를 처리 중입니다...</div>; // 로딩 중 메시지 (선택 사항)
// }
