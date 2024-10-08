package com.ssafy.moyeobang.travel.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.travel.adapter.in.web.response.GetTravelsResponse;
import com.ssafy.moyeobang.travel.application.port.in.GetTravelsQuery;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class GetTravelsController {

    private final GetTravelsQuery getTravelsQuery;

    @GetMapping("/api/travels")
    public ApiResult<List<GetTravelsResponse>> getTravels(@RequestParam Long memberId) {
        return success(getTravelsQuery.getTravels(memberId));
    }
}
