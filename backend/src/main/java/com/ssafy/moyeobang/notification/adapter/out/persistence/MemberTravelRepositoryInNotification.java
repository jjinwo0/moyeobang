package com.ssafy.moyeobang.notification.adapter.out.persistence;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberTravelJpaEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberTravelRepositoryInNotification extends JpaRepository<MemberTravelJpaEntity, Long> {

    @Query("select mt.member from MemberTravelJpaEntity mt where mt.travel.id = :travelId")
    List<MemberJpaEntity> findMemberIdByTravelId(@Param("travelId") Long travelId);
}
