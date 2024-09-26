package com.ssafy.moyeobang.travel.adapter.out.persistence.travel;

import static java.time.LocalDate.now;
import static org.assertj.core.api.Assertions.assertThat;

import autoparams.AutoSource;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberTravelJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.support.PersistenceAdapterTestSupport;
import com.ssafy.moyeobang.travel.adapter.out.persistence.member.MemberRepositoryInTravel;
import com.ssafy.moyeobang.travel.adapter.out.persistence.member.MemberTravelRepositoryInTravel;
import com.ssafy.moyeobang.travel.application.port.out.CreateTravelOutCommand;
import jakarta.persistence.EntityManager;
import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
class TravelPersistenceAdapterTest extends PersistenceAdapterTestSupport {

    @Autowired
    private TravelPersistenceAdapter travelPersistenceAdapter;

    @Autowired
    private MemberRepositoryInTravel memberRepository;

    @Autowired
    private MemberTravelRepositoryInTravel memberTravelRepository;

    @Autowired
    private TravelRepositoryInTravel travelRepository;

    @Autowired
    private TravelPlaceRepositoryInTravel travelPlaceRepository;

    @Autowired
    private EntityManager entityManager;

    @AfterEach
    void tearDown() {
        memberTravelRepository.deleteAllInBatch();
        memberRepository.deleteAllInBatch();
        travelPlaceRepository.deleteAllInBatch();
        travelRepository.deleteAllInBatch();
    }

    @DisplayName("여행 제목, 여행 시작일, 여행 종료일을 바탕으로 여행을 생성한다.")
    @Test
    void createTravel() {
        //given
        LocalDate startDate = now();
        LocalDate endDate = now().plusDays(1);

        CreateTravelOutCommand command = new CreateTravelOutCommand(
                "즐거운 제주도 여행",
                startDate,
                endDate,
                List.of("강원도 춘천", "제주도", "경상남도 함양"),
                "김훈민의 발 사이즈는?",
                "270",
                "https://sample-image.png"
        );

        //when
        Long travelId = travelPersistenceAdapter.createTravel(command);

        //then
        assertThat(findTravelBy(travelId)).extracting("startDate", "endDate")
                .containsExactly(startDate, endDate);
    }

    @DisplayName("사용자가 여행에서 탈퇴한다.")
    @ParameterizedTest
    @AutoSource
    void leaveTravel(TravelJpaEntity travel,
                     MemberJpaEntity member1,
                     MemberJpaEntity member2,
                     MemberJpaEntity member3,
                     MemberJpaEntity member4) {
        //given
        travelRepository.save(travel);
        memberRepository.saveAll(List.of(member1, member2, member3, member4));

        MemberTravelJpaEntity memberTravel1 = createMemberTravel(travel, member1);
        MemberTravelJpaEntity memberTravel2 = createMemberTravel(travel, member2);
        MemberTravelJpaEntity memberTravel3 = createMemberTravel(travel, member3);
        MemberTravelJpaEntity memberTravel4 = createMemberTravel(travel, member4);
        memberTravelRepository.saveAll(List.of(memberTravel1, memberTravel2, memberTravel3, memberTravel4));

        entityManager.clear();

        //when
        travelPersistenceAdapter.leaveTravel(travel.getId(), member1.getId());

        //then
        assertThat(findTravelBy(travel.getId()).getMemberTravelJpaEntities())
                .extracting("member.id")
                .containsExactlyInAnyOrder(member2.getId(), member3.getId(), member4.getId());
    }

    private static MemberTravelJpaEntity createMemberTravel(TravelJpaEntity travel, MemberJpaEntity member) {
        return MemberTravelJpaEntity.builder()
                .travel(travel)
                .member(member)
                .build();
    }

    private TravelJpaEntity findTravelBy(Long travelId) {
        return travelRepository.findById(travelId).get();
    }

}