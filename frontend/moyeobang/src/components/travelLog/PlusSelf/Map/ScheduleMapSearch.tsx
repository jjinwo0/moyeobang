import React, {useState, useRef} from 'react';
import * as ScheduleMapSearchStyle from '@/components/travelLog/PlusSelf/Map/ScheduleMapSearchStyle';
import PlusSelfGoogleMap from '@/components/travelLog/PlusSelf/Map/PlusSelfGoolgeMap'; // PlusSelfGoogleMap 사용
import SearchImg from '@/assets/icons/Search.png';

interface ScheduleMapSearchProps {
  handleShowMapSearch: () => void; // 필요시 검색 창 닫기 핸들러
  searchLocation: string | undefined; // 검색어 상태
  setSearchLocation: (location: string | undefined) => void; // 검색어 업데이트
}

export default function ScheduleMapSearch({
  handleShowMapSearch,
  searchLocation,
  setSearchLocation,
}: ScheduleMapSearchProps) {
  const [searchMap, setSearchMap] = useState(searchLocation); // 입력한 검색어를 관리하는 로컬 상태
  const googleMapRef = useRef<any>(null); // `PlusSelfGoogleMap`의 ref

  // 검색 버튼 클릭 시 실행되는 함수
  const searchLocationHandler = () => {
    if (!searchMap) {
      alert('장소를 입력해주세요.');
      return;
    }
    // 검색어를 상태에 반영하여 `PlusSelfGoogleMap`으로 전달
    setSearchLocation(searchMap);
  };

  return (
    <>
      <div css={ScheduleMapSearchStyle.ScheduleMapSearchLayout}>
        {/* 1. 장소 검색 인풋 */}
        <div css={ScheduleMapSearchStyle.LocationInputLayout}>
          <input
            type="text"
            value={searchMap || ''} // 검색어 상태를 사용
            placeholder="여행 장소 검색"
            onChange={e => setSearchMap(e.target.value)} // 입력된 검색어를 업데이트
            css={ScheduleMapSearchStyle.LocationInputStyle}
          />
          <img
            src={SearchImg}
            alt="장소 검색"
            css={ScheduleMapSearchStyle.searchImgStyle}
            onClick={searchLocationHandler} // 검색 버튼 클릭 시 호출
          />
        </div>

        {/* 2. 지도 보여주기: PlusSelfGoogleMap 컴포넌트 사용 */}
        <div css={ScheduleMapSearchStyle.MapLayout}>
          <PlusSelfGoogleMap
            ref={googleMapRef} // 부모에서 ref로 넘길 수 있음 (필요시)
            searchLocation={searchLocation} // 검색된 위치를 지도 컴포넌트로 전달
          />
        </div>
      </div>
    </>
  );
}
