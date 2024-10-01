package com.ssafy.moyeobang.account.adapter.in.event;

import com.ssafy.moyeobang.account.application.port.in.CreateAccountUseCase;
import com.ssafy.moyeobang.travel.adapter.out.event.CreateTravelEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CreateTravelEventHandler {

    private final CreateAccountUseCase createAccountUseCase;

    @Async
    @EventListener
    public void createAccount(CreateTravelEvent event) {
        createAccountUseCase.createAccount(event.travelId());
    }
}
