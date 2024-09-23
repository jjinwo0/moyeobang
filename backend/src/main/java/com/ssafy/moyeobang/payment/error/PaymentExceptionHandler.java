package com.ssafy.moyeobang.payment.error;

import com.ssafy.moyeobang.common.util.ApiUtils;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@RequiredArgsConstructor
public class PaymentExceptionHandler {

    private ResponseEntity<ApiResult<?>> newResponse(Throwable throwable, HttpStatus status) {
        return newResponse(throwable.getMessage(), status);
    }

    private ResponseEntity<ApiResult<?>> newResponse(String message, HttpStatus status) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        return new ResponseEntity<>(ApiUtils.error(message, status), headers, status);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGenericException(Exception e) {
        return newResponse(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(PaymentException.class)
    public ResponseEntity<ApiResult<?>> handleBusinessException(PaymentException ex) {
        ErrorCode errorCode = ex.getErrorCode();
        return newResponse(errorCode.getMessage(), errorCode.getStatus());
    }
}
