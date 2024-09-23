package com.ssafy.moyeobang.settle.adapter.out.persistence.account;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import com.ssafy.moyeobang.settle.application.domain.account.Account;
import com.ssafy.moyeobang.settle.application.domain.account.Account.AccountInfo;
import com.ssafy.moyeobang.settle.application.domain.account.Account.AccountNo;
import org.springframework.stereotype.Component;

@Component
public class AccountMapperInSettle {

    // 개인 계좌
    Account mapToDomain(final MemberAccountJpaEntity entity) {

        return Account.of(
                new AccountNo(
                        entity.getId(),
                        entity.getAccountNumber()
                ),
                new AccountInfo(
                        entity.getMember().getUsername(),
                        entity.getBankName()
                )
        );
    }

    // 여행 계좌
    Account mapToTravelDomain(final TravelAccountJpaEntity entity) {

        return Account.of(
                new AccountNo(
                        entity.getId(),
                        entity.getAccountNumber()
                ),
                new AccountInfo(
                        entity.getTravel().getTitle(),
                        "싸피은행"
                ) // todo: 필드 추가 여부 논의 필요
        );
    }

    MemberAccountJpaEntity mapToEntity(final Account account) {

        return MemberAccountJpaEntity.builder()
                .accountNumber(account.getNo().accountNumber())
                .bankName(account.getInfo().bankName())
                .build();
    }

    TravelAccountJpaEntity mapToTravelEntity(final Account account) {

        // todo: 여행명 처리 어떻게 할지 정해야 함
        return TravelAccountJpaEntity.builder()
                .accountNumber(account.getNo().accountNumber())
                .build();
    }
}
