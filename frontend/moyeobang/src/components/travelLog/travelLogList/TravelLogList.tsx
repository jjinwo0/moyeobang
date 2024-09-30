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

const noTravelDateStyle = css`
  min-width: 390px; /* DaySchedule의 너비를 390px로 맞춤 */
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease-out;
  font-size: 24px;
  font-family: 'semibold';
  color: ${colors.lightBlack};

  #total-budget {
    font-family: 'semibold';
    color: ${colors.black};
    margin-top: 5px;
    padding: 13px;
    padding-left: 22px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  #no-travel-date {
    font-family: 'semibold';
    color: ${colors.lightBlack};
    margin-top: 5px;
    padding: 13px;
    padding-left: 22px;
  }
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
    travelDates,
  } = useTravelLogContext();

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentIndex((prevIndex: number) => {
        const newIndex = Math.min(prevIndex + 1, travelDays); // travelSchedules.length -> travelDays
        setScheduleDayNum(newIndex + 1); // 새로운 스케줄 번호 설정 (1부터 시작)
        console.log('[*] 오른쪽', newIndex);

        return newIndex;
      });
    },
    onSwipedRight: () => {
      setCurrentIndex((prevIndex: number) => {
        const newIndex = Math.max(prevIndex - 1, 0);
        setScheduleDayNum(newIndex + 1); // 새로운 스케줄 번호 설정 (1부터 시작)
        console.log('[*] 왼쪽', newIndex);

        return newIndex;
      });
    },
  });

  const travelDays = travelDates.length;

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

        {travelDays > 0 ? (
          <div css={noTravelDateStyle}>
            <div id="total-budget">
              <div style={{color: colors.fifth}}>
                {travelDates.length}일 전체 예산
              </div>
              <div>50000원</div>
            </div>
          </div>
        ) : (
          <div css={noTravelDateStyle}>
            <div id="no-travel-date">여행 기간이 설정되지 않았습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
}
