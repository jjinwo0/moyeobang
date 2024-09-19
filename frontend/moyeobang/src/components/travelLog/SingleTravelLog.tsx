import React from 'react';
import PlusSelfSchedule from './travelSingleCard/PlusSelfSchedule';
import PaidAutoSchedule from './travelSingleCard/PaidAutoSchedule';

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
      {'scheduleId' in schedule ? (
        <PlusSelfSchedule
          schedule={schedule}
          scheduleNum={scheduleNum}
          dayNum={dayNum}
          dragHandleProps={dragHandleProps}
        ></PlusSelfSchedule>
      ) : (
        // PaidAutoSchedule 처리
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
