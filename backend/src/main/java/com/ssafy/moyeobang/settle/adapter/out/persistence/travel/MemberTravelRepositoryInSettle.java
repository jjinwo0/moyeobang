package com.ssafy.moyeobang.settle.adapter.out.persistence.travel;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberTravelJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberTravelRepositoryInSettle extends JpaRepository<MemberTravelJpaEntity, Long> {

    @Query("select mt from MemberTravelJpaEntity mt where mt.member.id = :memberId and mt.travel.id = :travelId")
    MemberTravelJpaEntity findByMemberIdAndTravelId(@Param("memberId") Long memberId, @Param("travelId") Long travelId);
}
