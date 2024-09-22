import React from 'react';
import * as ScheduleMapSearchStyle from '@/components/travelLog/PlusSelf/Map/ScheduleMapSearchStyle';
import HeaderWithXButton from '@/components/common/Header/HeaderWithXbutton';
import SearchImg from '@/assets/icons/Search.png';

// 구글 맵 API
const mapAPI = import.meta.env.VITE_GOOGLE_API_KEY;

interface ScheduleMapSearchProps {
  handleShowMapSearch: () => void;
  handleSearchLocation: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchLocation: string | undefined;
}
export default function ScheduleMapSearch({
  handleShowMapSearch,
  handleSearchLocation,
  searchLocation,
}: ScheduleMapSearchProps) {
  return (
    <>
      {/* <div style={{zIndex: '40'}}>
        <HeaderWithXButton onXClick={handleShowMapSearch} />
      </div> */}
      <div css={ScheduleMapSearchStyle.ScheduleMapSearchLayout}>
        {/* 1. 장소 검색 인풋 */}
        <div css={ScheduleMapSearchStyle.LocationInputLayout}>
          <input
            type="text"
            value={searchLocation}
            placeholder="여행 장소 검색"
            onChange={e => {
              handleSearchLocation(e);
            }}
            css={ScheduleMapSearchStyle.LocationInputStyle}
          />
          <img
            src={SearchImg}
            alt="장소 검색"
            css={ScheduleMapSearchStyle.searchImgStyle}
          />
        </div>
        {/* 지도 보여주기 */}
        <div css={ScheduleMapSearchStyle.MapLayout}>
          
        </div>
      </div>
    </>
  );
}
