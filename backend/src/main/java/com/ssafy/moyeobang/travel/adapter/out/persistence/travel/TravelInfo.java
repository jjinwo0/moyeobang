package com.ssafy.moyeobang.travel.adapter.out.persistence.travel;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.moyeobang.common.persistenceentity.travel.QuizJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import lombok.Getter;

@Getter
public class TravelInfo {

    private final TravelJpaEntity travel;
    private final TravelAccountJpaEntity travelAccount;
    private final QuizJpaEntity quiz;

    @QueryProjection
    public TravelInfo(TravelJpaEntity travel, TravelAccountJpaEntity travelAccount, QuizJpaEntity quiz) {
        this.travel = travel;
        this.travelAccount = travelAccount;
        this.quiz = quiz;
    }
}
