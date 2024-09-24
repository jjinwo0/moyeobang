package com.ssafy.moyeobang.travel.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.travel.adapter.in.web.out.CreateTravelResponse;
import com.ssafy.moyeobang.travel.application.port.in.CreateTravelInCommand;
import com.ssafy.moyeobang.travel.application.port.in.CreateTravelUseCase;
import com.ssafy.moyeobang.travel.application.port.out.CreateTravelOutCommand;
import com.ssafy.moyeobang.travel.application.port.out.CreateTravelPort;
import com.ssafy.moyeobang.travel.application.port.out.UploadImagePort;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class CreateTravelService implements CreateTravelUseCase {

    private final CreateTravelPort createTravelPort;
    private final UploadImagePort uploadImagePort;

    @Override
    public CreateTravelResponse createTravel(CreateTravelInCommand inCommand) {
        String imageUrl = uploadImagePort.uploadImage(inCommand.backgroundImage());

        CreateTravelOutCommand outCommand = new CreateTravelOutCommand(
                inCommand.title(),
                inCommand.startDate(),
                inCommand.endDate(),
                inCommand.travelPlaces(),
                inCommand.quizQuestion(),
                inCommand.quizAnswer(),
                imageUrl
        );

        return new CreateTravelResponse(createTravelPort.createTravel(outCommand));
    }
}
