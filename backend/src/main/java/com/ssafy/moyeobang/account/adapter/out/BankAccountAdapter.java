package com.ssafy.moyeobang.account.adapter.out;

import com.ssafy.moyeobang.account.adapter.out.bank.BankApiClient;
import com.ssafy.moyeobang.account.adapter.out.persistence.account.MemberAccountRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.account.TravelAccountRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.deposit.DepositRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.member.MemberRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.order.OrderRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.withdraw.WithdrawRepositoryInAccount;
import com.ssafy.moyeobang.account.application.domain.Account;
import com.ssafy.moyeobang.account.application.domain.ActivityWindow;
import com.ssafy.moyeobang.account.application.domain.Money;
import com.ssafy.moyeobang.account.application.domain.Settles;
import com.ssafy.moyeobang.account.application.domain.travelaccount.MemberAccount;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Members;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Transactions;
import com.ssafy.moyeobang.account.application.domain.travelaccount.TravelAccount;
import com.ssafy.moyeobang.account.application.port.out.CreateAccountPort;
import com.ssafy.moyeobang.account.application.port.out.LoadAccountPort;
import com.ssafy.moyeobang.account.application.port.out.SendMoneyPort;
import com.ssafy.moyeobang.account.error.AccountNotFoundException;
import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.deposit.DepositJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawJpaEntity;
import java.util.List;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class BankAccountAdapter implements CreateAccountPort, LoadAccountPort, SendMoneyPort {

    private final BankApiClient bankApiClient;
    private final DepositRepositoryInAccount depositRepository;

    private final MemberAccountRepositoryInAccount memberAccountRepository;
    private final TravelAccountRepositoryInAccount travelAccountRepository;
    private final OrderRepositoryInAccount orderRepository;

    private final ActivityMapper activityMapper;
    private final SettleMapper settleMapper;

    private final MemberRepositoryInAccount memberRepository;
    private final AccountMapper accountMapper;
    private final WithdrawRepositoryInAccount withdrawRepository;

    @Override
    public String createAccount(String memberKey) {
        String accountNumber = bankApiClient.createAccount(memberKey);

        TravelAccountJpaEntity account = TravelAccountJpaEntity.builder()
                .accountNumber(accountNumber)
                .build();

        travelAccountRepository.save(account);

        return accountNumber;
    }

    @Override
    public Account loadAccount(String accountNumber) {
        Long balance = bankApiClient.getBalance(accountNumber);

        ActivityWindow activityWindow = activityMapper.mapToActivityWindow(
                bankApiClient.getTransactionHistories(accountNumber),
                accountNumber
        );

        Settles settles = settleMapper.mapToSettles(
                orderRepository.findBy(accountNumber)
        );

        return Account.of(
                accountNumber,
                Money.of(balance),
                activityWindow,
                settles
        );
    }

    @Override
    public MemberAccount loadMemberAccount(String accountNumber) {
        Long balance = bankApiClient.getBalance(accountNumber);

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

        DepositJpaEntity deposit = createDeposit(travelAccount, memberAccount, money);
        depositRepository.save(deposit);

        bankApiClient.sendMoney(
                travelAccount.getAccountNumber(),
                memberAccount.getAccountNumber(),
                money.getAmount()
        );
    }

    private MemberAccountJpaEntity getMemberAccount(String accountNumber) {
        return memberAccountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(AccountNotFoundException::new);
    }

    private TravelAccountJpaEntity getTravelAccount(String accountNumber) {
        return travelAccountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(AccountNotFoundException::new);
    }

    private DepositJpaEntity createDeposit(TravelAccountJpaEntity travelAccount,
                                           MemberAccountJpaEntity memberAccount,
                                           Money money) {
        return DepositJpaEntity.builder()
                .amount(money.getAmount())
                .travelAccount(travelAccount)
                .member(memberAccount.getMember())
                .build();
    }
}
