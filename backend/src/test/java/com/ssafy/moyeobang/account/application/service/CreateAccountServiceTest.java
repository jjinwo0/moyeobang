package com.ssafy.moyeobang.account.application.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

import autoparams.AutoSource;
import com.ssafy.moyeobang.account.application.port.in.CreateAccountUseCase;
import com.ssafy.moyeobang.account.application.port.out.CreateAccountPort;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.springframework.transaction.annotation.Transactional;

@Transactional
class CreateAccountServiceTest {

    private final CreateAccountPort createAccountPort = mock(CreateAccountPort.class);

    private final CreateAccountUseCase createAccountUseCase = new CreateAccountService(createAccountPort);

    @DisplayName("사용자 정보를 이용하여 계좌를 생성한다.")
    @ParameterizedTest
    @AutoSource
    void createAccount(Long accountId) {
        //given
        given(createAccountPort.createAccount(any(Long.class)))
                .willReturn(accountId);

        //when
        Long createdAccountId = createAccountUseCase.createAccount(1L);

        //then
        assertThat(createdAccountId).isEqualTo(accountId);
    }
}