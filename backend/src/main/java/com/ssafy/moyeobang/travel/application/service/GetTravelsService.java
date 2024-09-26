package com.ssafy.moyeobang.travel.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.travel.adapter.in.web.response.GetTravelsResponse;
import com.ssafy.moyeobang.travel.application.domain.Travel;
import com.ssafy.moyeobang.travel.application.port.in.GetTravelsQuery;
import com.ssafy.moyeobang.travel.application.port.out.LoadTravelPort;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GetTravelsService implements GetTravelsQuery {

    private final LoadTravelPort loadTravelPort;

    @Override
    public List<GetTravelsResponse> getTravels(Long memberId) {
        List<Travel> travels = loadTravelPort.loadTravelsBy(memberId);

        return travels.stream()
                .map(GetTravelsResponse::new)
                .toList();
    }
}
