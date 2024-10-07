package com.ssafy.moyeobang.travel.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.travel.application.port.in.LeaveTravelCommand;
import com.ssafy.moyeobang.travel.application.port.in.LeaveTravelUseCase;
import com.ssafy.moyeobang.travel.application.port.out.LeaveTravelPort;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class LeaveTravelService implements LeaveTravelUseCase {

    private final LeaveTravelPort leaveTravelPort;

    @Override
    public boolean leaveTravel(LeaveTravelCommand command) {
        return leaveTravelPort.leaveTravel(command.travelId(), command.memberId());
    }
}
