import React, {useState} from 'react';
import {createFileRoute} from '@tanstack/react-router';
import {css} from '@emotion/react';
import {TravelLogProvider} from '@/contexts/TravelLog';
import TravelLogList from '@/components/travelLog/travelLogList/TravelLogList';
import Navbar from '@/components/common/navBar/Navbar';
import PlusBtn from '@/components/common/btn/PlustBtn';
import PlusSelf from '@/components/travelLog/PlusSelf';

const travelLogMainLayout = css`
  background-color: aquamarine;
  height: 100vh;
`;
const plusStyle = css`
  position: fixed;
  bottom: 90px;
  right: 25px;
  width: 48px;
  height: 48px;
  z-index: 10; /* 다른 요소 위에 위치하도록 설정 */
`;

const travelLogMain = () => {
  const [showPlusSelf, setShowPlusSelf] = useState<boolean>(false);
  const handlePlusSelf = () => {
    setShowPlusSelf(!showPlusSelf);
  };
  return (
    <>
      <div css={travelLogMainLayout}>
        <TravelLogProvider>
          <TravelLogList />
          <div css={plusStyle}>
            <PlusBtn onClick={handlePlusSelf} />
          </div>
        </TravelLogProvider>
        <Navbar />
      </div>
      {showPlusSelf && <PlusSelf handlePlusSelf={handlePlusSelf} ></PlusSelf>}
    </>
  );
};

export const Route = createFileRoute('/_layout/_protected/_layout/travelLog/')({
  component: travelLogMain,
});
