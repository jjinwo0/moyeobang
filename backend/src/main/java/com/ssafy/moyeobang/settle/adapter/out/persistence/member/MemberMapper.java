package com.ssafy.moyeobang.settle.adapter.out.persistence.member;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.settle.application.domain.member.Member;
import com.ssafy.moyeobang.settle.application.domain.member.Member.MemberInfo;
import com.ssafy.moyeobang.settle.application.domain.member.Member.MemberUnique;
import com.ssafy.moyeobang.settle.application.domain.member.Member.PersonalInfo;
import org.springframework.stereotype.Component;

@Component
public class MemberMapper {

    Member mapToDomain(final MemberJpaEntity memberEntity) {

        return Member.of(
                new MemberUnique(
                        memberEntity.getId(),
                        memberEntity.getMemberKey()
                ),
                new MemberInfo(
                        memberEntity.getEmail(),
                        memberEntity.getUsername()
                ),
                new PersonalInfo(
                        memberEntity.getBirth(),
                        memberEntity.getGender(),
                        memberEntity.getAge()
                )
        );
    }

    MemberJpaEntity mapToEntity(final Member member) {

        return MemberJpaEntity.builder()
                .id(member.getMemberUnique().id())
                .email(member.getMemberInfo().email())
                .username(member.getMemberInfo().username())
                .birth(member.getPersonalInfo().birth())
                .gender(member.getPersonalInfo().gender())
                .age(member.getPersonalInfo().age())
                .memberKey(member.getMemberUnique().memberKey())
                .build();
    }
}
