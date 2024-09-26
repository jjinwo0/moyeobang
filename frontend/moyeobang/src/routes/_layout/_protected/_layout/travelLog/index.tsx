import React, {useState} from 'react';
import {createFileRoute} from '@tanstack/react-router';
import {css} from '@emotion/react';
import {TravelLogProvider} from '@/contexts/TravelLog';
import TravelLogMain from '@/components/travelLog/TravelLogMain';

const travelLogMain = () => {
  return (
    <>
      <TravelLogProvider>
        <TravelLogMain />
      </TravelLogProvider>
    </>
  );
};

export const Route = createFileRoute('/_layout/_protected/_layout/travelLog/')({
  component: travelLogMain,
});
