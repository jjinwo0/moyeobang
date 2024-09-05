package com.ssafy.moyeobang.settle.adapter.out.member;

import com.ssafy.moyeobang.settle.application.domain.member.Member;
import com.ssafy.moyeobang.settle.application.domain.member.Member.MemberInfo;
import com.ssafy.moyeobang.settle.application.domain.member.Member.MemberUnique;
import com.ssafy.moyeobang.settle.application.domain.member.Member.PersonalInfo;
import org.springframework.stereotype.Component;

@Component
public class MemberMapper {

    Member mapToDomain(final MemberEntity memberEntity) {

        return Member.of(
                new MemberUnique(
                        memberEntity.getId(),
                        memberEntity.getMemberKey()
                ),
                new MemberInfo(
                        memberEntity.getEmail(),
                        memberEntity.getUsername(),
                        memberEntity.getNickname()
                ),
                new PersonalInfo(
                        memberEntity.getBirth(),
                        memberEntity.getGender(),
                        memberEntity.getAge()
                )
        );
    }

    MemberEntity mapToEntity(final Member member) {

        return MemberEntity.builder()
                .id(member.getMemberUnique().id())
                .email(member.getMemberInfo().email())
                .username(member.getMemberInfo().username())
                .nickname(member.getMemberInfo().nickname())
                .birth(member.getPersonalInfo().birth())
                .gender(member.getPersonalInfo().gender())
                .age(member.getPersonalInfo().age())
                .memberKey(member.getMemberUnique().memberKey())
                .build();
    }
}
