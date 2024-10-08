package com.ssafy.moyeobang.docs;

import static java.time.LocalDateTime.now;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetTransactionHistoriesResponse;
import com.ssafy.moyeobang.account.adapter.in.web.response.ParticipantInfo;
import java.util.List;
import java.util.Set;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.restdocs.payload.JsonFieldType;

public class GetTransactionHistoriesControllerDocsTest extends RestDocsSupport {

    @DisplayName("결제 내역 전체 조회 API")
    @Test
    void getTransactionHistories() throws Exception {
        GetTransactionHistoriesResponse response1 = new GetTransactionHistoriesResponse(
                1L,
                "스타벅스",
                30000L,
                Set.of(
                        new ParticipantInfo(1L, "김두열", "https://profile-image.url")
                ),
                "출금",
                70000L,
                now()
        );

        GetTransactionHistoriesResponse response2 = new GetTransactionHistoriesResponse(
                1L,
                "다복식당",
                50000L,
                Set.of(
                        new ParticipantInfo(1L, "김두열", "https://profile-image.url"),
                        new ParticipantInfo(2L, "김훈민", "https://profile-image.url"),
                        new ParticipantInfo(3L, "박진우", "https://profile-image.url")
                ),
                "출금",
                20000L,
                now()
        );

        given(getTransactionHistoriesQuery.getTransactionHistories(any(Long.class), any(Set.class)))
                .willReturn(List.of(response1, response2));

        mockMvc.perform(
                        get("/api/accounts/{accountId}/transactions", 1L)
                                .queryParam("memberIds", "1,2,3")
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("get-transaction-histories",
                                preprocessResponse(prettyPrint()),
                                queryParameters(
                                        parameterWithName("memberIds").description("멤버 id 리스트")
                                ),
                                responseFields(
                                        fieldWithPath("status").type(JsonFieldType.STRING)
                                                .description("API 성공 여부"),
                                        fieldWithPath("data").type(JsonFieldType.ARRAY)
                                                .description("응답"),
                                        fieldWithPath("data[].transactionId").type(JsonFieldType.NUMBER)
                                                .description("계좌 이체 내역 id"),
                                        fieldWithPath("data[].paymentName").type(JsonFieldType.STRING)
                                                .description("이체 제목"),
                                        fieldWithPath("data[].money").type(JsonFieldType.NUMBER)
                                                .description("이체 금액"),
                                        fieldWithPath("data[].participants").type(JsonFieldType.ARRAY)
                                                .description("정산 참여자 정보"),
                                        fieldWithPath("data[].participants[].memberId").type(JsonFieldType.NUMBER)
                                                .description("사용자 id"),
                                        fieldWithPath("data[].participants[].memberName").type(JsonFieldType.STRING)
                                                .description("사용자 이름"),
                                        fieldWithPath("data[].participants[].profileImage").type(JsonFieldType.STRING)
                                                .description("사용자 프로필 이미지 url"),
                                        fieldWithPath("data[].transactionType").type(JsonFieldType.STRING)
                                                .description("이체 타입"),
                                        fieldWithPath("data[].createdAt").type(JsonFieldType.STRING)
                                                .description("이체 날짜"),
                                        fieldWithPath("data[].currentBalance").type(JsonFieldType.NUMBER)
                                                .description("잔액 스냅샷"),
                                        fieldWithPath("error").type(JsonFieldType.NULL)
                                                .description("에러")
                                )
                        )
                );
    }

}
