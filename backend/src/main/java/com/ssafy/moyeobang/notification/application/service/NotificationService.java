package com.ssafy.moyeobang.notification.application.service;

import com.ssafy.moyeobang.notification.adapter.in.web.request.NotificationPayload;

public interface NotificationService {

    void sendNotification(NotificationPayload payload);
}
