import React, {useState} from 'react';
import SingleTravelLog from './SingleTravelLog';
import {css} from '@emotion/react';
import {colors} from '@/styles/colors';

import DaySchedule from './DaySchedule';

export default function TravelLogList() {
  const dayId: number = 1;
  const travelSchedules = [
    [
      {
        scheduleId: 67890,
        scheduleTitle: '도쿄 타워 방문',
        scheduleLocation: '도쿄 타워',
        scheduleTime: '2024-10-01T10:00:00',
        predictedBudget: 50000, // 예측된 예산
        completion: 'completed', // 완료 상태
        matchedTransaction: {
          // 일정과 매칭된 결제 내역
          transactionId: 78901,
          amount: 50000,
          paymentTime: '2024-10-01T12:15:00',
          details: '도쿄 타워 입장료 결제',
        },
      },
      {
        transactionId: 78902,
        amount: 25000,
        paymentTime: '2024-10-01T16:00:00',
        details: '신주쿠 카페 결제',
      },
    ],
    [
      {
        scheduleId: 67891,
        scheduleTitle: '시부야 거리 탐방',
        scheduleLocation: '시부야',
        scheduleTime: '2024-10-01T13:00:00',
        predictedBudget: 30000,
        completion: 'pending', // 미완료 상태
        matchedTransaction: null, // 매칭된 결제 내역이 없는 경우
      },
    ],
  ];

  return (
    <>
      {/* travelSchedules 배열을 map으로 순회하면서 SingleTravelLog에 데이터 전달 */}
      {travelSchedules.map((scheduleGroup, index) => (
        <DaySchedule
          key={index + 1}
          daySchedules={scheduleGroup[index]}
          dayNum={index + 1}
        ></DaySchedule>
        // <div key={index}>
        //   {scheduleGroup.map(schedule => (
        //     <SingleTravelLog
        //       key={
        //         'scheduleId' in schedule
        //           ? schedule.scheduleId
        //           : schedule.transactionId
        //       }
        //       schedule={schedule} // schedule 데이터를 props로 넘김
        //     />
        //   ))}
        // </div>
      ))}
    </>
  );
}
