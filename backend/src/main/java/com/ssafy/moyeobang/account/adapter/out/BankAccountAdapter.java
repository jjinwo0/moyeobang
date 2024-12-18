package com.ssafy.moyeobang.account.adapter.out;

import static com.ssafy.moyeobang.common.persistenceentity.withdraw.SettleType.CUSTOM;
import static com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawType.ETC;

import com.ssafy.moyeobang.account.adapter.out.bank.BankApiClient;
import com.ssafy.moyeobang.account.adapter.out.persistence.account.MemberAccountRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.account.TravelAccountRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.deposit.DepositRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.member.MemberOrderHistoryRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.member.MemberRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.order.OrderRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.travel.TravelRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.withdraw.WithdrawRepositoryInAccount;
import com.ssafy.moyeobang.account.application.domain.MemberAccount;
import com.ssafy.moyeobang.account.application.domain.Members;
import com.ssafy.moyeobang.account.application.domain.Money;
import com.ssafy.moyeobang.account.application.domain.Transactions;
import com.ssafy.moyeobang.account.application.domain.TravelAccount;
import com.ssafy.moyeobang.account.application.port.out.CreateAccountPort;
import com.ssafy.moyeobang.account.application.port.out.LoadAccountPort;
import com.ssafy.moyeobang.account.application.port.out.SendMoneyPort;
import com.ssafy.moyeobang.account.error.AccountNotFoundException;
import com.ssafy.moyeobang.account.error.TravelNotFoundException;
import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.deposit.DepositJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberOrderHistoryJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.order.OrderJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawJpaEntity;
import java.util.List;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class BankAccountAdapter implements CreateAccountPort, LoadAccountPort, SendMoneyPort {

    private final AccountMapper accountMapper;
    private final BankApiClient bankApiClient;

    private final MemberRepositoryInAccount memberRepository;
    private final TravelRepositoryInAccount travelRepository;

    private final MemberAccountRepositoryInAccount memberAccountRepository;
    private final TravelAccountRepositoryInAccount travelAccountRepository;

    private final DepositRepositoryInAccount depositRepository;
    private final WithdrawRepositoryInAccount withdrawRepository;

    private final OrderRepositoryInAccount orderRepository;
    private final MemberOrderHistoryRepositoryInAccount memberOrderHistoryRepository;

    @Override
    public Long createAccount(Long travelId) {
        String travelKey = bankApiClient.createTravelKey();

        String accountNumber = bankApiClient.createAccount(travelKey);

        TravelJpaEntity travel = getTravel(travelId);
        travel.setTravelKey(travelKey);

        TravelAccountJpaEntity account = createTravelAccount(accountNumber, travel);
        travelAccountRepository.save(account);

        return account.getId();
    }

    @Override
    public MemberAccount loadMemberAccount(String accountNumber) {
        MemberAccountJpaEntity memberAccount = getMemberAccount(accountNumber);

        Long balance = bankApiClient.getBalance(memberAccount.getMember().getMemberKey(), accountNumber);

        return new MemberAccount(
                accountNumber,
                Money.of(balance)
        );
    }

    @Override
    public TravelAccount loadTravelAccount(Long accountId) {
        TravelAccountJpaEntity travelAccount = travelAccountRepository.findById(accountId)
                .orElseThrow(AccountNotFoundException::new);

        Members members = accountMapper.mapToMembers(
                memberRepository.findMemberInfosBy(travelAccount.getTravelId())
        );

        List<DepositJpaEntity> depositHistories = depositRepository.findByTravelAccountId(travelAccount.getId());
        List<WithdrawJpaEntity> withdrawalHistories = withdrawRepository.findByTravelAccountId(travelAccount.getId());

        Transactions transactions = accountMapper.mapToTransactions(
                depositHistories,
                withdrawalHistories,
                members
        );

        return new TravelAccount(
                travelAccount.getAccountNumber(),
                members,
                transactions
        );
    }

    @Override
    public void sendMoney(String sourceAccountNumber, String targetAccountNumber, Money money) {
        MemberAccountJpaEntity memberAccount = getMemberAccount(sourceAccountNumber);
        TravelAccountJpaEntity travelAccount = getTravelAccount(targetAccountNumber);

        TravelAccount account = loadTravelAccount(travelAccount.getId());
        Money balance = account.getBalance();

        DepositJpaEntity deposit = createDeposit(travelAccount, memberAccount, money, balance);
        depositRepository.save(deposit);

        bankApiClient.sendMoney(
                memberAccount.getMember().getMemberKey(),
                travelAccount.getAccountNumber(),
                memberAccount.getAccountNumber(),
                money.getAmount()
        );
    }

    @Override
    public void refundMoney(String sourceAccountNumber, String targetAccountNumber, Money money) {
        TravelAccountJpaEntity travelAccount = getTravelAccount(sourceAccountNumber);
        MemberAccountJpaEntity memberAccount = getMemberAccount(targetAccountNumber);

        TravelAccount account = loadTravelAccount(travelAccount.getId());
        Money balance = account.getBalance();

        WithdrawJpaEntity withdraw = createWithdraw(travelAccount, memberAccount, money, balance);
        withdrawRepository.save(withdraw);

        OrderJpaEntity order = createOrder(money, withdraw);
        orderRepository.save(order);

        MemberOrderHistoryJpaEntity memberOrderHistory = createMemberOrderHistory(money, memberAccount, order);
        memberOrderHistoryRepository.save(memberOrderHistory);
        
        bankApiClient.sendMoney(
                travelAccount.getTravel().getTravelKey(),
                memberAccount.getAccountNumber(),
                travelAccount.getAccountNumber(),
                money.getAmount()
        );
    }

    private MemberOrderHistoryJpaEntity createMemberOrderHistory(Money money, MemberAccountJpaEntity memberAccount, OrderJpaEntity order) {
        return MemberOrderHistoryJpaEntity.builder()
                .amount(money.getAmount())
                .member(memberAccount.getMember())
                .order(order)
                .build();
    }

    private OrderJpaEntity createOrder(Money money, WithdrawJpaEntity withdraw) {
        return OrderJpaEntity.builder()
                .title("여행 종료 환불")
                .amount(money.getAmount())
                .quantity(1)
                .withdraw(withdraw)
                .build();
    }

    private TravelAccountJpaEntity createTravelAccount(String accountNumber, TravelJpaEntity travel) {
        return TravelAccountJpaEntity.builder()
                .accountNumber(accountNumber)
                .travel(travel)
                .build();
    }

    private DepositJpaEntity createDeposit(TravelAccountJpaEntity travelAccount,
                                           MemberAccountJpaEntity memberAccount,
                                           Money money,
                                           Money balance) {
        return DepositJpaEntity.builder()
                .amount(money.getAmount())
                .balanceSnapshot(balance.getAmount() + money.getAmount())
                .travelAccount(travelAccount)
                .member(memberAccount.getMember())
                .build();
    }

    private WithdrawJpaEntity createWithdraw(TravelAccountJpaEntity travelAccount,
                                             MemberAccountJpaEntity memberAccount,
                                             Money money,
                                             Money balance) {
        return WithdrawJpaEntity.builder()
                .title("여행 종료 환불")
                .amount(money.getAmount())
                .balanceSnapshot(balance.getAmount() - money.getAmount())
                .targetAccountNumber(memberAccount.getAccountNumber())
                .withdrawType(ETC)
                .settleType(CUSTOM)
                .travelAccount(travelAccount)
                .build();
    }

    private MemberAccountJpaEntity getMemberAccount(String accountNumber) {
        return memberAccountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(AccountNotFoundException::new);
    }

    private TravelAccountJpaEntity getTravelAccount(String accountNumber) {
        return travelAccountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(AccountNotFoundException::new);
    }

    private TravelJpaEntity getTravel(Long travelId) {
        return travelRepository.findById(travelId)
                .orElseThrow(TravelNotFoundException::new);
    }
}
