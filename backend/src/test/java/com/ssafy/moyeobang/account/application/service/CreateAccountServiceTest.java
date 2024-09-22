package com.ssafy.moyeobang.account.application.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

import com.ssafy.moyeobang.account.adapter.in.web.response.CreateAccountResponse;
import com.ssafy.moyeobang.account.application.domain.Member;
import com.ssafy.moyeobang.account.application.port.in.CreateAccountUseCase;
import com.ssafy.moyeobang.account.application.port.out.CreateAccountPort;
import com.ssafy.moyeobang.account.application.port.out.LoadMemberPort;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.transaction.annotation.Transactional;

@Transactional
class CreateAccountServiceTest {

    private final LoadMemberPort loadMemberPort = mock(LoadMemberPort.class);
    private final CreateAccountPort createAccountPort = mock(CreateAccountPort.class);

    private final CreateAccountUseCase createAccountUseCase = new CreateAccountService(loadMemberPort, createAccountPort);

    @DisplayName("사용자 정보를 이용하여 계좌를 생성한다.")
    @Test
    void createAccount() {
        //given
        given(loadMemberPort.loadMember(any(Long.class)))
                .willReturn(
                        new Member(
                                1L,
                                "김두열",
                                "https://profile-image.url",
                                "eea1652c-b5f3-4ef3-9aba-5360026f03b0",
                                "0016174648358792")
                );

        given(createAccountPort.createAccount(any(Long.class)))
                .willReturn("0016174648358792");

        //when
        CreateAccountResponse response = createAccountUseCase.createAccount(1L);

        //then
        assertThat(response.accountNumber()).isEqualTo("0016174648358792");
    }
}