package com.ssafy.moyeobang.settle.application.domain.account;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Account {

    private final AccountNo no;

    private final Bank bank;

    private final AccountInfo info;

    public static Account of(AccountNo no, Bank bank, AccountInfo info) {

        return new Account(no, bank, info);
    }

    public record AccountNo(Long id, String uuid) {}

    public record Bank(String bankCode, String bankName) {}

    public record AccountInfo(Long typeCode, String typeName, String name, String description, AccountType accountType) {}
}
