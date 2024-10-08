package com.ssafy.moyeobang.travel.adapter.in.web.response;

import com.ssafy.moyeobang.travel.application.domain.Member;

public record ParticipantInfo(Long memberId, String memberName, String profileImage) {

    public ParticipantInfo(Member member) {
        this(member.id(), member.name(), member.profileImage());
    }
}