package com.ssafy.moyeobang.notification.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.notification.adapter.in.web.request.FCMTokenRequest;
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

    /**
     * 회원 공금 입금 요구 API
     * todo: AccessToken 발급 시, memberId PathVariable 삭제
     *
     * @param travelId
     * @param memberId
     * @param payload
     * @return
     */
    @PostMapping("/api/travel/accounts/deposit/remind/{travelId}/{memberId}")
    public ApiResult<?> remind(@PathVariable("travelId") Long travelId,
                               @PathVariable("memberId") Long memberId,
                               @RequestBody NotificationPayload payload) {

        notificationUseCase.sendRemind(travelId, memberId, payload);
        return success(true);
    }

    @PostMapping("/api/notification/agree/{memberId}")
    public ApiResult<?> saveFCMToken(@PathVariable("memberId") Long memberId,
                                     @RequestBody FCMTokenRequest request) {

        notificationUseCase.saveToken(memberId, request.token());

        return success(true);
    }
}
