import {createFileRoute, useLocation} from '@tanstack/react-router';
import {useEffect, useState} from 'react';
import QuizComponent from '@/components/quiz/QuizComponent';

export const Route = createFileRoute(
  '/_layout/_protected/_layout/quiz/$travelId'
)({
  component: QuizPage,
});

interface Quiz {
  id: number;
  question: string;
  answer: string;
}

// 더미 데이터
const data: Quiz = {
  id: 1,
  question: '문제요',
  answer: '답이어라',
};

function QuizPage() {
  const location = useLocation(); // 현재 location 정보를 가져옴
  const [travelId, setTravelId] = useState<string | null>(null);

  useEffect(() => {
    const pathSegments = location.pathname.split('/'); // URL 경로를 '/'로 분리
    const extractedTravelId = pathSegments[pathSegments.length - 1]; // 마지막 segment가 travelId
    setTravelId(extractedTravelId); // travelId를 상태로 저장
  }, [location.pathname]);

  if (!travelId) {
    return <p>올바르지 않은 접근입니다.</p>;
  }

  return (
    <>
      {data ? (
        <QuizComponent question={data.question} travelId={travelId} />
      ) : (
        <p>퀴즈 데이터를 찾을 수 없습니다.</p>
      )}
    </>
  );
}
