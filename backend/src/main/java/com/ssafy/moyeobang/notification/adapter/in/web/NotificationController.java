package com.ssafy.moyeobang.notification.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.notification.adapter.in.web.request.FCMTokenRequest;
import com.ssafy.moyeobang.notification.adapter.in.web.request.NotificationPayload;
import com.ssafy.moyeobang.notification.adapter.in.web.response.VerifyKey;
import com.ssafy.moyeobang.notification.application.port.in.NotificationUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Slf4j
@WebAdapter
@RestController
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

        log.info("saveFCMToken {}", memberId);
        notificationUseCase.saveToken(memberId, request.token());

        return success(true);
    }

    /**
     * 1원 송금 내역 알림 서비스
     *
     * @param travelId
     * @param transactionid
     * @return
     */
    @PostMapping("/api/notification/verify/{memberId}/{transactionid}")
    public ApiResult<VerifyKey> getVerifyKey(@PathVariable("memberId") Long memberId,
                                             @PathVariable("transactionid") Long transactionid) {

        String findKey = notificationUseCase.getTransactionInfo(memberId, transactionid);

        String[] response = findKey.split(" ");

        notificationUseCase.sendVerifyMessage(memberId, response[0], response[1]);

        return success(new VerifyKey(response[0], response[1]));
    }
}
