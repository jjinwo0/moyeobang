//package com.ssafy.moyeobang.notification.adapter.in.web;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.mockito.Mockito.verify;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//import com.ssafy.moyeobang.notification.adapter.in.web.request.NotificationPayload;
//import com.ssafy.moyeobang.notification.application.port.in.NotificationUseCase;
//import com.ssafy.moyeobang.support.WebAdapterTestSupport;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.mockito.ArgumentCaptor;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.springframework.http.MediaType;
//
//class NotificationControllerTest extends WebAdapterTestSupport {
//
//    @Mock
//    private NotificationUseCase notificationUseCase;
//
//    @InjectMocks
//    private NotificationController notificationController;
//
//    @Test
//    @DisplayName("여행에 참여하고 있는 참여자들에게 개별적으로 알림을 보낼 수 있다.")
//    void 여행_참여자_개별_알림() throws Exception {
//
//        Long travelId = 1L;
//        NotificationPayload payload = new NotificationPayload("[모여방] 공금 입금 요청", 10000);
//
//        mockMvc.perform(
//                post("/api/travel/accounts/deposit/request/{travelId}", travelId)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content("{\"title\" : \"[모여방] 공금 입금 요청\", \"amount\" :  10000}")
//        ).andExpect(status().isOk());
//
//        ArgumentCaptor<Long> travelCaptor = ArgumentCaptor.forClass(Long.class);
//        ArgumentCaptor<NotificationPayload> payloadCaptor = ArgumentCaptor.forClass(NotificationPayload.class);
//
//        verify(notificationUseCase).sendNotification(travelCaptor.capture(), payloadCaptor.capture());
//
//        assertThat(travelId).isEqualTo(travelCaptor.getValue());
//        assertThat(payload.title()).isEqualTo(payloadCaptor.getValue().title());
//        assertThat(payload.amount()).isEqualTo(payloadCaptor.getValue().amount());
//    }
//}