package com.ssafy.moyeobang.travel.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.travel.application.port.in.ParticipateTravelCommand;
import com.ssafy.moyeobang.travel.application.port.in.ParticipateTravelUseCase;
import com.ssafy.moyeobang.travel.application.port.out.ParticipateTravelPort;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class ParticipateTravelService implements ParticipateTravelUseCase {

    private final ParticipateTravelPort participateTravelPort;

    @Override
    public boolean participateTravel(ParticipateTravelCommand command) {
        return participateTravelPort.participateTravel(
                command.travelId(),
                command.memberId()
        );
    }
}
