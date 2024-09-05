package com.ssafy.moyeobang.settle.application.domain.member;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MemberType {

    GOOGLE("GOOGLE"), KAKAO("KAKAO");

    private String type;

    public static Boolean isMemberType(String type) {

        for (MemberType memberType : MemberType.values()){

            if (memberType.getType().equals(type)) return true;
        }

        return false;
    }
}
