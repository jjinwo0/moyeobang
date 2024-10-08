package com.ssafy.moyeobang.travel.adapter.out.persistence.travel;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberTravelJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.QuizJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.travel.application.domain.Member;
import com.ssafy.moyeobang.travel.application.domain.Quiz;
import com.ssafy.moyeobang.travel.application.domain.Travel;
import com.ssafy.moyeobang.travel.application.domain.TravelAccount;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class TravelMapper {

    public Travel mapToTravel(TravelInfo travelInfo) {
        TravelJpaEntity travel = travelInfo.getTravel();

        return new Travel(
                travel.getId(),
                travel.getTitle(),
                travel.getBackgroundImageUrl(),
                mapToMembers(travel),
                travel.getStartDate(),
                travel.getEndDate(),
                travel.getTravelPlaces(),
                mapToQuiz(travelInfo.getQuiz()),
                mapToTravelAccount(travelInfo.getTravelAccount())
        );
    }

    private Set<Member> mapToMembers(TravelJpaEntity travelJpaEntity) {
        List<MemberJpaEntity> members = travelJpaEntity.getMemberTravelJpaEntities().stream()
                .map(MemberTravelJpaEntity::getMember)
                .toList();

        return members.stream()
                .map(member -> new Member(member.getId(), member.getUsername(), member.getProfile()))
                .collect(Collectors.toSet());
    }

    private Quiz mapToQuiz(QuizJpaEntity quiz) {
        return new Quiz(quiz.getQuestion(), quiz.getAnswer());
    }

    private TravelAccount mapToTravelAccount(TravelAccountJpaEntity travelAccount) {
        return new TravelAccount(travelAccount.getId(), travelAccount.getAccountNumber());
    }
}
