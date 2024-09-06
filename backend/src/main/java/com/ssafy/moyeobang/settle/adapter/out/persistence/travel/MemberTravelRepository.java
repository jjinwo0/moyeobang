package com.ssafy.moyeobang.settle.adapter.out.persistence.travel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberTravelRepository extends JpaRepository<MemberTravelEntity, Long> {

    @Query("select mt from MemberTravelEntity mt where mt.memberEntity.id = :memberId and mt.travelEntity.id = :travelId")
    MemberTravelEntity findByMemberIdAndTravelId(@Param("memberId") Long memberId, @Param("travelId") Long travelId);
}
