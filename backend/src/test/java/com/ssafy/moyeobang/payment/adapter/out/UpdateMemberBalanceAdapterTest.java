package com.ssafy.moyeobang.payment.adapter.out;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberTravelJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.payment.adapter.out.persistence.member.MemberRepositoryInPayment;
import com.ssafy.moyeobang.payment.adapter.out.persistence.member.MemberTravelRepositoryInPayment;
import com.ssafy.moyeobang.payment.adapter.out.persistence.travel.TravelRepositoryInPayment;
import com.ssafy.moyeobang.payment.adapter.out.persistence.travelaccount.TravelAccountRepositoryInPayment;
import com.ssafy.moyeobang.payment.application.domain.Money;
import com.ssafy.moyeobang.payment.error.PaymentException;
import com.ssafy.moyeobang.support.PersistenceAdapterTestSupport;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class UpdateMemberBalanceAdapterTest extends PersistenceAdapterTestSupport {

    @Autowired
    private UpdateMemberBalanceAdapter updateMemberBalanceAdapter;

    @Autowired
    private TravelAccountRepositoryInPayment travelAccountRepository;

    @Autowired
    private MemberTravelRepositoryInPayment memberTravelRepository;

    @Autowired
    private TravelRepositoryInPayment travelRepository;

    @Autowired
    private MemberRepositoryInPayment memberRepository;

    @AfterEach
    void tearDown() {
        memberTravelRepository.deleteAllInBatch();
        travelAccountRepository.deleteAllInBatch();
        travelRepository.deleteAllInBatch();
        memberRepository.deleteAllInBatch();
    }

    @DisplayName("각 결제 금액의 1/n으로 회원의 잔액이 감소된다")
    @Test
    void updateMemberBalances() {
        // Given
        MemberJpaEntity member1 = createMember("member-1");
        MemberJpaEntity member2 = createMember("member-2");
        memberRepository.saveAll(List.of(member1, member2));

        TravelJpaEntity travel = createTravel("Test Travel");
        travelRepository.save(travel);

        TravelAccountJpaEntity travelAccount = createTravelAccount(travel);
        travelAccountRepository.save(travelAccount);

        MemberTravelJpaEntity memberTravel1 = createMemberTravel(member1, travel, 5000L);
        MemberTravelJpaEntity memberTravel2 = createMemberTravel(member2, travel, 5000L);
        memberTravelRepository.saveAll(List.of(memberTravel1, memberTravel2));

        Money splitMoney = Money.of(1000L);

        // When
        updateMemberBalanceAdapter.updateMemberBalances(travelAccount.getAccountNumber(), splitMoney);

        // Then
        MemberTravelJpaEntity updatedMember1 = memberTravelRepository.findById(memberTravel1.getId()).get();
        MemberTravelJpaEntity updatedMember2 = memberTravelRepository.findById(memberTravel2.getId()).get();

        assertThat(updatedMember1.getBalance()).isEqualTo(4000L);
        assertThat(updatedMember2.getBalance()).isEqualTo(4000L);
    }

    @DisplayName("유효하지 않은 여행 계좌 번호로 결제 시도를 하면 에러가 발생한다")
    @Test
    void updateMemberBalances_AccountNotFound() {
        // Given
        String invalidTravelAccountNumber = "000000";

        // When & Then
        assertThrows(PaymentException.class, () -> {
            updateMemberBalanceAdapter.updateMemberBalances(invalidTravelAccountNumber, Money.of(1000L));
        });
    }

    private MemberJpaEntity createMember(String memberKey) {
        return MemberJpaEntity.builder()
                .memberKey(memberKey)
                .build();
    }

    private TravelJpaEntity createTravel(String title) {
        return TravelJpaEntity.builder()
                .title(title)
                .build();
    }

    private TravelAccountJpaEntity createTravelAccount(TravelJpaEntity travel) {
        return TravelAccountJpaEntity.builder()
                .accountNumber("1234567890")
                .travel(travel)
                .build();
    }

    private MemberTravelJpaEntity createMemberTravel(MemberJpaEntity member, TravelJpaEntity travel,
                                                     long balance) {
        return MemberTravelJpaEntity.builder()
                .balance(balance)
                .member(member)
                .travel(travel)
                .build();
    }
}
