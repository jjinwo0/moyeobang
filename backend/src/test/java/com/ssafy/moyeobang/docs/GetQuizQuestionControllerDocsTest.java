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

import com.ssafy.moyeobang.travel.adapter.in.web.response.GetQuizQuestionResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.restdocs.payload.JsonFieldType;

public class GetQuizQuestionControllerDocsTest extends RestDocsSupport {

    @DisplayName("여행 참가 퀴즈 조회 API")
    @Test
    void getQuizQuestion() throws Exception {
        GetQuizQuestionResponse response = new GetQuizQuestionResponse(
                "즐거운 제주도 여행",
                "김훈민의 발 사이즈는?"
        );

        given(getQuizQuestionQuery.getQuizQuestion(any(Long.class)))
                .willReturn(response);

        mockMvc.perform(
                        get("/api/travels/{travelsId}/quiz", "1")
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("get-travel-quiz-question",
                                preprocessResponse(prettyPrint()),
                                responseFields(
                                        fieldWithPath("status").type(JsonFieldType.STRING)
                                                .description("API 성공 여부"),
                                        fieldWithPath("data").type(JsonFieldType.OBJECT)
                                                .description("응답"),
                                        fieldWithPath("data.travelName").type(JsonFieldType.STRING)
                                                .description("여행 이름"),
                                        fieldWithPath("data.question").type(JsonFieldType.STRING)
                                                .description("퀴즈 질문"),
                                        fieldWithPath("error").type(JsonFieldType.NULL)
                                                .description("에러")
                                )
                        )
                );
    }
}
