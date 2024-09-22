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
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetTransactionHistoryResponse;
import com.ssafy.moyeobang.account.application.domain.Member;
import com.ssafy.moyeobang.account.application.domain.Money;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Settle;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Settles;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Withdrawal;
import com.ssafy.moyeobang.account.application.port.in.GetTransactionHistoryQuery;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.payload.JsonFieldType;

public class GetTransactionHistoryControllerDocsTest extends RestDocsSupport {

    @MockBean
    private GetTransactionHistoryQuery getTransactionHistoryQuery;

    @DisplayName("결제 내역 상세 조회 API - 영수증")
    @Test
    void getReceiptTransactionHistory() throws Exception {
        GetTransactionHistoryResponse response = GetTransactionHistoryResponse.ofType(
                createWithdrawal1()
        );

        given(getTransactionHistoryQuery.getTransactionHistory(any(Long.class), any(Long.class)))
                .willReturn(response);

        mockMvc.perform(
                        get("/api/accounts/{accountId}/transactions/{transactionId}", 1L, 1L)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("get-transaction-history-receipt",
                                preprocessResponse(prettyPrint()),
                                responseFields(
                                        fieldWithPath("status").type(JsonFieldType.STRING)
                                                .description("API 성공 여부"),
                                        fieldWithPath("data").type(JsonFieldType.OBJECT)
                                                .description("응답"),
                                        fieldWithPath("data.transactionId").type(JsonFieldType.NUMBER)
                                                .description("결제 내역 id"),
                                        fieldWithPath("data.paymentName").type(JsonFieldType.STRING)
                                                .description("결제 내역 제목"),
                                        fieldWithPath("data.address").type(JsonFieldType.STRING)
                                                .description("결제 주소"),
                                        fieldWithPath("data.acceptedNumber").type(JsonFieldType.STRING)
                                                .description("결제 승인 번호"),
                                        fieldWithPath("data.details").type(JsonFieldType.ARRAY)
                                                .description("결제 상세 내용"),
                                        fieldWithPath("data.details[].orderItemId").type(JsonFieldType.NUMBER)
                                                .description("정산할 아이템 id"),
                                        fieldWithPath("data.details[].orderItemTitle").type(JsonFieldType.STRING)
                                                .description("정산할 아이템 제목"),
                                        fieldWithPath("data.details[].orderItemPrice").type(JsonFieldType.NUMBER)
                                                .description("정산할 아이템 가격"),
                                        fieldWithPath("data.details[].orderItemQuantity").type(JsonFieldType.NUMBER)
                                                .description("정산할 아이템 수량"),
                                        fieldWithPath("data.details[].participants").type(JsonFieldType.ARRAY)
                                                .description("정산 참가자"),
                                        fieldWithPath("data.details[].participants[].memberId").type(JsonFieldType.NUMBER)
                                                .description("정산 참가자 id"),
                                        fieldWithPath("data.details[].participants[].memberName").type(JsonFieldType.STRING)
                                                .description("정산 참가자 이름"),
                                        fieldWithPath("data.details[].participants[].profileImage").type(JsonFieldType.STRING)
                                                .description("정산 참가자 프로필 이미지"),
                                        fieldWithPath("data.totalPrice").type(JsonFieldType.NUMBER)
                                                .description("결제 총 금액"),
                                        fieldWithPath("data.splitMethod").type(JsonFieldType.STRING)
                                                .description("정산 방법"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING)
                                                .description("결제 날짜"),
                                        fieldWithPath("error").type(JsonFieldType.NULL)
                                                .description("에러")
                                )
                        )
                );
    }

