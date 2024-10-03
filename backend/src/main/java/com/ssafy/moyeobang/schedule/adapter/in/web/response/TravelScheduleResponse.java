package com.ssafy.moyeobang.schedule.adapter.in.web.response;

import java.util.List;

public record TravelScheduleResponse(List<DayScheduleResponse> daySchedules) {
}
