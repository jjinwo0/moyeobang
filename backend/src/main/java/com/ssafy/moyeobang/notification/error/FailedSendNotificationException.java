package com.ssafy.moyeobang.notification.error;

public class FailedSendNotificationException extends RuntimeException{

    public FailedSendNotificationException(String message) {

        super(message);
        System.out.println(message);
    }
}
