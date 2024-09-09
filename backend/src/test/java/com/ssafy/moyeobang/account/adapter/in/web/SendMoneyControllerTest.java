package com.ssafy.moyeobang.account.adapter.in.web;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.moyeobang.account.adapter.in.web.request.SendMoneyRequest;
import com.ssafy.moyeobang.account.application.port.in.SendMoneyCommand;
import com.ssafy.moyeobang.account.application.port.in.SendMoneyUseCase;
import com.ssafy.moyeobang.support.WebAdapterTestSupport;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;

class SendMoneyControllerTest extends WebAdapterTestSupport {

    @MockBean
    private SendMoneyUseCase sendMoneyUseCase;

    @DisplayName("공금 입금 API를 호출하면 개인 계좌에서 모임 통장 계좌로 돈을 송금한다.")
    @Test
    void sendMoney() throws Exception {
        SendMoneyRequest request = new SendMoneyRequest(1L, 10000L);

        willDoNothing().given(sendMoneyUseCase).sendMoney(any(SendMoneyCommand.class));

        mockMvc.perform(
                        post("/api/accounts/{accountNumber}/send", "0016174648358792")
                                .content(objectMapper.writeValueAsString(request))
                                .contentType(APPLICATION_JSON)
                )
                .andExpect(status().isOk());
    }

}