package com.ssafy.moyeobang.payment.application.out;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.ssafy.moyeobang.payment.adapter.out.server.PgApiClientInPayment;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;

@ExtendWith(MockitoExtension.class)
public class PgApiClientInPaymentTest {

    @Mock
    private RestClient restClient;

    @Mock
    private RestClient.RequestSpec requestSpec;

    @Mock
    private RestClient.RequestSpec.UriSpec uriSpec;

    @Mock
    private RestClient.RequestSpec.BodySpec bodySpec;

    @Mock
    private RestClient.RequestSpec.RetrieveSpec retrieveSpec;

    @InjectMocks
    private PgApiClientInPayment pgApiClientInPayment;

    @Test
    public void testConfirmPayment() {
        // given
        String paymentRequestId = "test-id";
        boolean isCompleted = true;

        Map<String, Object> expectedRequestBody = new HashMap<>();
        expectedRequestBody.put("paymentRequestId", paymentRequestId);
        expectedRequestBody.put("status", "SUCCESS");

        // RestClient 메서드 체이닝 모킹 설정
        when(restClient.post()).thenReturn(requestSpec);
        when(requestSpec.uri("/confirm")).thenReturn(uriSpec);
        when(uriSpec.contentType(MediaType.APPLICATION_JSON)).thenReturn(bodySpec);
        when(bodySpec.body(expectedRequestBody)).thenReturn(retrieveSpec);
        when(retrieveSpec.retrieve()).thenReturn(retrieveSpec);
        when(retrieveSpec.body(String.class)).thenReturn("Success");

        // when
        boolean result = pgApiClientInPayment.confirmPayment(paymentRequestId, isCompleted);

        // then
        assertTrue(result);

        // RestClient 메서드 호출 검증
        verify(restClient).post();
        verify(requestSpec).uri("/confirm");
        verify(uriSpec).contentType(MediaType.APPLICATION_JSON);
        verify(bodySpec).body(expectedRequestBody);
        verify(retrieveSpec).retrieve();
        verify(retrieveSpec).body(String.class);
    }
}
