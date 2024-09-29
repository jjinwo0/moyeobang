package com.ssafy.moyeobang.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.partWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParts;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.moyeobang.travel.adapter.in.web.request.UpdateTravelRequest;
import com.ssafy.moyeobang.travel.application.port.in.UpdateTravelInCommand;
import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.mock.web.MockPart;
import org.springframework.restdocs.payload.JsonFieldType;

public class UpdateTravelControllerDocsTest extends RestDocsSupport {

    @DisplayName("여행 수정 API")
    @Test
    void updateTravel() throws Exception {
        UpdateTravelRequest request = new UpdateTravelRequest(
                "즐거운 제주도 여행",
                LocalDate.now(),
                LocalDate.now().plusDays(1),
                List.of("제주도 서귀포", "부산"),
                "김훈민의 발 사이즈는?",
                "235"
        );

        given(updateTravelUseCase.updateTravel(any(UpdateTravelInCommand.class)))
                .willReturn(true);

        mockMvc.perform(
                        multipart("/api/travels/{travelId}", "1")
                                .part(new MockPart("request", "request", objectMapper.writeValueAsBytes(request), MediaType.APPLICATION_JSON))
                                .file(new MockMultipartFile("backgroundImage", "backgroundImage".getBytes()))
                                .with(mockRequest -> {
                                    mockRequest.setMethod("PUT");
                                    return mockRequest;
                                })
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("update-travel",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestParts(
                                        partWithName("request").description("여행 정보"),
                                        partWithName("backgroundImage").description("배경 이미지")
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
