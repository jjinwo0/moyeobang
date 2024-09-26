package com.ssafy.moyeobang.travel.adapter.in.web.response;

import com.ssafy.moyeobang.travel.application.domain.Travel;
import java.time.LocalDate;
import java.util.List;

public record GetTravelsResponse(Long travelId,
                                 String travelName,
                                 String travelImg,
                                 Integer participantCount,
                                 LocalDate startDate,
                                 LocalDate endDate,
                                 List<String> travelPlaceList,
                                 String quizQuestion,
                                 String quizAnswer,
                                 Long accountId,
                                 String accountNumber,
                                 List<ParticipantInfo> participantsInfo) {

    public GetTravelsResponse(Travel travel) {
        this(
                travel.id(),
                travel.title(),
                travel.backgroundImageUrl(),
                travel.getParticipantCount(),
                travel.startDate(),
                travel.endDate(),
                travel.travelPlaces(),
                travel.getQuestion(),
                travel.getAnswer(),
                travel.getAccountId(),
                travel.getAccountNumber(),
                travel.members().stream()
                        .map(ParticipantInfo::new)
                        .toList()
        );
    }
}
