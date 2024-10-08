package com.ssafy.moyeobang.verify.error;

public class MemberEntityNotFoundException extends RuntimeException{

    public MemberEntityNotFoundException() {

        super("회원 정보를 찾을 수 없습니다.");
    }
}
