package com.ssafy.van.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.van.domain.ApiResult;
import com.ssafy.van.domain.PaymentRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Controller
@RequestMapping("/van/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @PostMapping("/process")
    public ResponseEntity<ApiResult> processPayment(@RequestBody PaymentRequest paymentRequest) {
        String mainServiceUrl = "http://localhost:8080/api/payment/confirm";
        log.info("Payment request: {}", paymentRequest);
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(mainServiceUrl, paymentRequest, String.class);
            ApiResult responseData = objectMapper.readValue(response.getBody(), ApiResult.class);
            ApiResult apiResult = new ApiResult("SUCCESS", responseData, null);
            return ResponseEntity.ok(apiResult);
        } catch (Exception e) {
            ApiResult errorResponse = new ApiResult("ERROR", null, "Payment failed.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
