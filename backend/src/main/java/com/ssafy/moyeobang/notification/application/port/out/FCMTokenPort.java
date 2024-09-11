package com.ssafy.moyeobang.notification.application.port.out;

public interface FCMTokenPort {

    String getToken(String email);

    boolean hasKey(String email);
}
