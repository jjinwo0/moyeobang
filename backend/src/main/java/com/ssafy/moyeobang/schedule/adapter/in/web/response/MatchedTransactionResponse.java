package com.ssafy.moyeobang.schedule.adapter.in.web.response;

import java.time.LocalDateTime;
import java.util.List;

public record MatchedTransactionResponse(long transactionId, String paymentName, int totalPrice,
                                         LocalDateTime paymentTime, String splitMethod,
                                         List<ParticipantResponse> participantsInfo) {
}