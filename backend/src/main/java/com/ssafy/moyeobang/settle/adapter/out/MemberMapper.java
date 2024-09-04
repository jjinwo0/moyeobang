package com.ssafy.moyeobang.settle.adapter.out;

import com.ssafy.moyeobang.settle.application.domain.Member;
import org.springframework.stereotype.Component;

@Component
public class MemberMapper {

    Member mapToDomain(MemberEntity memberEntity) {

        return Member.of(
                memberEntity.getId(),
                memberEntity.getEmail(),
                memberEntity.getUsername(),
                memberEntity.getNickname(),
                memberEntity.getBirth(),
                memberEntity.getGender(),
                memberEntity.getAge(),
                memberEntity.getMemberKey()
        );
    }

    MemberEntity mapToEntity(Member member) {

        return MemberEntity.builder()
                .email(member.getEmail())
                .username(member.getUsername())
                .nickname(member.getNickname())
                .birth(member.getBirth())
                .gender(member.getGender())
                .age(member.getAge())
                .memberKey(member.getMemberKey())
                .build();
    }
}
