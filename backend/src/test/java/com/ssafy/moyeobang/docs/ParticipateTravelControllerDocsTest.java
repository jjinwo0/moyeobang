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

import com.ssafy.moyeobang.travel.adapter.in.web.request.ParticipateTravelRequest;
import com.ssafy.moyeobang.travel.application.port.in.ParticipateTravelCommand;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

public class ParticipateTravelControllerDocsTest extends RestDocsSupport {

    @DisplayName("여행 참여 API")
    @Test
    void participateTravel() throws Exception {
        ParticipateTravelRequest request = new ParticipateTravelRequest(1L);

        given(participateTravelUseCase.participateTravel(any(ParticipateTravelCommand.class)))
                .willReturn(true);

        mockMvc.perform(
                        post("/api/travels/{travelsId}/participate", "1")
                                .content(objectMapper.writeValueAsString(request))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("participate-travel",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestFields(
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER)
                                                .description("멤버 id")
                                ),
                                responseFields(
                                        fieldWithPath("status").type(JsonFieldType.STRING)
                                                .description("API 성공 여부"),
                                        fieldWithPath("data").type(JsonFieldType.BOOLEAN)
                                                .description("응답"),
                                        fieldWithPath("error").type(JsonFieldType.NULL)
                                                .description("에러")
                                )
                        )
                );
    }
}
