package com.ssafy.moyeobang.account.adapter.in.web;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.moyeobang.account.adapter.in.web.request.CreateAccountRequest;
import com.ssafy.moyeobang.account.adapter.in.web.response.CreateAccountResponse;
import com.ssafy.moyeobang.account.application.port.in.CreateAccountUseCase;
import com.ssafy.moyeobang.support.WebAdapterTestSupport;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;

class CreateAccountControllerTest extends WebAdapterTestSupport {

    @MockBean
    private CreateAccountUseCase createAccountUseCase;

    @DisplayName("계좌 생성 API를 호출하면 계좌를 생성하고 계좌 번호를 응답한다.")
    @Test
    void createAccount() throws Exception {
        CreateAccountRequest request = new CreateAccountRequest(1L);
        CreateAccountResponse response = new CreateAccountResponse("0016174648358792");

        given(createAccountUseCase.createAccount(any(Long.class)))
                .willReturn(response);

        mockMvc.perform(
                        post("/api/accounts")
                                .content(objectMapper.writeValueAsString(request))
                                .contentType(APPLICATION_JSON)
                )
                .andExpect(status().isOk());
    }
}