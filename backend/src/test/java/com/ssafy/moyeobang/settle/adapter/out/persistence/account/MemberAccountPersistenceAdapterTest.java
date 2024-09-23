package com.ssafy.moyeobang.settle.adapter.out.persistence.account;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.settle.adapter.out.persistence.member.MemberRepositoryInSettle;
import com.ssafy.moyeobang.settle.application.domain.account.Account;
import com.ssafy.moyeobang.settle.error.AccountNotFoundException;
import com.ssafy.moyeobang.support.PersistenceAdapterTestSupport;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class MemberAccountPersistenceAdapterTest extends PersistenceAdapterTestSupport {

    @Autowired
    private MemberAccountPersistenceAdapter adapter;

    @Autowired
    private MemberAccountRepositoryInSettle repository;

    @Autowired
    private MemberRepositoryInSettle memberRepository;

    @Autowired
    private AccountMapperInSettle mapper;

    @BeforeEach
    void setUp() {

        MemberJpaEntity member1 = MemberJpaEntity.builder()
                .email("test1@ssafy.com")
                .username("test1")
                .memberKey("eea1652c-b5f3-4ef3-9aba-5360026f03b0")
                .build();

        MemberJpaEntity member2 = MemberJpaEntity.builder()
                .email("test2@ssafy.com")
                .username("test2")
                .memberKey("aae2561c-f3b5-3fe4-bab6-f03b05360026")
                .build();

        memberRepository.save(member1);
        memberRepository.save(member2);

        MemberAccountJpaEntity account1 = MemberAccountJpaEntity.builder()
                .bankName("싸피은행")
                .accountNumber("123-45-678900")
                .member(member1)
                .build();

        MemberAccountJpaEntity account2 = MemberAccountJpaEntity.builder()
                .bankName("싸피은행")
                .accountNumber("009-87-654321")
                .member(member2)
                .build();

        repository.save(account1);
        repository.save(account2);
    }

    @AfterEach
    void tearDown() {

        repository.deleteAll();
        memberRepository.deleteAll();
    }

    @Test
    @DisplayName("계좌의 식별자로 회원의 계좌 정보를 조회")
    void 회원_계좌_조회() {

        Account find1 = adapter.findMemberAccount(1L);
        Account find2 = adapter.findMemberAccount(2L);

        assertThat(find1.getNo().accountNumber()).isEqualTo("123-45-678900");
        assertThat(find1.getInfo().bankName()).isEqualTo("싸피은행");

        assertThat(find2.getNo().accountNumber()).isEqualTo("009-87-654321");
        assertThat(find2.getInfo().bankName()).isEqualTo("싸피은행");

        assertThrows(AccountNotFoundException.class, () -> adapter.findMemberAccount(3L));
    }
}