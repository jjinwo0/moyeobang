import React, {useState} from 'react';
import {css} from '@emotion/react';
import {useTravelLogContext} from '@/contexts/TravelLog';
import TravelLogList from '@/components/travelLog/travelLogList/TravelLogList';
import Navbar from '@/components/common/navBar/Navbar';
import PlusBtn from '@/components/common/btn/PlustBtn';
import PlusSelf from '@/components/travelLog/PlusSelf/PlusSelf';
import ScheduleMapSearch from '@/components/travelLog/PlusSelf/Map/ScheduleMapSearch';
import TravelMainMap from './travelLogList/TravelMainMap';

const travelLogMainLayout = css`
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

export default function TravelLogMain() {
  const [showPlusSelf, setShowPlusSelf] = useState<boolean>(false);
  const {handleShowMapSearch} = useTravelLogContext();
  const {showMapSearch} = useTravelLogContext();

  const handleShowPlusSelf = () => {
    setShowPlusSelf(!showPlusSelf);
  };

  // 지도 검색 모달
  const [searchLocation, setSearchLocation] = useState<string | undefined>();

  const handleSearchLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLocation(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <div css={travelLogMainLayout}>
        {/* 여행 일정 지도 */}
        <TravelMainMap />

        {/* Day별 여행 일정 리스트, 가로 스크롤 시 다음 Day 일정으로 넘어감 */}
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
          setSearchLocation={setSearchLocation}
        ></ScheduleMapSearch>
      )}
    </>
  );
}
