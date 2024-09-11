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

import com.ssafy.moyeobang.account.adapter.in.web.request.CreateAccountRequest;
import com.ssafy.moyeobang.account.adapter.in.web.response.CreateAccountResponse;
import com.ssafy.moyeobang.account.application.port.in.CreateAccountUseCase;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

class CreateAccountControllerDocsTest extends RestDocsSupport {

    @MockBean
    private CreateAccountUseCase createAccountUseCase;

    @DisplayName("여행 계좌 생성 API")
    @Test
    void createAccountTest() throws Exception {
        CreateAccountRequest request = new CreateAccountRequest(1L);
        CreateAccountResponse response = new CreateAccountResponse("0016174548358792");

        given(createAccountUseCase.createAccount(any(Long.class)))
                .willReturn(response);

        mockMvc.perform(
                        post("/api/accounts")
                                .content(objectMapper.writeValueAsString(request))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("create-account",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestFields(
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER)
                                                .description("유저 id")
                                ),
                                responseFields(
                                        fieldWithPath("status").type(JsonFieldType.STRING)
                                                .description("API 성공 여부"),
                                        fieldWithPath("data").type(JsonFieldType.OBJECT)
                                                .description("응답"),
                                        fieldWithPath("data.accountNumber").type(JsonFieldType.STRING)
                                                .description("계좌 번호"),
                                        fieldWithPath("error").type(JsonFieldType.NULL)
                                                .description("에러")
                                )
                        )
                );
    }
}
