package com.ssafy.moyeobang.schedule.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.schedule.adapter.in.web.request.CreateTravelScheduleRequest;
import com.ssafy.moyeobang.schedule.application.port.in.CreateTravelScheduleCommand;
import com.ssafy.moyeobang.schedule.application.port.in.CreateTravelScheduleUseCase;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@WebAdapter
@RestController
@RequestMapping("/api/travel")
@RequiredArgsConstructor
public class CreateTravelScheduleController {

    private final CreateTravelScheduleUseCase createTravelScheduleUseCase;

    @PostMapping("/{travelId}/schedule")
    public ApiResult<Boolean> createTravelSchedule(@PathVariable long travelId,
                                                   @RequestPart("data") CreateTravelScheduleRequest createTravelScheduleRequest,
                                                   @RequestPart(value = "image", required = false) MultipartFile scheduleImage)
            throws IOException {

        CreateTravelScheduleCommand command = createTravelScheduleRequest.toCommand(travelId, scheduleImage);
        createTravelScheduleUseCase.createTravelSchedule(command);
        return success(true);
    }
}
