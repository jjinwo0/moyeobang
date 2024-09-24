package com.ssafy.moyeobang.travel.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.travel.adapter.in.web.out.CreateTravelResponse;
import com.ssafy.moyeobang.travel.application.port.in.CreateTravelCommand;
import com.ssafy.moyeobang.travel.application.port.in.CreateTravelUseCase;
import com.ssafy.moyeobang.travel.application.port.out.CreateTravelPort;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class CreateTravelService implements CreateTravelUseCase {

    private final CreateTravelPort createTravelPort;

    @Override
    public CreateTravelResponse createTravel(CreateTravelCommand command) {
        return new CreateTravelResponse(createTravelPort.createTravel(command));
    }
}
