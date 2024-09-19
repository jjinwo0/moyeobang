import {createFileRoute} from '@tanstack/react-router';
import QuizComponent from '@/components/quiz/QuizComponent';
export const Route = createFileRoute('/_layout/_protected/_layout/quiz/')({
  component: quiz,
});

export default function quiz() {
  return (
    <>
      <QuizComponent />
    </>
  );
}
