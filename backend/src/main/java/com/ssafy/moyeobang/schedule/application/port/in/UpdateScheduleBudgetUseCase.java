package com.ssafy.moyeobang.schedule.application.port.in;

public interface UpdateScheduleBudgetUseCase {
    void updateScheduleBudget(long scheduleId, long budget);
}
