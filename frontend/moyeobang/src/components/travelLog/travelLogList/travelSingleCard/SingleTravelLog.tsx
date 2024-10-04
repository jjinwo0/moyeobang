import React from 'react';
import PlusSelfSchedule from './PlusSelfSchedule';
import PaidAutoSchedule from './PaidAutoSchedule';
import {useTravelLogContext} from '@/contexts/TravelLog';
import {css} from '@emotion/react';

interface SingleTravelLogProps {
  schedule: PlusSelfSchedule | PaidAutoSchedule;
  scheduleNum: number;
  dragHandleProps: any;
  dayNum: number;
}

const scheduleContentStyle = css`
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function SingleTravelLog({
  schedule,
  scheduleNum,
  dayNum,
  dragHandleProps,
}: SingleTravelLogProps) {
  return (
    <div css={scheduleContentStyle}>
      {schedule.matchedTransaction !== null ? (
        <PlusSelfSchedule
          schedule={schedule}
          scheduleNum={scheduleNum}
          dayNum={dayNum}
          dragHandleProps={dragHandleProps}
        ></PlusSelfSchedule>
      ) : (
        <>
          <PaidAutoSchedule
            schedule={schedule}
            scheduleNum={scheduleNum}
            dayNum={dayNum}
            dragHandleProps={dragHandleProps}
          ></PaidAutoSchedule>
        </>
      )}
    </div>
  );
}
