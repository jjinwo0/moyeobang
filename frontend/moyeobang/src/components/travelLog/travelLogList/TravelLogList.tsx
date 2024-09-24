/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import {css} from '@emotion/react';
import {colors} from '@/styles/colors';
import {useSwipeable} from 'react-swipeable';
import {useTravelLogContext} from '@/contexts/TravelLog';
import DaySchedules from './DaySchedules';

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
  const {travelSchedules, currentIndex, setCurrentIndex} =
    useTravelLogContext();

  // const handlers = useSwipeable({
  //   onSwipedLeft: () =>
  //     setCurrentIndex((prevIndex: number) =>
  //       Math.min(prevIndex + 1, travelSchedules.length - 1)
  //     ), // 왼쪽 스와이프하면 다음 페이지로 이동
  //   onSwipedRight: () =>
  //     setCurrentIndex((prevIndex: number) => Math.max(prevIndex - 1, 0)), // 오른쪽 스와이프하면 이전 페이지로 이동
  // });

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentIndex((prevIndex: number) => {
        const newIndex = Math.min(prevIndex + 1, travelSchedules.length - 1);
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
  const {scheduleDayNum, setScheduleDayNum} = useTravelLogContext();

  return (
    <div {...handlers} css={travelLogListLayout}>
      {travelSchedules.map(
        (
          scheduleGroup: (PlusSelfSchedule | PaidAutoSchedule)[],
          index: number
        ) => {
          return (
            <div
              css={[
                dayScheduleStyle,
                {transform: `translateX(-${currentIndex * 390}px)`},
              ]} // 390px 단위로 스와이프
              key={index}
            >
              <DaySchedules daySchedules={scheduleGroup} dayNum={index + 1} />
            </div>
          );
        }
      )}
    </div>
  );
}
