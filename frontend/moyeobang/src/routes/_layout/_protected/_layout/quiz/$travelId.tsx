import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_layout/_protected/_layout/quiz/$travelId'
)({
  component: QuizPage,
});

interface QuizPageProps {
  params: {
    travelId: string | number;
  };
}

const data: Quiz = {
  id: 1,
  question: '문제요',
  answer: '답이어라',
};

function QuizPage({params}: QuizPageProps) {
  const {travelId} = params; // URL에서 travelId 추출

  // const [quiz, setQuiz] = useState(null);

  return (
    <>
      {data ? (
        <QuizComponent question={data.question} travelId={travelId} />
      ) : (
        <p>퀴즈를 불러오는 중입니다...</p>
      )}
    </>
  );
}
