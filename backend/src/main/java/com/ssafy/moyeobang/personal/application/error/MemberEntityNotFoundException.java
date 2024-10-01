package com.ssafy.moyeobang.personal.application.error;

public class MemberEntityNotFoundException extends RuntimeException{

    public MemberEntityNotFoundException() {

        super("회원 정보를 찾을 수 없습니다.");
    }
}
