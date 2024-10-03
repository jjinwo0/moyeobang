package com.ssafy.moyeobang.schedule.adapter.in.web.response;

import java.time.LocalDate;
import java.util.List;

public record DayScheduleResponse(int dayNum, LocalDate dayDate, List<ScheduleResponse> schedules) {
}
