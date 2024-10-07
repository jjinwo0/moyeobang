package com.ssafy.moyeobang.notification.error;

public class NotificationSendException extends RuntimeException {

    public NotificationSendException(String message) {

        super(message);
        System.out.println(message);
    }
}
