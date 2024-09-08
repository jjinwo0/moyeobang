package com.ssafy.moyeobang.settle.application.port.out;

public interface UpdateMemberTravelPort {

    void addMemberTravelAmount(Integer amount, Long memberId, Long travelId);

    void decreaseMemberTravelAmount(Integer amount, Long memberId, Long travelId);
}
