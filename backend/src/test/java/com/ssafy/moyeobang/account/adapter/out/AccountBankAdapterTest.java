package com.ssafy.moyeobang.account.adapter.out;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.ssafy.moyeobang.account.adapter.out.persistence.account.AccountRepository;
import com.ssafy.moyeobang.account.adapter.out.persistence.member.MemberJpaEntity;
import com.ssafy.moyeobang.account.adapter.out.persistence.member.MemberRepository;
import com.ssafy.moyeobang.support.PersistenceAdapterTestSupport;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.HttpClientErrorException;

class AccountBankAdapterTest extends PersistenceAdapterTestSupport {

    @Autowired
    private AccountBankAdapter accountBankAdapter;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private MemberRepository memberRepository;

    @AfterEach
    void tearDown() {
        accountRepository.deleteAllInBatch();
        memberRepository.deleteAllInBatch();
    }

    @DisplayName("방장의 유저 키를 이용해 싸피 뱅크 모임 통장 계좌를 생성한다.")
    @Test
    void createAccount() {
        //given
        MemberJpaEntity member = createMember();
        memberRepository.save(member);

        //when
        String accountNumber = accountBankAdapter.createAccount(member.getMemberKey());

        //then
        assertThat(accountNumber).hasSize(16);
    }

    @DisplayName("잘못된 유저 키를 이용할 경우 계좌를 생성하지 못하고 예외가 발생한다.")
    @Test
    void createAccountWithWrongMemberKey() {
        //given
        MemberJpaEntity member = createMemberWithWrongMemberKey();
        memberRepository.save(member);

        //when & then
        assertThatThrownBy(() -> accountBankAdapter.createAccount(member.getMemberKey()))
                .isInstanceOf(HttpClientErrorException.class);
    }

    private MemberJpaEntity createMember() {
        return MemberJpaEntity.builder()
                .memberKey("eea1652c-b5f3-4ef3-9aba-5360026f03b0")
                .build();
    }

    private MemberJpaEntity createMemberWithWrongMemberKey() {
        return MemberJpaEntity.builder()
                .memberKey("wrong member key")
                .build();
    }
}