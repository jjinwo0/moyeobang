package com.ssafy.moyeobang.docs;

import static java.time.LocalDate.now;
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

import com.ssafy.moyeobang.travel.adapter.in.web.response.GetTravelsResponse;
import com.ssafy.moyeobang.travel.adapter.in.web.response.ParticipantInfo;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.restdocs.payload.JsonFieldType;

public class GetTravelsControllerDocsTest extends RestDocsSupport {

    @DisplayName("여행 목록 조회 API")
    @Test
    void getTravels() throws Exception {
        GetTravelsResponse response1 = new GetTravelsResponse(
                1L,
                "즐거운 제주도 여행",
                "https://background-image1.png",
                3,
                now(),
                now().plusDays(1),
                List.of("제주도"),
                "김훈민의 발 사이즈는?",
                "235",
                1L,
                "123456789123",
                List.of(
                        new ParticipantInfo(1L, "김두열", "https://profile-image1.png"),
                        new ParticipantInfo(2L, "김훈민", "https://profile-image2.png"),
                        new ParticipantInfo(3L, "박진우", "https://profile-image3.png")
                )
        );

        GetTravelsResponse response2 = new GetTravelsResponse(
                2L,
                "즐거운 싸피 여행",
                "https://background-image2.png",
                4,
                now(),
                now().plusDays(1),
                List.of("서울", "대전", "광주", "구미", "부울경"),
                "김용수의 키는?",
                "155",
                2L,
                "456789123456",
                List.of(
                        new ParticipantInfo(1L, "김두열", "https://profile-image1.png"),
                        new ParticipantInfo(4L, "유지연", "https://profile-image4.png"),
                        new ParticipantInfo(5L, "강두홍", "https://profile-image5.png"),
                        new ParticipantInfo(6L, "전가현", "https://profile-image6.png")
                )
        );

        given(getTravelsQuery.getTravels(any(Long.class)))
                .willReturn(List.of(response1, response2));

        mockMvc.perform(
                        get("/api/travels")
                                .queryParam("memberId", "1")
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("get-travels",
                                preprocessResponse(prettyPrint()),
                                queryParameters(
                                        parameterWithName("memberId").description("멤버 id")
                                ),
                                responseFields(
                                        fieldWithPath("status").type(JsonFieldType.STRING)
                                                .description("API 성공 여부"),
                                        fieldWithPath("data").type(JsonFieldType.ARRAY)
                                                .description("응답"),
                                        fieldWithPath("data[].travelId").type(JsonFieldType.NUMBER)
                                                .description("여행 id"),
                                        fieldWithPath("data[].travelName").type(JsonFieldType.STRING)
                                                .description("여행 제목"),
                                        fieldWithPath("data[].travelImg").type(JsonFieldType.STRING)
                                                .description("여행 배경 사진 URL"),
                                        fieldWithPath("data[].participantCount").type(JsonFieldType.NUMBER)
                                                .description("참여자 수"),
                                        fieldWithPath("data[].startDate").type(JsonFieldType.STRING)
                                                .description("여행 시작 날짜"),
                                        fieldWithPath("data[].endDate").type(JsonFieldType.STRING)
                                                .description("여행 종료 날짜"),
                                        fieldWithPath("data[].travelPlaceList").type(JsonFieldType.ARRAY)
                                                .description("여행 도시 리스트"),
                                        fieldWithPath("data[].quizQuestion").type(JsonFieldType.STRING)
                                                .description("퀴즈 질문"),
                                        fieldWithPath("data[].quizAnswer").type(JsonFieldType.STRING)
                                                .description("퀴즈 정답"),
                                        fieldWithPath("data[].accountId").type(JsonFieldType.NUMBER)
                                                .description("모임 통장 id"),
                                        fieldWithPath("data[].accountNumber").type(JsonFieldType.STRING)
                                                .description("모임 통장 계좌 번호"),
                                        fieldWithPath("data[].participantsInfo").type(JsonFieldType.ARRAY)
                                                .description("참여자 정보"),
                                        fieldWithPath("data[].participantsInfo[].memberId").type(JsonFieldType.NUMBER)
                                                .description("참여자 id"),
                                        fieldWithPath("data[].participantsInfo[].memberName").type(JsonFieldType.STRING)
                                                .description("참여자 이름"),
                                        fieldWithPath("data[].participantsInfo[].profileImage").type(JsonFieldType.STRING)
                                                .description("참여자 프로필 사진 URL"),
                                        fieldWithPath("error").type(JsonFieldType.NULL)
                                                .description("에러")
                                )
                        )
                );
    }
}
