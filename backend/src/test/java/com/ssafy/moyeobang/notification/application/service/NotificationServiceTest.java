package com.ssafy.moyeobang.notification.application.service;

import static org.mockito.Mockito.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.Message;
import com.ssafy.moyeobang.notification.adapter.in.web.request.NotificationPayload;
import com.ssafy.moyeobang.notification.application.domain.Member;
import com.ssafy.moyeobang.notification.application.domain.MemberTravel;
import com.ssafy.moyeobang.notification.application.port.out.FCMTokenPort;
import com.ssafy.moyeobang.notification.application.port.out.LoadMemberPort;
import com.ssafy.moyeobang.notification.application.port.out.LoadMemberTravelInfoInTravelPort;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.ClassPathResource;

@ExtendWith(MockitoExtension.class)
class NotificationServiceTest {

    @Mock
    private FCMTokenPort fcmTokenPort;

    @Mock
    private LoadMemberTravelInfoInTravelPort memberTravelPort;

    @Mock
    private LoadMemberPort memberPort;

    @Mock
    private NotificationSender sender;

    @InjectMocks
    private NotificationService notificationService;

    @Captor
    private ArgumentCaptor<Message> messageCaptor;

    // Test 환경을 위한 Firebase 초기화
    @BeforeAll
    static void setUp() throws IOException {
        InputStream serviceAccount = new ClassPathResource(
                "firebase/moyeobang-d1dec-firebase-adminsdk-6uakm-bf0a8d2044.json").getInputStream();

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }
    }

    @Test
    @DisplayName("특정 여행에 참가 중인 참여자들에게 공금 입금 요청 알림")
    void 알림_보내기() {

        // given
        NotificationPayload payload = new NotificationPayload("입금 요청", 5000);

        Member member1 = Member.of(1L, "test1@ssafy.com", "testToken1", "memberKey1");
        Member member2 = Member.of(2L, "test2@ssafy.com", "testToken2", "memberKey2");

        when(memberTravelPort.findMemberIdByMemberTravelEntity(any()))
                .thenReturn(List.of(member1, member2));
        when(fcmTokenPort.getToken("test1@ssafy.com")).thenReturn("testToken1");
        when(fcmTokenPort.getToken("test2@ssafy.com")).thenReturn("testToken2");
        when(fcmTokenPort.hasKey("test1@ssafy.com")).thenReturn(true);
        when(fcmTokenPort.hasKey("test2@ssafy.com")).thenReturn(true);

        // when
        notificationService.sendNotification(1L, payload);

        // then
        verify(fcmTokenPort, times(1)).getToken("test1@ssafy.com");
        verify(fcmTokenPort, times(1)).getToken("test2@ssafy.com");
        verify(fcmTokenPort, times(2)).hasKey(any(String.class));

        // send 메서드가 호출된 횟수 확인
        // notificationService는 InjectionMock인 실제 객체이므로 verify 활용 불가 -> 분기처리
        verify(sender, times(2)).send(any(Message.class));
    }

//    @Test
//    @DisplayName("알림 전송 실패 케이스 테스트")
//    void 알림_전송_실패() {
//
//        // given
//        NotificationPayload payload = new NotificationPayload("입금 요청", 5000);
//
//        Member member1 = Member.of(1L, "test1@ssafy.com", "testToken1");
//        Member member2 = Member.of(2L, "test2@ssafy.com", "testToken2");
//
//        when(memberTravelPort.findMemberIdByMemberTravelEntity(any()))
//                .thenReturn(List.of(member1, member2));
//        when(fcmTokenPort.getToken("test1@ssafy.com")).thenReturn("testToken1");
//        when(fcmTokenPort.getToken("test2@ssafy.com")).thenReturn("testToken2");
//        when(fcmTokenPort.hasKey("test1@ssafy.com")).thenReturn(true);
//        when(fcmTokenPort.hasKey("test2@ssafy.com")).thenReturn(true);
//
//        doThrow(FirebaseMessagingException.class)
//                .when(sender).send(any(Message.class));
//
//        // when
//        assertThrows(FirebaseMessagingException.class, () ->
//                notificationService.sendNotification(1L, payload));
//
//        verify(sender, times(2)).send(any(Message.class));
//    }

    @Test
    @DisplayName("각 여행에 참여중인 모든 인원들에게 잔액 알림 전송")
    void 잔액_알림_전송() {

        // given
        Member member1 = Member.of(10L, "test1@ssafy.com", "testToken1", "memberKey1");
        Member member2 = Member.of(20L, "test2@ssafy.com", "testToken2", "memberKey2");
        Member member3 = Member.of(30L, "test3@ssafy.com", "testToken3", "memberKey3");
        Member member4 = Member.of(40L, "test4@ssafy.com", "testToken4", "memberKey4");

        MemberTravel memberTravel1 = MemberTravel.of(1L, 100L, 10L, 50000);
        MemberTravel memberTravel2 = MemberTravel.of(1L, 100L, 20L, 50000);
        MemberTravel memberTravel3 = MemberTravel.of(2L, 200L, 30L, 20000);
        MemberTravel memberTravel4 = MemberTravel.of(2L, 200L, 40L, 20000);

        when(memberTravelPort.findAllMemberInTravel()).thenReturn(
                Map.of(
                        1L, List.of(memberTravel1, memberTravel2),
                        2L, List.of(memberTravel3, memberTravel4)
                )
        );

        when(memberPort.findById(10L)).thenReturn(member1);
        when(memberPort.findById(20L)).thenReturn(member2);
        when(memberPort.findById(30L)).thenReturn(member3);
        when(memberPort.findById(40L)).thenReturn(member4);

        when(fcmTokenPort.getToken("test1@ssafy.com")).thenReturn("testToken1");
        when(fcmTokenPort.getToken("test2@ssafy.com")).thenReturn("testToken2");
        when(fcmTokenPort.getToken("test3@ssafy.com")).thenReturn("testToken3");
        when(fcmTokenPort.getToken("test4@ssafy.com")).thenReturn("testToken4");

        // when
        notificationService.sendBalanceCheckNotification();

        // then
        verify(memberTravelPort, times(1)).findAllMemberInTravel();
        verify(memberPort, times(1)).findById(10L);
        verify(memberPort, times(1)).findById(20L);
        verify(memberPort, times(1)).findById(30L);
        verify(memberPort, times(1)).findById(40L);

        verify(fcmTokenPort, times(1)).getToken("test1@ssafy.com");
        verify(fcmTokenPort, times(1)).getToken("test2@ssafy.com");
        verify(fcmTokenPort, times(1)).getToken("test3@ssafy.com");
        verify(fcmTokenPort, times(1)).getToken("test4@ssafy.com");

        verify(sender, times(1)).sendAll(any(List.class));
    }
}