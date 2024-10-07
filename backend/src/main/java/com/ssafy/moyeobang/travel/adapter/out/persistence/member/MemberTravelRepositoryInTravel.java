package com.ssafy.moyeobang.travel.adapter.out.persistence.member;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberTravelJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberTravelRepositoryInTravel extends JpaRepository<MemberTravelJpaEntity, Long> {

    @Modifying
    @Query("delete MemberTravelJpaEntity m where m.travel.id = :travelId and m.member.id = :memberId")
    int deleteBy(@Param("travelId") Long travelId, @Param("memberId") Long memberId);
}
