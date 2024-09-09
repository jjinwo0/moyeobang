package com.ssafy.moyeobang.notification.application.port.out;

public interface FCMTokenPort {

    void saveToken(String email, String token);

    String getToken(String email);

    void deleteToken(String email);

    boolean hasKey(String email);
}
