import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/_protected/_layout/quiz/')({
  component: () => <div>퀴즈</div>,
});
