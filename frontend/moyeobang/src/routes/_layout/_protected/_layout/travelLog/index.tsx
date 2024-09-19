import React from 'react';
import {createFileRoute} from '@tanstack/react-router';
import {css} from '@emotion/react';
import {TravelLogProvider} from '@/contexts/TravelLog';
import TravelLogList from '@/components/travelLog/TravelLogList';
import Navbar from '@/components/common/navBar/Navbar';

const travelLogMainLayout = css`
  background-color: aquamarine;
  height: 100vh;
`;

const travelLogMain = () => {
  return (
    <div css={travelLogMainLayout}>
      <TravelLogProvider>
        <TravelLogList />
      </TravelLogProvider>
      <Navbar />
    </div>
  );
};

export const Route = createFileRoute('/_layout/_protected/_layout/travelLog/')({
  component: travelLogMain,
});
