package com.ssafy.moyeobang.travel.adapter.in.web;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.travel.adapter.in.web.in.CreateTravelRequest;
import com.ssafy.moyeobang.travel.adapter.in.web.out.CreateTravelResponse;
import com.ssafy.moyeobang.travel.application.port.in.CreateTravelCommand;
import com.ssafy.moyeobang.travel.application.port.in.CreateTravelUseCase;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class CreateTravelController {

    private final CreateTravelUseCase createTravelUseCase;

    @PostMapping("/api/travels")
    public CreateTravelResponse createTravel(@RequestPart CreateTravelRequest request,
                                             @RequestPart(required = false) MultipartFile backgroundImage) throws IOException {
        CreateTravelCommand command = new CreateTravelCommand(
                request.travelName(),
                request.startDate(),
                request.endDate(),
                request.travelPlaceList(),
                request.quizQuestion(),
                request.quizAnswer(),
                backgroundImage.getOriginalFilename(),
                backgroundImage.getContentType(),
                backgroundImage.getInputStream(),
                backgroundImage.getSize()
        );

        return createTravelUseCase.createTravel(command);
    }
}
