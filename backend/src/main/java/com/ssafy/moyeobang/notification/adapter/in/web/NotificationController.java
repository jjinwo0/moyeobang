package com.ssafy.moyeobang.notification.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.notification.adapter.in.web.request.NotificationPayload;
import com.ssafy.moyeobang.notification.application.port.in.NotificationUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationUseCase notificationUseCase;

    @PostMapping("/api/travel/accounts/deposit/request")
    public ApiResult<?> notification(@RequestBody NotificationPayload payload) {

        notificationUseCase.sendNotification(payload);
        return success(true);
    }
}
