package com.ssafy.moyeobang.settle.adapter.in.web;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.moyeobang.settle.adapter.in.web.request.OrderRequest;
import com.ssafy.moyeobang.settle.adapter.in.web.request.SettleRequest;
import com.ssafy.moyeobang.settle.application.port.in.SettleCommand;
import com.ssafy.moyeobang.settle.application.port.in.SettleUseCase;
import com.ssafy.moyeobang.support.WebAdapterTestSupport;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

class SettleControllerTest extends WebAdapterTestSupport {

    @MockBean
    private SettleUseCase settleUseCase;

    private SettleRequest request;

    @BeforeEach
    void setup() {

        request = new SettleRequest(
                20000,
                "2024-02-01JAWFE",
                "스타벅스",
                "서울특별시 구로구 중앙로 1길 10",
                "123456789",
                List.of(
                        new OrderRequest(
                                "testOrder1",
                                1L,
                                3,
                                12000,
                                List.of(1L, 2L, 3L)
                        ),
                        new OrderRequest(
                                "testOrder2",
                                2L,
                                4,
                                8000,
                                List.of(1L, 2L, 3L, 4L)
                        )
                ),
                "testMethod"
        );
    }

    @Test
    @DisplayName("정산 요청 성공 시 동작 테스트")
    void 정산_요청_성공() throws Exception {

        when(settleUseCase.balanceSettle(any(SettleCommand.class))).thenReturn(true);

        mockMvc.perform(post("/api/travel/accounts/transactions/{transactionId}/settle/{travelId}",
                        1L,
                        100L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("요청 값을 누락한 상황 예외 처리 테스트")
    void 요청_데이터_누락() throws Exception {

        request = new SettleRequest(0, null, null, null, null, null, null);

        mockMvc.perform(post("/api/travel/accounts/transactions/{transactionId}/settle/{travelId}",
                        1L,
                        100L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isInternalServerError());
    }
}