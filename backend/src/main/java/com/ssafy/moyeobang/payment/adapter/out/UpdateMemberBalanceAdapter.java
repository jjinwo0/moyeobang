package com.ssafy.moyeobang.payment.adapter.out;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberTravelJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import com.ssafy.moyeobang.payment.adapter.out.persistence.member.MemberTravelRepositoryInPayment;
import com.ssafy.moyeobang.payment.adapter.out.persistence.travelaccount.TravelAccountRepositoryInPayment;
import com.ssafy.moyeobang.payment.application.domain.Money;
import com.ssafy.moyeobang.payment.application.port.out.UpdateMemberBalancePort;
import com.ssafy.moyeobang.payment.error.ErrorCode;
import com.ssafy.moyeobang.payment.error.PaymentException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@PersistenceAdapter
@RequiredArgsConstructor
public class UpdateMemberBalanceAdapter implements UpdateMemberBalancePort {

    private final TravelAccountRepositoryInPayment travelAccountRepository;
    private final MemberTravelRepositoryInPayment memberTravelRepository;

    @Override
    @Transactional
    public void updateMemberBalances(String travelAccountNumber, Money splitMoney) {
        TravelAccountJpaEntity travelAccountEntity = getTravelAccount(travelAccountNumber);

        List<MemberTravelJpaEntity> memberTravels = travelAccountEntity.getTravel().getMemberTravelJpaEntities();

        memberTravels.forEach(member -> {
            member.subtractBalance(splitMoney.getAmount());
            memberTravelRepository.save(member);
        });
    }

    private TravelAccountJpaEntity getTravelAccount(String accountNumber) {
        return travelAccountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new PaymentException(ErrorCode.TRAVEL_ACCOUNT_NOT_FOUND));
    }
}
