import {createLazyFileRoute} from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/_protected/_layout/_Home/')({
  component: Index,
});
function Index() {
  return <div>하이하이</div>
}
