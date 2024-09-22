package com.ssafy.moyeobang.integration;

import static com.ssafy.moyeobang.integration.RestClientUtils.post;
import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.databind.JsonNode;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.common.util.SseUtils;
import com.ssafy.moyeobang.payment.adapter.in.server.request.OfflinePaymentRequest;
import com.ssafy.moyeobang.payment.adapter.in.server.request.OrderItemRequest;
import com.ssafy.moyeobang.payment.adapter.out.bank.BankApiClientInPayment;
import com.ssafy.moyeobang.payment.adapter.out.persistence.member.MemberRepositoryInPayment;
import com.ssafy.moyeobang.payment.adapter.out.persistence.travel.TravelRepositoryInPayment;
import com.ssafy.moyeobang.payment.adapter.out.persistence.travelaccount.TravelAccountRepositoryInPayment;
import com.ssafy.moyeobang.payment.adapter.out.persistence.withdraw.WithdrawRepositoryInPayment;
import com.ssafy.moyeobang.support.IntegrationTestSupport;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;


public class OfflinePaymentIntegrationTest extends IntegrationTestSupport {

    private static final Logger log = LoggerFactory.getLogger(OfflinePaymentIntegrationTest.class);


    @LocalServerPort
    private int port;

    @Autowired
    private MemberRepositoryInPayment memberRepository;

    @Autowired
    private BankApiClientInPayment bankApiClientInPayment;

    @Autowired
    private SseUtils sseUtils;

    @Autowired
    private TravelRepositoryInPayment travelRepository;

    @Autowired
    private TravelAccountRepositoryInPayment travelAccountRepository;

    @Autowired
    private WithdrawRepositoryInPayment withdrawRepository;

    @AfterEach
    void tearDown() {
        withdrawRepository.deleteAllInBatch();
        travelAccountRepository.deleteAllInBatch();
        travelRepository.deleteAllInBatch();
        memberRepository.deleteAllInBatch();
    }

    @DisplayName("전체 결제 프로세스 통합 테스트")
    @Test
    void testFullPaymentProcess() throws InterruptedException {

        // Given
        MemberJpaEntity member = createMember();
        memberRepository.save(member);

        TravelJpaEntity travel = createTravel();
        travelRepository.save(travel);

        TravelAccountJpaEntity travelAccountJpaEntity = createTravelAccount(member, travel);
        travelAccountRepository.save(travelAccountJpaEntity);

        String accountNumber = travelAccountJpaEntity.getAccountNumber();

        // When
        Thread sseThread = new Thread(() -> {
            String sseResponse = RestClientUtils.getSseEventStream(port,
                    "/api/payment/connect?paymentRequestId=payment-123", 3000);
            assertThat(sseResponse).contains("connected");
        });

        sseThread.start();

        Thread.sleep(2000);

        OfflinePaymentRequest paymentRequest = new OfflinePaymentRequest(
                "payment-123",
                "store-001",
                "Sample Store",
                "Sample Address",
                37.7749,
                -122.4194,
                10000L,
                accountNumber,
                "store-acc-002",
                List.of(new OrderItemRequest("item1", 5000), new OrderItemRequest("item2", 5000))
        );

        JsonNode paymentResponse = post(port, "/api/payment/confirm", paymentRequest);

        // Then
        assertThat(paymentResponse.path("status").asText()).isEqualTo("SUCCESS");
        assertThat(paymentResponse.path("data").path("paymentResult").isNull()).isFalse();

        Long updatedBalance = bankApiClientInPayment.getBalance(accountNumber);
        assertThat(updatedBalance).isLessThan(10000L);

        SseEmitter emitter = sseUtils.getEmitter("payment-123");
        if (emitter != null) {
            emitter.complete();
        }
        sseThread.join();
    }

    private TravelAccountJpaEntity createTravelAccount(MemberJpaEntity member, TravelJpaEntity travel) {
        String travelAccountNumber = bankApiClientInPayment.createAccount(member.getMemberKey());
        return TravelAccountJpaEntity.builder()
                .accountNumber(travelAccountNumber)
                .travel(travel)
                .build();
    }

    private MemberJpaEntity createMember() {
        return MemberJpaEntity.builder()
                .memberKey("596d1e36-c34a-4bbe-9abd-a329decc19e7")
                .build();
    }

    private TravelJpaEntity createTravel() {
        return TravelJpaEntity.builder()
                .title("아기돼지 여행")
                .build();
    }
}
