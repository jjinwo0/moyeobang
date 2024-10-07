package com.ssafy.moyeobang.notification.error;

public class EntityNotFoundException extends RuntimeException{

    public EntityNotFoundException(String message) {

        System.out.println(message);
    }
}
