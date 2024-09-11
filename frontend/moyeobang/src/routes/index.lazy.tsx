import React from 'react';

import {createLazyFileRoute} from '@tanstack/react-router';
import PlusBtn from '@/components/common/btn/PlustBtn';
import CalculatePopup from '@/components/common/calculate/CalculatePopup';

export const Route = createLazyFileRoute('/')({
  component: Index,
});
function Index() {
  return (
    <>
      <PlusBtn></PlusBtn>
      <CalculatePopup></CalculatePopup>
    </>
  );
  // return <App />;
}
