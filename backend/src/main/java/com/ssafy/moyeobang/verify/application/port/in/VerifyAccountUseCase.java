package com.ssafy.moyeobang.verify.application.port.in;

public interface VerifyAccountUseCase {

    Long verifyAccount(String token, String accountNumber, String bankName);

    String checkVerifyAccount(String token, String accountNumber, String authCode);
}
