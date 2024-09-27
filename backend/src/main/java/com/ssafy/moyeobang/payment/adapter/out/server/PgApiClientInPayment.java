package com.ssafy.moyeobang.payment.adapter.out.server;

import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Slf4j
@Component
@RequiredArgsConstructor
public class PgApiClientInPayment {

    private final RestClient restClient;

    public PgApiClientInPayment() {
        this.restClient = RestClient.builder()
                .baseUrl("http://localhost:8082/pg/payment")
                .build();
    }

    public boolean confirmPayment(String paymentRequestId, boolean isCompleted) {
        try {
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("paymentRequestId", paymentRequestId);
            requestBody.put("status", isCompleted ? "SUCCESS" : "FAILED");

            restClient.post()
                    .uri("/confirm")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .body(String.class);

            return true;
        } catch (Exception e) {
            log.debug(e.getMessage());
            return false;
        }
    }
}

