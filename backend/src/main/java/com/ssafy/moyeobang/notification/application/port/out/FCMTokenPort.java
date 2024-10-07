package com.ssafy.moyeobang.notification.application.port.out;

public interface FCMTokenPort {

    String getToken(String email);

    boolean hasKey(String email);

    void saveFCMToken(Long id, String token);
}
