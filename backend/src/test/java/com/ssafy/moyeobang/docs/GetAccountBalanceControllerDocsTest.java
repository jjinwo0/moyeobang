package com.ssafy.moyeobang.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetAccountBalanceResponse;
import com.ssafy.moyeobang.account.application.port.in.GetAccountBalanceQuery;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.payload.JsonFieldType;

class GetAccountBalanceControllerDocsTest extends RestDocsSupport {

    @MockBean
    private GetAccountBalanceQuery getAccountBalanceQuery;

    @DisplayName("모임 통장 공금 잔액 조회 API")
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
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("get-account-balance",
                                preprocessResponse(prettyPrint()),
                                responseFields(
                                        fieldWithPath("status").type(JsonFieldType.STRING)
                                                .description("API 성공 여부"),
                                        fieldWithPath("data").type(JsonFieldType.OBJECT)
                                                .description("응답"),
                                        fieldWithPath("data.currentBalance").type(JsonFieldType.NUMBER)
                                                .description("현재 잔액"),
                                        fieldWithPath("data.totalAmount").type(JsonFieldType.NUMBER)
                                                .description("총 입금 금액"),
                                        fieldWithPath("data.totalSpent").type(JsonFieldType.NUMBER)
                                                .description("총 사용 금액"),
                                        fieldWithPath("data.usagePercentage").type(JsonFieldType.NUMBER)
                                                .description("사용 비율"),
                                        fieldWithPath("error").type(JsonFieldType.NULL)
                                                .description("에러")
                                )
                        )
                );
    }
}