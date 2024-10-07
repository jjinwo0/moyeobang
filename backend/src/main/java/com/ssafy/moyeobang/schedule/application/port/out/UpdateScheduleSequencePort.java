package com.ssafy.moyeobang.schedule.application.port.out;

import com.ssafy.moyeobang.schedule.application.port.in.SchedulesSequenceCommand;
import java.util.List;

public interface UpdateScheduleSequencePort {
    void updateSchedules(List<SchedulesSequenceCommand> scheduleSequences);
}
