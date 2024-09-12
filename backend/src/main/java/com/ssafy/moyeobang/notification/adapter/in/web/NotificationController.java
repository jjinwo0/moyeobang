package com.ssafy.moyeobang.notification.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.notification.adapter.in.web.request.NotificationPayload;
import com.ssafy.moyeobang.notification.application.port.in.NotificationUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@WebAdapter
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationUseCase notificationUseCase;

    @PostMapping("/api/travel/accounts/deposit/request/{travelId}")
    public ApiResult<?> notification(@PathVariable("travelId") Long travelId,
                                     @RequestBody NotificationPayload payload) {

        notificationUseCase.sendNotification(travelId, payload);
        return success(true);
    }
}
