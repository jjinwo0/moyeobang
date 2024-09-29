import React from 'react';
import PlusSelfSchedule from './PlusSelfSchedule';
import PaidAutoSchedule from './PaidAutoSchedule';
import {useTravelLogContext} from '@/contexts/TravelLog';

interface SingleTravelLogProps {
  schedule: PlusSelfSchedule | PaidAutoSchedule;
  scheduleNum: number;
  dragHandleProps: any;
  dayNum: number;
}

export default function SingleTravelLog({
  schedule,
  scheduleNum,
  dayNum,
  dragHandleProps,
}: SingleTravelLogProps) {
  const {handleShowPlusSelf} = useTravelLogContext();
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleShowPlusSelf();
  };
  return (
    <div onClick={handleClick}>
      {schedule.isSelfPlus ? (
        <PlusSelfSchedule
          schedule={schedule as PlusSelfSchedule}
          scheduleNum={scheduleNum}
          dayNum={dayNum}
          dragHandleProps={dragHandleProps}
        ></PlusSelfSchedule>
      ) : (
        <>
          <PaidAutoSchedule
            schedule={schedule as PaidAutoSchedule}
            scheduleNum={scheduleNum}
            dayNum={dayNum}
            dragHandleProps={dragHandleProps}
          ></PaidAutoSchedule>
        </>
      )}
    </div>
  );
}
