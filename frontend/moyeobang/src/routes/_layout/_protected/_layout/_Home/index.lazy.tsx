import React from 'react';
import {createLazyFileRoute} from '@tanstack/react-router';
import CalculatePopup from '@/components/common/calculate/CalculatePopup';

export const Route = createLazyFileRoute('/_layout/_protected/_layout/_Home/')({
  component: Index,
});
function Index() {
  return (
    <>
      <CalculatePopup></CalculatePopup>
    </>
  );
}
