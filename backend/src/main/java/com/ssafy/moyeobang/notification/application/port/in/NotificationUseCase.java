package com.ssafy.moyeobang.notification.application.port.in;

import com.ssafy.moyeobang.notification.adapter.in.web.request.NotificationPayload;

public interface NotificationUseCase {

    void sendNotification(Long travelId, NotificationPayload payload);
}
