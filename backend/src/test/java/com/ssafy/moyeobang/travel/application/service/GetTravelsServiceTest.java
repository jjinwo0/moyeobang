package com.ssafy.moyeobang.travel.application.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.tuple;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

import autoparams.AutoSource;
import com.ssafy.moyeobang.travel.adapter.in.web.response.GetTravelsResponse;
import com.ssafy.moyeobang.travel.application.domain.Travel;
import com.ssafy.moyeobang.travel.application.port.out.LoadTravelPort;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;

class GetTravelsServiceTest {

    private final LoadTravelPort loadTravelPort = mock(LoadTravelPort.class);

    private final GetTravelsService getTravelsService = new GetTravelsService(loadTravelPort);

    @DisplayName("특정 회원이 소속되어 있는 여행 목록을 조회한다.")
    @ParameterizedTest
    @AutoSource
    void getTravels(Long memberId, Travel travel1, Travel travel2, Travel travel3) {
        //given
        given(loadTravelPort.loadTravelsBy(memberId))
                .willReturn(List.of(travel1, travel2, travel3));

        //when
        List<GetTravelsResponse> responses = getTravelsService.getTravels(memberId);

        //then
        assertThat(responses).extracting(
                "travelId", "travelName", "travelImg", "participantCount"
        ).containsExactlyInAnyOrder(
                tuple(travel1.id(), travel1.title(), travel1.backgroundImageUrl(), travel1.getParticipantCount()),
                tuple(travel2.id(), travel2.title(), travel2.backgroundImageUrl(), travel2.getParticipantCount()),
                tuple(travel3.id(), travel3.title(), travel3.backgroundImageUrl(), travel3.getParticipantCount())
        );
    }
}