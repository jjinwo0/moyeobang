package com.ssafy.moyeobang.settle.application.error;

public class OrderNotFoundException extends EntityNotFoundException{
    public OrderNotFoundException(String message) {
        super(message);
    }
}
