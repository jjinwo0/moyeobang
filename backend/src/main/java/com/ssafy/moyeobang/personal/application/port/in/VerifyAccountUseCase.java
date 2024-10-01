package com.ssafy.moyeobang.personal.application.port.in;

public interface VerifyAccountUseCase {

    Long verifyAccount(String token, String accountNumber, String bankName);
}
