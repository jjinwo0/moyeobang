package com.ssafy.moyeobang.settle.adapter.out.persistence.account;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.settle.adapter.out.persistence.travel.TravelRepositoryInSettle;
import com.ssafy.moyeobang.settle.application.domain.account.Account;
import com.ssafy.moyeobang.settle.error.AccountNotFoundException;
import com.ssafy.moyeobang.support.PersistenceAdapterTestSupport;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class TravelAccountPersistenceAdapterTest extends PersistenceAdapterTestSupport {

    @Autowired
    private TravelAccountPersistenceAdapter adapter;

    @Autowired
    private TravelAccountRepositoryInSettle repository;

    @Autowired
    private TravelRepositoryInSettle travelRepository;

    @Autowired
    private AccountMapperInSettle mapper;

    @BeforeEach
    void setUp() {

        TravelJpaEntity travel = TravelJpaEntity.builder()
                .title("testTravel")
                .build();

        travelRepository.save(travel);

        TravelAccountJpaEntity travelAccount = TravelAccountJpaEntity.builder()
                .accountNumber("123-45-67890")
                .travel(travel)
                .build();

        repository.save(travelAccount);
    }

    @AfterEach
    void tearDown() {

        repository.deleteAll();
        travelRepository.deleteAll();
    }

    @Test
    @DisplayName("식별자로 여행 계좌 정보 조회")
    void 식별자_조회() {

        Account findTravelAccount = adapter.findTravelAccount(1L);

        assertThat(findTravelAccount.getNo().accountNumber()).isEqualTo("123-45-67890");
        assertThat(findTravelAccount.getInfo().accountName()).isEqualTo("testTravel");

        assertThrows(AccountNotFoundException.class, () -> adapter.findTravelAccount(100L));
    }
}