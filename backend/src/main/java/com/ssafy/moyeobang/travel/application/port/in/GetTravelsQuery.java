package com.ssafy.moyeobang.travel.application.port.in;

import com.ssafy.moyeobang.travel.adapter.in.web.response.GetTravelsResponse;
import java.util.List;

public interface GetTravelsQuery {

    List<GetTravelsResponse> getTravels(Long memberId);
}
