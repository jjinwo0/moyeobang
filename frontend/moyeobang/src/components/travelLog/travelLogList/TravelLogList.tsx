/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import {css} from '@emotion/react';
import {colors} from '@/styles/colors';
import {useSwipeable} from 'react-swipeable';
import {useTravelLogContext} from '@/contexts/TravelLog';
import useTravelDetailStore from '@/store/useTravelDetailStore';
import PlusBtn from '@/components/common/btn/PlustBtn';
import DaySchedules from './DaySchedules';
import PlusSelf from '@/components/travelLog/PlusSelf/PlusSelf';
import ScheduleMapSearch from '@/components/travelLog/PlusSelf/Map/ScheduleMapSearch';

// travelLogListLayout을 390px 너비로 가로 스크롤 없이 설정
const travelLogListLayout = css`
  height: 473px;
  width: 390px; /* 390px로 고정 */
  position: fixed;
  bottom: 0px;
  border-top-right-radius: 45px;
  border-top-left-radius: 45px;
  background-color: ${colors.white};
  display: flex;
  flex-direction: row;
  overflow-x: hidden; /* 가로 스크롤 없앰 */
  overflow-y: auto; /* 세로 스크롤 허용 */

  /* 세로 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨김 */
  -ms-overflow-style: none; /* Internet Explorer에서 스크롤바 숨김 */

  /* Chrome, Safari, Edge에서 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
`;


const dayScheduleStyle = css`
  min-width: 390px; /* DaySchedule의 너비를 390px로 맞춤 */
  flex-shrink: 0;
  transition: transform 0.3s ease-out;
`;

export default function TravelLogList() {
  const {
    scheduleDayNum,
    setScheduleDayNum,
    currentIndex,
    setCurrentIndex,
    showPlusSelf,
    handleShowPlusSelf,
    showMapSearch,
    handleShowMapSearch,
    searchLocation,
    setSearchLocation,
    handleSearchLocation,
  } = useTravelLogContext();

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentIndex((prevIndex: number) => {
        const newIndex = Math.min(prevIndex + 1, travelDays); // travelSchedules.length -> travelDays
        setScheduleDayNum(newIndex + 1); // 새로운 스케줄 번호 설정 (1부터 시작)
        console.log('[*] 오른쪽', newIndex + 1);

        return newIndex;
      });
    },
    onSwipedRight: () => {
      setCurrentIndex((prevIndex: number) => {
        const newIndex = Math.max(prevIndex - 1, 0);
        setScheduleDayNum(newIndex + 1); // 새로운 스케줄 번호 설정 (1부터 시작)
        console.log('[*] 왼쪽', newIndex + 1);

        return newIndex;
      });
    },
  });

  const {travelName, startDate, endDate, travelPlaceList} =
    useTravelDetailStore();
  console.log('[*] 여행 시작일, 끝일', startDate, endDate);

  // 여행 일수 계산
  const travelDates = [];
  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][
      currentDate.getDay()
    ];
    travelDates.push(
      `${currentDate.toISOString().split('T')[0]} (${dayOfWeek})`
    ); // YYYY-MM-DD (요일) 형식으로 추가
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const travelDays = travelDates.length;
  console.log('[*] 여행 일수', travelDays, travelDates);

  return (
    <div {...handlers} css={travelLogListLayout}>
      <div
        css={{
          display: 'flex',
          width: `${(travelDays + 1) * 390}px`,
          transform: `translateX(-${currentIndex * 390}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        {travelDates.map((date, index) => {
          return (
            <>
              <DaySchedules date={date} dayNum={index + 1} />
            </>
          );
        })}

        <div css={dayScheduleStyle}>총 예산</div>
      </div>

     
    </div>
  );
}
