package com.ssafy.moyeobang.integration;

import static com.ssafy.moyeobang.integration.RestClientUtils.post;
import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.databind.JsonNode;
import com.ssafy.moyeobang.account.adapter.in.web.request.CreateAccountRequest;
import com.ssafy.moyeobang.account.adapter.out.persistence.account.MemberAccountRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.account.TravelAccountRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.member.MemberRepositoryInAccount;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.support.IntegrationTestSupport;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;

public class CreateAccountIntegrationTest extends IntegrationTestSupport {

    @LocalServerPort
    private int port;

    @Autowired
    private MemberRepositoryInAccount memberRepository;

    @Autowired
    private MemberAccountRepositoryInAccount memberAccountRepository;

    @Autowired
    private TravelAccountRepositoryInAccount travelAccountRepository;

    @AfterEach
    void tearDown() {
        memberAccountRepository.deleteAllInBatch();
        memberRepository.deleteAllInBatch();
        travelAccountRepository.deleteAllInBatch();
    }

    @DisplayName("여행 계좌 생성 통합 테스트")
    @Test
    void createAccount() {
        //given
        MemberJpaEntity member = createMember();
        memberRepository.save(member);

        MemberAccountJpaEntity memberAccount = createMemberAccount(member);
        memberAccountRepository.save(memberAccount);

        //when
        JsonNode response = post(port, "/api/accounts", new CreateAccountRequest(1L));

        //then
        assertThat(response.path("data").path("accountNumber").asText()).isNotNull();
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
