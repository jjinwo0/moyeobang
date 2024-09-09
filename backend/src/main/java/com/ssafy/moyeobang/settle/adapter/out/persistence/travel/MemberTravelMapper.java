package com.ssafy.moyeobang.settle.adapter.out.persistence.travel;

import com.ssafy.moyeobang.settle.adapter.out.persistence.member.MemberEntity;
import com.ssafy.moyeobang.settle.application.domain.travel.MemberTravel;
import com.ssafy.moyeobang.settle.application.domain.travel.MemberTravel.MappingInfo;
import org.springframework.stereotype.Component;

@Component
public class MemberTravelMapper {

    MemberTravel mapToDomain(final MemberTravelEntity entity) {

        return MemberTravel.of(
                entity.getId(),
                entity.getBalance(),
                new MappingInfo(
                        entity.getMemberEntity().getId(),
                        entity.getTravelEntity().getId()
                )
        );
    }

    MemberTravelEntity mapToEntity(final MemberTravel domain, final MemberEntity member, final TravelEntity travel) {

        return MemberTravelEntity.builder()
                .id(domain.getId())
                .balance(domain.getBalance())
                .memberEntity(member)
                .travelEntity(travel)
                .build();
    }

    MemberTravelEntity createEntity(Integer balance, MemberEntity member, TravelEntity travel) {

        return MemberTravelEntity.builder()
                .balance(balance)
                .memberEntity(member)
                .travelEntity(travel)
                .build();
    }
}
