package com.ssafy.moyeobang.travel.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.travel.application.port.in.UpdateTravelInCommand;
import com.ssafy.moyeobang.travel.application.port.in.UpdateTravelUseCase;
import com.ssafy.moyeobang.travel.application.port.out.UpdateTravelOutCommand;
import com.ssafy.moyeobang.travel.application.port.out.UpdateTravelPort;
import com.ssafy.moyeobang.travel.application.port.out.UploadImagePort;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class UpdateTravelService implements UpdateTravelUseCase {

    private final UploadImagePort uploadImagePort;
    private final UpdateTravelPort updateTravelPort;

    @Override
    public boolean updateTravel(UpdateTravelInCommand inCommand) {
        String imageUrl = uploadImagePort.uploadImage(inCommand.backgroundImage());

        UpdateTravelOutCommand outCommand = new UpdateTravelOutCommand(
                inCommand.travelId(),
                inCommand.title(),
                inCommand.startDate(),
                inCommand.endDate(),
                inCommand.travelPlaces(),
                inCommand.quizQuestion(),
                inCommand.quizAnswer(),
                imageUrl
        );

        return updateTravelPort.updateTravel(outCommand);
    }
}
