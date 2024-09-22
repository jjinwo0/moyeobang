package com.ssafy.moyeobang.account.application.port.in;

import com.ssafy.moyeobang.account.adapter.in.web.response.CreateAccountResponse;

public interface CreateAccountUseCase {

    CreateAccountResponse createAccount(Long travelId);
}
