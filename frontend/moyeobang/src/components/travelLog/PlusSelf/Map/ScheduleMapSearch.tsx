import React, {useRef, useEffect, useState} from 'react';
import * as ScheduleMapSearchStyle from '@/components/travelLog/PlusSelf/Map/ScheduleMapSearchStyle';
import PlusSelfGoogleMap from '@/components/travelLog/PlusSelf/Map/PlusSelfGoolgeMap';
import SearchImg from '@/assets/icons/Search.png';
import {Status, Wrapper} from '@googlemaps/react-wrapper';

// 구글 맵 API
const mapAPI = import.meta.env.VITE_GOOGLE_API_KEY;

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <>로딩중...</>;
    case Status.FAILURE:
      return <>에러 발생</>;
    case Status.SUCCESS:
      return <></>;
  }
};

interface ScheduleMapSearchProps {
  handleShowMapSearch: () => void;
  handleSearchLocation: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchLocation: string | undefined;
  setSearchLocation: (location: string | undefined) => void;
}
export default function ScheduleMapSearch({
  handleShowMapSearch,
  handleSearchLocation,
  searchLocation,
  setSearchLocation,
}: ScheduleMapSearchProps) {
  const [searchMap, setSearchMap] = useState(searchLocation);
  // useEffect(() => {
  //   // searchLocation 변경될 때마다 업데이트
  // }, [searchLocation]);
  const googleMapRef = useRef<any>(null);

  // const searchLocationHandler = () => {
  //   if (!searchMap) {
  //     alert('장소를 입력해주세요.');
  //     return;
  //   }
  //   if (searchLocation && googleMapRef.current) {
  //     const geocoder = new window.google.maps.Geocoder();
  //     geocoder.geocode({address: searchLocation}, (results, status) => {
  //       if (status === 'OK' && results && results[0]) {
  //         const location = results[0].geometry.location;
  //         googleMapRef.current.setCenter(location.lat(), location.lng());
  //         setSearchLocation(searchMap);
  //       } else {
  //         alert('장소를 찾을 수 없습니다.');
  //       }
  //     });
  //   }
  // };

  // 검색어를 입력할 때 searchMap 상태를 업데이트하고, 검색 버튼을 누르면 searchLocation 상태를 업데이트
  const searchLocationHandler = () => {
    if (!searchMap) {
      alert('장소를 입력해주세요.');
      return;
    }
    // 검색어를 상태에 반영하여 PlusSelfGoogleMap에 전달
    setSearchLocation(searchMap);
  };
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
            value={searchMap}
            placeholder="여행 장소 검색"
            onChange={e => {
              setSearchMap(e.target.value);
            }}
            css={ScheduleMapSearchStyle.LocationInputStyle}
          />
          <img
            src={SearchImg}
            alt="장소 검색"
            css={ScheduleMapSearchStyle.searchImgStyle}
            onClick={searchLocationHandler}
          />
        </div>
        {/* 지도 보여주기 */}
        <div css={ScheduleMapSearchStyle.MapLayout}>
          <Wrapper apiKey={mapAPI} render={render} libraries={['places']}>
            <PlusSelfGoogleMap
              ref={googleMapRef}
              initialLocation={searchLocation}
            />
          </Wrapper>
        </div>
      </div>
    </>
  );
}
