package com.ssafy.moyeobang.payment.adapter.out;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawJpaEntity;
import com.ssafy.moyeobang.payment.adapter.out.bank.BankApiClient;
import com.ssafy.moyeobang.payment.adapter.out.persistence.travelaccount.TravelAccountRepositoryInPayment;
import com.ssafy.moyeobang.payment.adapter.out.persistence.withdraw.WithdrawRepositoryInPayment;
import com.ssafy.moyeobang.payment.application.domain.Money;
import com.ssafy.moyeobang.payment.application.domain.Store;
import com.ssafy.moyeobang.payment.application.domain.TravelAccount;
import com.ssafy.moyeobang.payment.application.port.out.LoadTravelAccountPort;
import com.ssafy.moyeobang.payment.application.port.out.PaymentResult;
import com.ssafy.moyeobang.payment.application.port.out.ProcessPaymentPort;
import com.ssafy.moyeobang.payment.error.AccountNotFoundException;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class BankAccountAdapter implements LoadTravelAccountPort, ProcessPaymentPort {

    private final BankApiClient bankApiClient;

    private final TravelAccountRepositoryInPayment travelAccountRepository;
    private final WithdrawRepositoryInPayment withdrawRepository;

    @Override
    public TravelAccount loadTravelAccount(String accountNumber) {
        Long balance = bankApiClient.getBalance(accountNumber);

        return TravelAccount.of(
                accountNumber,
                Money.of(balance)
        );
    }

    @Override
    public PaymentResult processPayment(TravelAccount travelAccount, Store store, Money paymentRequestMoney) {
        TravelAccountJpaEntity travelAccountEntity = getTravelAccount(travelAccount.getAccountNumber());

        WithdrawJpaEntity withdraw = createPaymentWithdraw(travelAccountEntity, store,
                Money.subtract(travelAccount.getBalance(), paymentRequestMoney).getAmount(), paymentRequestMoney);

        WithdrawJpaEntity savedWithdraw = withdrawRepository.save(withdraw);

        bankApiClient.payment(
                travelAccount.getAccountNumber(),
                store.getStoreAccountNumber(),
                paymentRequestMoney.getAmount()
        );

        return new PaymentResult(savedWithdraw.getId(), savedWithdraw.getAmount(), savedWithdraw.getPlaceAddress(),
                savedWithdraw.getPlaceName(), savedWithdraw.getCreateTime());
    }

    private TravelAccountJpaEntity getTravelAccount(String accountNumber) {
        return travelAccountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(AccountNotFoundException::new);
    }

    private WithdrawJpaEntity createPaymentWithdraw(TravelAccountJpaEntity travelAccount, Store store,
                                                    long balanceSnapshot,
                                                    Money paymentRequestMoney) {
        return WithdrawJpaEntity.builder()
                .title(store.getStoreName())
                .latitude(store.getLatitude())
                .longitude(store.getLongitude())
                .amount(paymentRequestMoney.getAmount())
                .balanceSnapshot(balanceSnapshot)
                .travelAccount(travelAccount)
                .placeId(store.getStoreId())
                .placeName(store.getStoreName())
                .placeAddress(store.getStoreAddress())
                .build();
    }

}
