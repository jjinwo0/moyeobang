package com.ssafy.moyeobang.settle.adapter.out.persistence.account;

import com.ssafy.moyeobang.settle.application.domain.account.Account;
import org.springframework.stereotype.Component;

@Component
public class AccountMapper {

    // 개인 계좌
    Account mapToDomain(final AccountEntity accountEntity) {

        return Account.of(
                new Account.AccountNo(
                        accountEntity.getId(),
                        accountEntity.getUuid()
                ),
                new Account.Bank(
                        accountEntity.getBankCode(),
                        accountEntity.getBankName()
                ),
                new Account.AccountInfo(
                        accountEntity.getTypeCode(),
                        accountEntity.getTypeName(),
                        accountEntity.getName(),
                        accountEntity.getDescription(),
                        accountEntity.getAccountType()
                )
        );
    }

    // 여행 계좌
    Account mapToTravelDomain(final TravelAccountEntity travelAccountEntity) {

        return Account.of(
                new Account.AccountNo(
                        travelAccountEntity.getId(),
                        travelAccountEntity.getUuid()
                ),
                new Account.Bank(
                        travelAccountEntity.getBankCode(),
                        travelAccountEntity.getBankName()
                ),
                new Account.AccountInfo(
                        travelAccountEntity.getTypeCode(),
                        travelAccountEntity.getTypeName(),
                        travelAccountEntity.getName(),
                        travelAccountEntity.getDescription(),
                        travelAccountEntity.getAccountType()
                )
        );
    }

    AccountEntity mapToEntity(final Account account) {

        return AccountEntity.builder()
                .id(account.getNo().id())
                .uuid(account.getNo().uuid())
                .bankCode(account.getBank().bankCode())
                .bankName(account.getBank().bankName())
                .typeCode(account.getInfo().typeCode())
                .accountType(account.getInfo().accountType())
                .typeName(account.getInfo().typeName())
                .name(account.getInfo().name())
                .description(account.getInfo().description())
                .accountType(account.getInfo().accountType())
                .build();
    }

    TravelAccountEntity mapToTravelEntity(final Account account) {

        return TravelAccountEntity.builder()
                .id(account.getNo().id())
                .uuid(account.getNo().uuid())
                .bankCode(account.getBank().bankCode())
                .bankName(account.getBank().bankName())
                .typeCode(account.getInfo().typeCode())
                .accountType(account.getInfo().accountType())
                .typeName(account.getInfo().typeName())
                .name(account.getInfo().name())
                .description(account.getInfo().description())
                .accountType(account.getInfo().accountType())
                .build();
    }
}
