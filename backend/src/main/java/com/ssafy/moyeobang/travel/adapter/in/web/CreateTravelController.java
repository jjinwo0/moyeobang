package com.ssafy.moyeobang.travel.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.travel.adapter.in.web.request.CreateTravelRequest;
import com.ssafy.moyeobang.travel.adapter.in.web.response.CreateTravelResponse;
import com.ssafy.moyeobang.travel.application.port.in.CreateTravelInCommand;
import com.ssafy.moyeobang.travel.application.port.in.CreateTravelUseCase;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class CreateTravelController {

    private final CreateTravelUseCase createTravelUseCase;

    @PostMapping("/api/travels")
    public ApiResult<CreateTravelResponse> createTravel(@RequestParam Long memberId,
                                                        @RequestPart CreateTravelRequest request,
                                                        @RequestPart(required = false) MultipartFile backgroundImage) throws IOException {
        CreateTravelInCommand command = new CreateTravelInCommand(
                memberId,
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

        return success(createTravelUseCase.createTravel(command));
    }
}
