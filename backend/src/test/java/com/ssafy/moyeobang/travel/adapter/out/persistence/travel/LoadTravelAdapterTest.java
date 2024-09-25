package com.ssafy.moyeobang.travel.adapter.out.persistence.travel;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.tuple;

import autoparams.AutoSource;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberTravelJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.QuizJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelPlaceJpaEntity;
import com.ssafy.moyeobang.support.PersistenceAdapterTestSupport;
import com.ssafy.moyeobang.travel.adapter.out.persistence.member.MemberRepositoryInTravel;
import com.ssafy.moyeobang.travel.adapter.out.persistence.member.MemberTravelRepositoryInTravel;
import com.ssafy.moyeobang.travel.adapter.out.persistence.quiz.QuizRepositoryInTravel;
import com.ssafy.moyeobang.travel.application.domain.Travel;
import jakarta.persistence.EntityManager;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
class LoadTravelAdapterTest extends PersistenceAdapterTestSupport {

    @Autowired
    private LoadTravelAdapter loadTravelAdapter;

    @Autowired
    private TravelRepositoryInTravel travelRepository;

    @Autowired
    private TravelPlaceRepositoryInTravel travelPlaceRepository;

    @Autowired
    private TravelAccountRepositoryInTravel travelAccountRepository;

    @Autowired
    private QuizRepositoryInTravel quizRepository;

    @Autowired
    private MemberRepositoryInTravel memberRepository;

    @Autowired
    private MemberTravelRepositoryInTravel memberTravelRepository;

    @Autowired
    private EntityManager entityManager;

    @AfterEach
    void tearDown() {
        quizRepository.deleteAllInBatch();
        memberTravelRepository.deleteAllInBatch();
        memberRepository.deleteAllInBatch();
        travelAccountRepository.deleteAllInBatch();
        travelPlaceRepository.deleteAllInBatch();
        travelRepository.deleteAllInBatch();
    }

    @DisplayName("여행 목록을 조회한 후 도메인화해서 어플리케이션 계층에 로딩시킨다.")
    @ParameterizedTest
    @AutoSource
    void loadTravel(TravelJpaEntity travel, MemberJpaEntity member1, MemberJpaEntity member2) {
        //given
        memberRepository.saveAll(List.of(member1, member2));
        travelRepository.save(travel);

        MemberTravelJpaEntity memberTravel1 = createMemberTravel(travel, member1);
        MemberTravelJpaEntity memberTravel2 = createMemberTravel(travel, member2);
        memberTravelRepository.saveAll(List.of(memberTravel1, memberTravel2));

        TravelPlaceJpaEntity travelPlace1 = createTravelPlace(travel, "제주도");
        TravelPlaceJpaEntity travelPlace2 = createTravelPlace(travel, "부산");
        travelPlaceRepository.saveAll(List.of(travelPlace1, travelPlace2));

        TravelAccountJpaEntity travelAccount = createTravelAccount(travel);
        travelAccountRepository.save(travelAccount);

        QuizJpaEntity quiz = createQuiz(travel);
        quizRepository.save(quiz);

        entityManager.clear();

        //when
        List<Travel> travels = loadTravelAdapter.loadTravelsBy(member1.getId());

        //then
        assertThat(travels).extracting(
                "id", "title", "backgroundImageUrl", "participantCount", "startDate", "endDate"
        ).containsExactly(
                tuple(travel.getId(), travel.getTitle(), travel.getBackgroundImageUrl(), 2, travel.getStartDate(), travel.getEndDate())
        );
    }

    private MemberTravelJpaEntity createMemberTravel(TravelJpaEntity travel, MemberJpaEntity member1) {
        return MemberTravelJpaEntity.builder()
                .member(member1)
                .travel(travel)
                .build();
    }

    private TravelPlaceJpaEntity createTravelPlace(TravelJpaEntity travel, String name) {
        return TravelPlaceJpaEntity.builder()
                .travel(travel)
                .name(name)
                .build();
    }

    private TravelAccountJpaEntity createTravelAccount(TravelJpaEntity travel) {
        return TravelAccountJpaEntity.builder()
                .accountNumber("1111111111111111")
                .travel(travel)
                .build();
    }

    private QuizJpaEntity createQuiz(TravelJpaEntity travel) {
        return QuizJpaEntity.builder()
                .question("김훈민의 발 사이즈는?")
                .answer("235")
                .travel(travel)
                .build();
    }
}