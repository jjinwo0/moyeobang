package com.ssafy.moyeobang.travel.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.travel.adapter.in.web.request.UpdateTravelRequest;
import com.ssafy.moyeobang.travel.application.port.in.UpdateTravelInCommand;
import com.ssafy.moyeobang.travel.application.port.in.UpdateTravelUseCase;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class UpdateTravelController {

    private final UpdateTravelUseCase updateTravelUseCase;

    @PutMapping("/api/travels/{travelId}")
    public ApiResult<Boolean> updateTravel(@PathVariable Long travelId,
                                           @RequestPart UpdateTravelRequest request,
                                           @RequestPart(required = false) MultipartFile backgroundImage) throws IOException {
        UpdateTravelInCommand command = new UpdateTravelInCommand(
                travelId,
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

        return success(updateTravelUseCase.updateTravel(command));
    }
}
