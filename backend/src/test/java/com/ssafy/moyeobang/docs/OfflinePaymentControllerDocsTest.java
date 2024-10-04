package com.ssafy.moyeobang.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.moyeobang.payment.adapter.in.server.request.OfflinePaymentRequest;
import com.ssafy.moyeobang.payment.application.port.in.PaymentCommand;
import com.ssafy.moyeobang.payment.application.port.in.PaymentUseCase;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

class OfflinePaymentControllerDocsTest extends RestDocsSupport {

    @MockBean
    private PaymentUseCase paymentUseCase;

    @DisplayName("오프라인 결제 확인 API")
    @Test
    void confirmPaymentTest() throws Exception {
        // Given
        OfflinePaymentRequest request = new OfflinePaymentRequest(
                "payment-123",
                "store-001",
                "Sample Store",
                "Sample Address",
                37.7749,
                -122.4194,
                10000L,
                "카페",
                "source-account-123",
                "store-acc-002"

        );
        given(paymentUseCase.confirmPayment(any(PaymentCommand.class)))
                .willReturn(true);

        // When & Then
        mockMvc.perform(post("/api/payment/confirm")
                        .content(objectMapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("payment-confirm",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("paymentRequestId").type(JsonFieldType.STRING)
                                        .description("결제 요청 ID"),
                                fieldWithPath("placeId").type(JsonFieldType.STRING)
                                        .description("가게 ID"),
                                fieldWithPath("placeName").type(JsonFieldType.STRING)
                                        .description("가게 이름"),
                                fieldWithPath("placeAddress").type(JsonFieldType.STRING)
                                        .description("가게 주소"),
                                fieldWithPath("latitude").type(JsonFieldType.NUMBER)
                                        .description("가게 위도"),
                                fieldWithPath("longitude").type(JsonFieldType.NUMBER)
                                        .description("가게 경도"),
                                fieldWithPath("amount").type(JsonFieldType.NUMBER)
                                        .description("결제 금액"),
                                fieldWithPath("tag").type(JsonFieldType.STRING)
                                        .description("결제 태그"),
                                fieldWithPath("sourceAccountNumber").type(JsonFieldType.STRING)
                                        .description("결제 출발 계좌 번호"),
                                fieldWithPath("targetAccountNumber").type(JsonFieldType.STRING)
                                        .description("결제 목적지 계좌 번호")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.STRING)
                                        .description("API 성공 여부"),
                                fieldWithPath("data").type(JsonFieldType.BOOLEAN)
                                        .description("결제 성공 여부"),
                                fieldWithPath("error").type(JsonFieldType.NULL)
                                        .description("에러가 발생하지 않으면 null")
                        )
                ));
    }
}

