import React from 'react';
import PlusSelfSchedule from './PlusSelfSchedule';
import PaidAutoSchedule from './PaidAutoSchedule';

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
  return (
    <div>
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
