package com.ssafy.moyeobang.schedule.adapter.in.web.request;

import com.ssafy.moyeobang.schedule.application.port.in.SchedulesSequenceCommand;
import com.ssafy.moyeobang.schedule.application.port.in.UpdateScheduleSequenceCommand;
import java.util.List;

public record ScheduleSequenceRequest(List<ScheduleSequence> scheduleSequences) {
    public UpdateScheduleSequenceCommand toCommand() {
        List<SchedulesSequenceCommand> scheduleCommands = scheduleSequences.stream()
                .map(seq -> new SchedulesSequenceCommand(seq.scheduleId(), seq.sequence()))
                .toList();

        return new UpdateScheduleSequenceCommand(scheduleCommands);
    }
}
