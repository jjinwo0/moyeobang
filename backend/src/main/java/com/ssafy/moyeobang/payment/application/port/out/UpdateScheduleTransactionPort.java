package com.ssafy.moyeobang.payment.application.port.out;

public interface UpdateScheduleTransactionPort {
    void updateScheduleStatus(long scheduleId);

    void matchingScheduleTransaction(long scheduleId, long withdrawId);

    void createUnmatchingScheduleTransaction(long withdrawId, int lastSequence);
}
