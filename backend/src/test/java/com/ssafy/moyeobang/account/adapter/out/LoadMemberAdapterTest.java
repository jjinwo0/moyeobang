package com.ssafy.moyeobang.account.adapter.out;

import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.moyeobang.account.adapter.out.persistence.account.MemberAccountRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.member.MemberRepositoryInAccount;
import com.ssafy.moyeobang.account.application.domain.Member;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.support.PersistenceAdapterTestSupport;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class LoadMemberAdapterTest extends PersistenceAdapterTestSupport {

    @Autowired
    private LoadMemberAdapter loadMemberAdapter;

    @Autowired
    private MemberRepositoryInAccount memberRepository;

    @Autowired
    private MemberAccountRepositoryInAccount memberAccountRepository;

    @AfterEach
    void tearDown() {
        memberAccountRepository.deleteAllInBatch();
        memberRepository.deleteAllInBatch();
    }

    @DisplayName("유저의 id로 유저 정보를 조회한다.")
    @Test
    void loadMember() {
        //given
        MemberJpaEntity memberJpaEntity = createMember();
        memberRepository.save(memberJpaEntity);

        MemberAccountJpaEntity memberAccountJpaEntity = createMemberAccount(memberJpaEntity);
        memberAccountRepository.save(memberAccountJpaEntity);

        //when
        Member member = loadMemberAdapter.loadMember(memberJpaEntity.getId());

        //then
        assertThat(member).extracting("id", "accountNumber")
                .containsExactly(memberJpaEntity.getId(), memberAccountJpaEntity.getAccountNumber());
    }

    private MemberJpaEntity createMember() {
        return MemberJpaEntity.builder()
                .memberKey("eea1652c-b5f3-4ef3-9aba-5360026f03b0")
                .build();
    }

    private MemberAccountJpaEntity createMemberAccount(MemberJpaEntity member) {
        return MemberAccountJpaEntity.builder()
                .member(member)
                .accountNumber("0016174648358791")
                .build();
    }
}