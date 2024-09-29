package com.ssafy.moyeobang.payment.adapter.out.server;

import com.ssafy.moyeobang.payment.adapter.out.server.request.PaymentConfirmRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Slf4j
@Component
@RequiredArgsConstructor
public class PgApiClientInPayment {

    public boolean confirmPayment(String baseUrl, String paymentRequestId, boolean isCompleted) {
        RestClient restClient = RestClient.builder()
                .baseUrl(baseUrl)
                .build();
        try {
            PaymentConfirmRequest request = new PaymentConfirmRequest(paymentRequestId,
                    isCompleted ? "SUCCESS" : "FAILED");

            restClient.post()
                    .uri("/confirm")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(request)
                    .retrieve()
                    .body(String.class);

            return true;
        } catch (Exception e) {
            log.debug(e.getMessage());
            return false;
        }
    }
}

