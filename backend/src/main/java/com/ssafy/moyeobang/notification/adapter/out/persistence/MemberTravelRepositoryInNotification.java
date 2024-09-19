package com.ssafy.moyeobang.notification.adapter.out.persistence;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberTravelJpaEntity;
import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberTravelRepositoryInNotification extends JpaRepository<MemberTravelJpaEntity, Long>,
        MemberTravelRepositoryInNotificationCustom {

    @Query("select mt.member from MemberTravelJpaEntity mt where mt.travel.id = :travelId")
    List<MemberJpaEntity> findMemberEntityByTravelId(@Param("travelId") Long travelId);

//    @Query("SELECT mt FROM MemberTravelJpaEntity mt JOIN FETCH mt.travel")
//    List<MemberTravelJpaEntity> findAllMemberTravelsWithTravel();

    @Override
    Map<Long, List<MemberTravelJpaEntity>> findAllMemberInTravel();
}
