package com.ssafy.moyeobang.travel.application.domain;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public record Travel(Long id,
                     String title,
                     String backgroundImageUrl,
                     Set<Member> members,
                     LocalDate startDate,
                     LocalDate endDate,
                     List<String> travelPlaces,
                     Quiz quiz,
                     TravelAccount travelAccount) {

    public boolean checkIfQuizAnswerIsCorrect(String answer) {
        return quiz.checkIfAnswerIsCorrect(answer);
    }

    public int getParticipantCount() {
        return members.size();
    }

    public String getQuestion() {
        return quiz.question();
    }

    public String getAnswer() {
        return quiz.answer();
    }

    public Long getAccountId() {
        return travelAccount.id();
    }

    public String getAccountNumber() {
        return travelAccount.accountNumber();
    }
}
