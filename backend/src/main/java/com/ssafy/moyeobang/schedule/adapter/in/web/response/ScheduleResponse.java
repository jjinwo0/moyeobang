package com.ssafy.moyeobang.schedule.adapter.in.web.response;

import java.time.LocalDateTime;

public record ScheduleResponse(long scheduleId, String scheduleTitle,
                               LocationResponse scheduleLocation, LocalDateTime scheduleTime, int budget, int sequence,
                               String completion, String memo, String scheduleImg,
                               MatchedTransactionResponse matchedTransaction,
                               UnMatchedTransactionResponse unmatchedTransaction) {
}
