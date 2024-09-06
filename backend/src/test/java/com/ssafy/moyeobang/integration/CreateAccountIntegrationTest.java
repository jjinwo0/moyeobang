package com.ssafy.moyeobang.integration;

import static com.ssafy.moyeobang.integration.RestClientUtils.post;
import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.databind.JsonNode;
import com.ssafy.moyeobang.account.adapter.in.web.request.CreateAccountRequest;
import com.ssafy.moyeobang.account.adapter.out.persistence.account.AccountRepository;
import com.ssafy.moyeobang.account.adapter.out.persistence.member.MemberJpaEntity;
import com.ssafy.moyeobang.account.adapter.out.persistence.member.MemberRepository;
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
    private MemberRepository memberRepository;

    @Autowired
    private AccountRepository accountRepository;

    @AfterEach
    void tearDown() {
        memberRepository.deleteAllInBatch();
        accountRepository.deleteAllInBatch();
    }

    @DisplayName("여행 계좌 생성 통합 테스트")
    @Test
    void createAccount() {
        //given
        MemberJpaEntity member = createMember();
        memberRepository.save(member);

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
}
