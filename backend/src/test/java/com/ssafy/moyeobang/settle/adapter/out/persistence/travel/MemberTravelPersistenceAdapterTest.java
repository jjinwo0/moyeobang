package com.ssafy.moyeobang.settle.adapter.out.persistence.travel;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.ssafy.moyeobang.common.error.exception.EntityNotFoundException;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberTravelJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.settle.adapter.out.persistence.member.MemberRepositoryInSettle;
import com.ssafy.moyeobang.settle.application.domain.travel.MemberTravel;
import com.ssafy.moyeobang.support.PersistenceAdapterTestSupport;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class MemberTravelPersistenceAdapterTest extends PersistenceAdapterTestSupport {

    @Autowired
    private MemberTravelPersistenceAdapter adapter;

    @Autowired
    private MemberTravelRepositoryInSettle repository;

    @Autowired
    private MemberRepositoryInSettle memberRepository;

    @Autowired
    private TravelRepositoryInSettle travelRepository;

    @Autowired
    private MemberTravelMapper memberTravelMapper;

    @BeforeEach
    void setUp() {

        MemberJpaEntity member1 = MemberJpaEntity.builder()
                .email("test1@ssafy.com")
                .username("test1")
                .memberKey("eea1652c-b5f3-4ef3-9aba-5360026f03b0")
                .build();

        MemberJpaEntity member2 = MemberJpaEntity.builder()
                .email("test2@ssafy.com")
                .username("test2")
                .memberKey("aae2561c-f3b5-3fe4-bab6-f03b05360026")
                .build();

        memberRepository.save(member1);
        memberRepository.save(member2);

        TravelJpaEntity travel = TravelJpaEntity.builder()
                .title("ssaftTravel")
                .build();

        travelRepository.save(travel);

        MemberTravelJpaEntity memberTravel1 = MemberTravelJpaEntity.builder()
                .balance(10000)
                .member(member1)
                .travel(travel)
                .build();

        MemberTravelJpaEntity memberTravel2 = MemberTravelJpaEntity.builder()
                .balance(20000)
                .member(member2)
                .travel(travel)
                .build();

        repository.save(memberTravel1);
        repository.save(memberTravel2);
    }

    @AfterEach
    void tearDown() {

        repository.deleteAll();
        travelRepository.deleteAll();
        memberRepository.deleteAll();
    }

    @Test
    @DisplayName("회원 식별자와 여행 식별자로 회원 여행 연관관계 엔티티 조회")
    void 회원_여행_식별자로_연관관계_조회() {

        // when
        MemberTravel findDomain1 = adapter.findMemberTravel(1L, 1L);
        MemberTravel findDomain2 = adapter.findMemberTravel(2L, 1L);

        // then
        assertThat(findDomain1.getMappingInfo().memberId()).isEqualTo(1L);
        assertThat(findDomain1.getMappingInfo().travelId()).isEqualTo(1L);
        assertThat(findDomain1.getBalance()).isEqualTo(10000);

        assertThat(findDomain2.getMappingInfo().memberId()).isEqualTo(2L);
        assertThat(findDomain2.getMappingInfo().travelId()).isEqualTo(1L);
        assertThat(findDomain2.getBalance()).isEqualTo(20000);

        assertThatThrownBy(() -> adapter.findMemberTravel(1L, 2L))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("Member[" + 1L + "]이 참여한 여행 [" + 2L + "]의 정보가 없습니다.");
    }

    @Test
    @DisplayName("할당 금액 만큼 참여자 본인 예산에서 차감")
    void 개인_예산_차감() {

        // when
        adapter.decreaseMemberTravelAmount(5000, 1L, 1L);
        adapter.decreaseMemberTravelAmount(5000, 2L, 1L);

        // then
        assertThat(adapter.findMemberTravel(1L, 1L).getBalance()).isEqualTo(5000);
        assertThat(adapter.findMemberTravel(2L, 1L).getBalance()).isEqualTo(15000);
    }
}