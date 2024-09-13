import React from 'react';

interface SingleTravelLogProps {
  schedule: PlusSelfSchedule | PaidAutoSchedule;
}

export default function SingleTravelLog({schedule}: SingleTravelLogProps) {
  return (
    <div>
      {'scheduleId' in schedule ? (
        // PlusSelfSchedule 처리
        <>
          <h3>{schedule.scheduleTitle}</h3>
          <p>Location: {schedule.scheduleLocation}</p>
          <p>Budget: {schedule.predictedBudget}</p>
          <p>Completion: {schedule.completion}</p>
          {schedule.matchedTransaction && (
            <div>
              <p>
                Matched Transaction Amount: {schedule.matchedTransaction.amount}
              </p>
              <p>
                Matched Transaction Details:{' '}
                {schedule.matchedTransaction.details}
              </p>
            </div>
          )}
        </>
      ) : (
        // PaidAutoSchedule 처리
        <>
          <h3>Transaction Details: {schedule.details}</h3>
          <p>Amount: {schedule.amount}</p>
          <p>Payment Time: {schedule.paymentTime}</p>
        </>
      )}
    </div>
  );
}
