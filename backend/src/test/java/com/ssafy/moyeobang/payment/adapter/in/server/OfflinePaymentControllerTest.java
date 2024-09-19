package com.ssafy.moyeobang.payment.adapter.in.server;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.moyeobang.common.util.SseUtils;
import com.ssafy.moyeobang.payment.adapter.in.server.request.OfflinePaymentRequest;
import com.ssafy.moyeobang.payment.adapter.in.server.request.OrderItemRequest;
import com.ssafy.moyeobang.payment.application.port.in.OfflinePaymentUseCase;
import com.ssafy.moyeobang.payment.application.port.in.PaymentCommand;
import com.ssafy.moyeobang.support.WebAdapterTestSupport;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;

public class OfflinePaymentControllerTest extends WebAdapterTestSupport {

    @MockBean
    private OfflinePaymentUseCase offlinePaymentUseCase;

    @MockBean
    private SseUtils sseUtils;


    @DisplayName("결제 확인 API를 호출하면 결제 성공 여부를 서버로 반환한다.")
    @Test
    void confirmPaymentToServer() throws Exception {
        // Given
        OfflinePaymentRequest request = new OfflinePaymentRequest(
                "payment-123",          // paymentRequestId
                "store-001",            // placeId
                "Sample Store",         // placeName
                "1234 Address",         // placeAddress
                37.7749,                // latitude
                -122.4194,              // longitude
                10000L,                 // amount
                "source-acc-001",       // sourceAccountNumber
                "target-acc-002",       // targetAccountNumber
                List.of(new OrderItemRequest("Item1", 5000), new OrderItemRequest("Item2", 5000)) // orderItems
        );

        given(offlinePaymentUseCase.confirmPayment(any(PaymentCommand.class)))
                .willReturn(true);

        mockMvc.perform(
                        post("/api/payment/confirm")
                                .content(objectMapper.writeValueAsString(request))
                                .contentType(APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"));
    }
}
