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
  // const travelSchedules = [
  //   [
  //     {
  //       scheduleId: 67890,
  //       scheduleTitle: '도쿄 타워 방문',
  //       scheduleLocation: '도쿄 타워',
  //       scheduleTime: '2024-10-01T10:00:00',
  //       predictedBudget: 50000,
  //       completion: 'completed',
  //       memo: '도쿄 타워가서 누구보다 신나게 놀아야지',
  //       matchedTransaction: {
  //         transactionId: 78901,
  //         amount: 50000,
  //         paymentTime: '2024-10-01T12:15:00',
  //         details: '도쿄 타워 입장료 결제',
  //       },
  //     },
  //     {
  //       transactionId: 78902,
  //       amount: 25000,
  //       paymentTime: '2024-10-01T16:00:00',
  //       details: '신주쿠 카페 결제',
  //     },
  //   ],
  //   [
  //     {
  //       scheduleId: 67891,
  //       scheduleTitle: '시부야 거리 탐방',
  //       scheduleLocation: '시부야',
  //       scheduleTime: '2024-10-01T13:00:00',
  //       predictedBudget: 30000,
  //       completion: 'pending',
  //       memo: '',
  //       matchedTransaction: null,
  //     },
  //   ],
  // ];

  // const [currentIndex, setCurrentIndex] = useState(0); // 현재 표시하는 DaySchedule의 인덱스
  const {travelSchedules, currentIndex, setCurrentIndex} =
    useTravelLogContext();

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentIndex((prevIndex: number) =>
        Math.min(prevIndex + 1, travelSchedules.length - 1)
      ), // 왼쪽 스와이프하면 다음 페이지로 이동
    onSwipedRight: () =>
      setCurrentIndex((prevIndex: number) => Math.max(prevIndex - 1, 0)), // 오른쪽 스와이프하면 이전 페이지로 이동
  });

  return (
    <div {...handlers} css={travelLogListLayout}>
      {travelSchedules.map(
        (
          scheduleGroup: (PlusSelfSchedule | PaidAutoSchedule)[],
          index: number
        ) => (
          <div
            css={[
              dayScheduleStyle,
              {transform: `translateX(-${currentIndex * 390}px)`},
            ]} // 390px 단위로 스와이프
            key={index}
          >
            <DaySchedules daySchedules={scheduleGroup} dayNum={index + 1} />
          </div>
        )
      )}
    </div>
  );
}
