package com.ssafy.moyeobang.integration;

import static com.ssafy.moyeobang.integration.RestClientUtils.post;
import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.databind.JsonNode;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberTravelJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.common.util.SseUtils;
import com.ssafy.moyeobang.payment.adapter.in.server.request.OfflinePaymentRequest;
import com.ssafy.moyeobang.payment.adapter.out.UpdateMemberBalanceAdapter;
import com.ssafy.moyeobang.payment.adapter.out.bank.BankApiClientInPayment;
import com.ssafy.moyeobang.payment.adapter.out.persistence.member.MemberRepositoryInPayment;
import com.ssafy.moyeobang.payment.adapter.out.persistence.member.MemberTravelRepositoryInPayment;
import com.ssafy.moyeobang.payment.adapter.out.persistence.travel.TravelRepositoryInPayment;
import com.ssafy.moyeobang.payment.adapter.out.persistence.travelaccount.TravelAccountRepositoryInPayment;
import com.ssafy.moyeobang.payment.adapter.out.persistence.withdraw.WithdrawRepositoryInPayment;
import com.ssafy.moyeobang.payment.application.domain.Money;
import com.ssafy.moyeobang.support.IntegrationTestSupport;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Disabled
public class OfflinePaymentIntegrationTest extends IntegrationTestSupport {

    @LocalServerPort
    private int port;

    @Autowired
    private MemberRepositoryInPayment memberRepository;

    @Autowired
    private MemberTravelRepositoryInPayment memberTravelRepository;

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

    @Autowired
    private UpdateMemberBalanceAdapter updateMemberBalanceAdapter;

    @AfterEach
    void tearDown() {
        withdrawRepository.deleteAllInBatch();
        memberTravelRepository.deleteAllInBatch();
        travelAccountRepository.deleteAllInBatch();
        travelRepository.deleteAllInBatch();
        memberRepository.deleteAllInBatch();
    }

    @DisplayName("전체 결제 프로세스 통합 테스트")
    @Test
    void testFullPaymentProcess() throws InterruptedException {

        // Given
        MemberJpaEntity member1 = createMember();
        MemberJpaEntity member2 = createMember();
        memberRepository.saveAll(List.of(member1, member2));

        TravelJpaEntity travel = createTravel();
        travelRepository.save(travel);

        TravelAccountJpaEntity travelAccountJpaEntity = createTravelAccount(travel);
        travelAccountRepository.save(travelAccountJpaEntity);

        MemberTravelJpaEntity memberTravel1 = createMemberTravel(member1, travel, 5000L);
        MemberTravelJpaEntity memberTravel2 = createMemberTravel(member2, travel, 5000L);
        memberTravelRepository.saveAll(List.of(memberTravel1, memberTravel2));

        String accountNumber = travelAccountJpaEntity.getAccountNumber();

        // When
        Thread sseThread = new Thread(() -> {
            String sseResponse = RestClientUtils.getSseEventStream(port,
                    "/api/payment/connect?paymentRequestId=payment-123");
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
                "target-acc-002"
        );

        JsonNode paymentResponse = post(port, "/api/payment/confirm", paymentRequest);

        // Then
        assertThat(paymentResponse.path("status").asText()).isEqualTo("SUCCESS");
        assertThat(paymentResponse.path("data").path("paymentResult").isNull()).isFalse();

        Money splitMoney = Money.of(1000L);
        updateMemberBalanceAdapter.updateMemberBalances(travelAccountJpaEntity.getAccountNumber(), splitMoney);

        MemberTravelJpaEntity updatedMember1 = memberTravelRepository.findById(memberTravel1.getId()).get();
        MemberTravelJpaEntity updatedMember2 = memberTravelRepository.findById(memberTravel2.getId()).get();

        assertThat(updatedMember1.getBalance()).isEqualTo(4000L);
        assertThat(updatedMember2.getBalance()).isEqualTo(4000L);

        Long updatedBalance = bankApiClientInPayment.getBalance(accountNumber,
                travelAccountJpaEntity.getTravel().getTravelKey());
        assertThat(updatedBalance).isLessThan(10000L);

        SseEmitter emitter = sseUtils.getEmitter("payment-123");
        if (emitter != null) {
            emitter.complete();
        }
        sseThread.join();
    }

    private TravelAccountJpaEntity createTravelAccount(TravelJpaEntity travel) {
        String travelAccountNumber = bankApiClientInPayment.createAccount("596d1e36-c34a-4bbe-9abd-a329decc19e7");
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

    private MemberTravelJpaEntity createMemberTravel(MemberJpaEntity member, TravelJpaEntity travel, long balance) {
        return MemberTravelJpaEntity.builder()
                .balance(balance)
                .member(member)
                .travel(travel)
                .build();
    }
}
