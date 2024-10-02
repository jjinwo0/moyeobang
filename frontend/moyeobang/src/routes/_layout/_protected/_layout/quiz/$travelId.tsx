import {createFileRoute, useLocation} from '@tanstack/react-router';
import React, {useEffect, useState} from 'react';
import QuizComponent from '@/components/quiz/QuizComponent';
import {useQuery} from '@tanstack/react-query';
import moyeobang from '@/services/moyeobang';

export const Route = createFileRoute(
  '/_layout/_protected/_layout/quiz/$travelId'
)({
  component: QuizPage,
});

interface Quiz {
  question: string;
  travelName: string;
}

// 더미 데이터
const data: Quiz = {
  question: '문제요',
  travelName: '아기돼지 오형제',
};

function QuizPage() {
  const location = useLocation(); // 현재 location 정보를 가져옴
  const [travelId, setTravelId] = useState<number | null>(null);

  // //[todo] get으로 초대퀴즈 조회하기
  // const {data: quizData} = useQuery({
  //   queryKey: ['quiz'],
  //   queryFn: () => moyeobang.getTravelQuiz(travelId!),
  //   enabled: travelId !== null
  // });

  // const data = quizData?.data.data;

  useEffect(() => {
    const pathSegments = location.pathname.split('/'); // URL 경로를 '/'로 분리
    const extractedTravelId = pathSegments[pathSegments.length - 1]; // 마지막 segment가 travelId
    setTravelId(Number(extractedTravelId)); // travelId를 상태로 저장
  }, [location.pathname]);

  if (!travelId) {
    return <p>올바르지 않은 접근입니다.</p>;
  }

  return (
    <>
      {data ? (
        <QuizComponent
          question={data.question}
          travelId={travelId}
          travelName={data.travelName}
        />
      ) : (
        <p>퀴즈 데이터를 찾을 수 없습니다.</p>
      )}
    </>
  );
}
