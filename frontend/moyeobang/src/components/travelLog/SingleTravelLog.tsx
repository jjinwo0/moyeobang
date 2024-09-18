import React from 'react';
import PlusSelfSchedule from './travelSingleCard/PlusSelfSchedule';
import PaidAutoSchedule from './travelSingleCard/PaidAutoSchedule';

interface SingleTravelLogProps {
  schedule: PlusSelfSchedule | PaidAutoSchedule;
  scheduleNum: number;
  dragHandleProps: any;
}

export default function SingleTravelLog({
  schedule,
  scheduleNum,
  dragHandleProps,
}: SingleTravelLogProps) {
  return (
    <div>
      {'scheduleId' in schedule ? (
        <PlusSelfSchedule
          schedule={schedule}
          scheduleNum={scheduleNum}
          dragHandleProps={dragHandleProps}
        ></PlusSelfSchedule>
      ) : (
        // PaidAutoSchedule 처리
        <>
          <PaidAutoSchedule
            schedule={schedule}
            scheduleNum={scheduleNum}
            dragHandleProps={dragHandleProps}
          ></PaidAutoSchedule>
        </>
      )}
    </div>
  );
}
