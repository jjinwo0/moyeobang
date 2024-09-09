package com.ssafy.moyeobang.notification.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.notification.adapter.in.web.request.NotificationPayload;
import com.ssafy.moyeobang.notification.application.service.FCMService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class NotificationController {

    private final FCMService fcmService;

    @PostMapping("/api/travel/accounts/deposit/request")
    public ApiResult<?> notification(@RequestBody NotificationPayload payload) {

        fcmService.sendNotification(payload);
        return success(true);
    }
}
