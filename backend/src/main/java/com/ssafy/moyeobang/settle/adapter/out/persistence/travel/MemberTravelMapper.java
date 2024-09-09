package com.ssafy.moyeobang.settle.adapter.out.persistence.travel;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberTravelJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.settle.application.domain.travel.MemberTravel;
import com.ssafy.moyeobang.settle.application.domain.travel.MemberTravel.MappingInfo;
import org.springframework.stereotype.Component;

@Component
public class MemberTravelMapper {

    MemberTravel mapToDomain(final MemberTravelJpaEntity memberTravelJpaEntity) {

        return MemberTravel.of(
                memberTravelJpaEntity.getId(),
                memberTravelJpaEntity.getBalance(),
                new MappingInfo(
                        memberTravelJpaEntity.getMember().getId(),
                        memberTravelJpaEntity.getTravel().getId()
                )
        );
    }

    MemberTravelJpaEntity mapToEntity(final MemberTravel domain,
                                   final MemberJpaEntity member,
                                   final TravelJpaEntity travel) {

        return MemberTravelJpaEntity.builder()
                .id(domain.getId())
                .balance(domain.getBalance())
                .member(member)
                .travel(travel)
                .build();
    }

    MemberTravelJpaEntity createEntity(Integer balance,
                                       MemberJpaEntity member,
                                       TravelJpaEntity travel) {

        return MemberTravelJpaEntity.builder()
                .balance(balance)
                .member(member)
                .travel(travel)
                .build();
    }
}
