package com.ssafy.moyeobang.schedule.application.port.in;

import java.util.List;

public record UpdateScheduleSequenceCommand(List<SchedulesSequenceCommand> scheduleSequences) {
}
