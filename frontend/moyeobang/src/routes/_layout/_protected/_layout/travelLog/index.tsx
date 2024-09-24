import React, {HtmlHTMLAttributes, useState} from 'react';
import {createFileRoute} from '@tanstack/react-router';
import {css} from '@emotion/react';
import {TravelLogProvider} from '@/contexts/TravelLog';
import TravelLogList from '@/components/travelLog/travelLogList/TravelLogList';
import Navbar from '@/components/common/navBar/Navbar';
import PlusBtn from '@/components/common/btn/PlustBtn';
import PlusSelf from '@/components/travelLog/PlusSelf/PlusSelf';
import ScheduleMapSearch from '@/components/travelLog/PlusSelf/Map/ScheduleMapSearch';

const travelLogMainLayout = css`
  background-color: aquamarine;
  height: 100vh;
  position: relative;
`;
const plusStyle = css`
  position: absolute;
  bottom: 90px;
  right: 25px;
  width: 48px;
  height: 48px;
  z-index: 10; /* 다른 요소 위에 위치하도록 설정 */
`;

const travelLogMain = () => {
  const [showPlusSelf, setShowPlusSelf] = useState<boolean>(false);
  const [showMapSearch, setShowMapSearch] = useState<boolean>(false);
  const handleShowPlusSelf = () => {
    setShowPlusSelf(!showPlusSelf);
  };

  // 지도 검색 모달
  const [searchLocation, setSearchLocation] = useState<string | undefined>();
  const handleShowMapSearch = () => {
    setShowMapSearch(!showMapSearch);
  };
  const handleSearchLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLocation(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <TravelLogProvider>
        <div css={travelLogMainLayout}>
          <TravelLogList />
          <div css={plusStyle}>
            <PlusBtn onClick={handleShowPlusSelf} />
          </div>
          <Navbar />
        </div>
        {showPlusSelf && (
          <PlusSelf
            handleShowPlusSelf={handleShowPlusSelf}
            handleShowMapSearch={handleShowMapSearch}
            searchLocation={searchLocation}
            setSearchLocation={setSearchLocation}
            handleSearchLocation={handleSearchLocation}
          ></PlusSelf>
        )}
        {showMapSearch && (
          <ScheduleMapSearch
            handleShowMapSearch={handleShowMapSearch}
            searchLocation={searchLocation}
            handleSearchLocation={handleSearchLocation}
            setSearchLocation={setSearchLocation}
          ></ScheduleMapSearch>
        )}
      </TravelLogProvider>
    </>
  );
};

export const Route = createFileRoute('/_layout/_protected/_layout/travelLog/')({
  component: travelLogMain,
});
