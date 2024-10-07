package com.ssafy.moyeobang.travel.adapter.out.event;

import com.ssafy.moyeobang.common.annotation.EventPublisher;
import com.ssafy.moyeobang.travel.application.port.out.CreateTravelEventPublishPort;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;

@EventPublisher
@RequiredArgsConstructor
public class CreateTravelEventPublisher implements CreateTravelEventPublishPort {

    private final ApplicationEventPublisher eventPublisher;

    @Override
    public void publish(Long travelId) {
        eventPublisher.publishEvent(new CreateTravelEvent(travelId));
    }
}
