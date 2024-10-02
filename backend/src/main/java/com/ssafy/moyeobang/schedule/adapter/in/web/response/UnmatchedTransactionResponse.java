package com.ssafy.moyeobang.schedule.adapter.in.web.response;

import java.time.LocalDateTime;
import java.util.List;

public record UnmatchedTransactionResponse(long transactionId,
                                           String paymentName,
                                           double latitude,
                                           double longitude,
                                           long totalPrice,
                                           LocalDateTime paymentTime,
                                           String splitMethod,
                                           List<ParticipantResponse> participantsInfo) {
}
