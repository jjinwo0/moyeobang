package com.ssafy.moyeobang.travel.application.domain;

public record Quiz(String question,
                   String answer) {

    public boolean checkIfAnswerIsCorrect(String answer) {
        return this.answer.equals(answer);
    }
}
