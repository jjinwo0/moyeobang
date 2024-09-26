package com.ssafy.moyeobang.payment.adapter.out;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.payment.application.port.out.ConfirmPaymentPort;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

@PersistenceAdapter
@RequiredArgsConstructor
public class OnlinePaymentAdapter implements ConfirmPaymentPort {

    private final RestTemplate restTemplate;

    @Override
    public ApiResult<Boolean> confirmPayment(String paymentRequestId, boolean isCompleted) {
        String pgServerUrl = "http://localhost:8082/pg/payment/confirm";
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(mainServiceUrl, paymentRequest, String.class);
            ApiResult responseData = objectMapper.readValue(response.getBody(), ApiResult.class);
            ApiResult apiResult = new ApiResult("SUCCESS", responseData, null);
            return ResponseEntity.ok(apiResult);
        } catch (Exception e) {
            ApiResult errorResponse = new ApiResult("ERROR", null, "Payment failed.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
        return success(true);
    }
}