    @DisplayName("결제 내역 상세 조회 API - 커스텀")
    @Test
    void getCustomTransactionHistory() throws Exception {
        GetTransactionHistoryResponse response = GetTransactionHistoryResponse.ofType(
                createWithdrawal2()
        );

        given(getTransactionHistoryQuery.getTransactionHistory(any(Long.class), any(Long.class)))
                .willReturn(response);

        mockMvc.perform(
                        get("/api/accounts/{accountId}/transactions/{transactionId}", 1L, 1L)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("get-transaction-history-custom",
                                preprocessResponse(prettyPrint()),
                                responseFields(
                                        fieldWithPath("status").type(JsonFieldType.STRING)
                                                .description("API 성공 여부"),
                                        fieldWithPath("data").type(JsonFieldType.OBJECT)
                                                .description("응답"),
                                        fieldWithPath("data.transactionId").type(JsonFieldType.NUMBER)
                                                .description("결제 내역 id"),
                                        fieldWithPath("data.paymentName").type(JsonFieldType.STRING)
                                                .description("결제 내역 제목"),
                                        fieldWithPath("data.address").type(JsonFieldType.STRING)
                                                .description("결제 주소"),
                                        fieldWithPath("data.acceptedNumber").type(JsonFieldType.STRING)
                                                .description("결제 승인 번호"),
                                        fieldWithPath("data.details").type(JsonFieldType.ARRAY)
                                                .description("결제 상세 내용"),
                                        fieldWithPath("data.details[].participant").type(JsonFieldType.OBJECT)
                                                .description("정산 참가자"),
                                        fieldWithPath("data.details[].participant.memberId").type(JsonFieldType.NUMBER)
                                                .description("정산 참가자 id"),
                                        fieldWithPath("data.details[].participant.memberName").type(JsonFieldType.STRING)
                                                .description("정산 참가자 이름"),
                                        fieldWithPath("data.details[].participant.profileImage").type(JsonFieldType.STRING)
                                                .description("정산 참가자 프로필 이미지"),
                                        fieldWithPath("data.details[].money").type(JsonFieldType.NUMBER)
                                                .description("참가자 별 정산 금액"),
                                        fieldWithPath("data.totalPrice").type(JsonFieldType.NUMBER)
                                                .description("결제 총 금액"),
                                        fieldWithPath("data.splitMethod").type(JsonFieldType.STRING)
                                                .description("정산 방법"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING)
                                                .description("결제 날짜"),
                                        fieldWithPath("error").type(JsonFieldType.NULL)
                                                .description("에러")
                                )
                        )
                );
    }

    private Withdrawal createWithdrawal1() {
        Settle settle = new Settle(
                1L,
                "김치찌개",
                Map.of(
                        createMember(1L, "김두열"), Money.of(20000),
                        createMember(2L, "김훈민"), Money.of(30000)
                )
        );

        return Withdrawal.builder()
                .transactionId(1L)
                .transactionAccountNumber("333")
                .timestamp(now())
                .money(Money.of(50000))
                .balanceSnapshot(Money.of(20000))
                .title("다복식당")
                .address("광주 광역시 수완동")
                .settleType("RECEIPT")
                .settles(new Settles(List.of(settle)))
                .build();
    }

    private Withdrawal createWithdrawal2() {
        Settle settle = new Settle(
                2L,
                "케잌",
                Map.of(
                        createMember(1L, "김두열"), Money.of(10000),
                        createMember(2L, "김훈민"), Money.of(10000),
                        createMember(3L, "박진우"), Money.of(10000)
                )
        );

        return Withdrawal.builder()
                .transactionId(2L)
                .transactionAccountNumber("222")
                .timestamp(now())
                .money(Money.of(30000))
                .balanceSnapshot(Money.of(70000))
                .title("스타벅스")
                .address("광주 광역시 수완동")
                .settleType("CUSTOM")
                .settles(new Settles(List.of(settle)))
                .build();
    }

    private Member createMember(Long id, String name) {
        return new Member(
                id,
                name,
                "https://profile-image.url",
                "eea1652c-b5f3-4ef3-9aba-5360026f03b0",
                "0016174648358792"
        );
    }
}
