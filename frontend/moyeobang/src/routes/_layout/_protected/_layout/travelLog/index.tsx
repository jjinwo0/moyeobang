import React from 'react';
import {createFileRoute} from '@tanstack/react-router';
import {css} from '@emotion/react';
import TravelLogList from '@/components/travelLog/TravelLogList';
import Navbar from '@/components/common/navBar/Navbar';

const travelLogMainLayout = css`
  background-color: aquamarine;
  height: 100vh;
`;

const travelLogMain = () => {
  return (
    <div css={travelLogMainLayout}>
      <TravelLogList />
      <Navbar />
    </div>
  );
};

export const Route = createFileRoute('/_layout/_protected/_layout/travelLog/')({
  component: travelLogMain,
});
