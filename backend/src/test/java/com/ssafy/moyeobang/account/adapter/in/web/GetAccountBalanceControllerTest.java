package com.ssafy.moyeobang.account.adapter.in.web;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetAccountBalanceResponse;
import com.ssafy.moyeobang.account.application.port.in.GetAccountBalanceQuery;
import com.ssafy.moyeobang.support.WebAdapterTestSupport;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;

class GetAccountBalanceControllerTest extends WebAdapterTestSupport {

    @MockBean
    private GetAccountBalanceQuery getAccountBalanceQuery;

    @DisplayName("모임 통장 공금 잔액 조회 API를 호출하면 계좌의 잔액과 현재 지출 상태를 응답한다.")
    @Test
    void getAccountBalance() throws Exception {
        GetAccountBalanceResponse response = new GetAccountBalanceResponse(
                300000L,
                500000L,
                200000L,
                40.0
        );

        given(getAccountBalanceQuery.getAccountBalance(any(String.class)))
                .willReturn(response);

        mockMvc.perform(
                        get("/api/accounts/{accountNumber}/balance", "0016174548358792")
                )
                .andExpect(status().isOk());
    }

}