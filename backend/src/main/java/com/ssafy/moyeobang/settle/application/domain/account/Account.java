package com.ssafy.moyeobang.settle.application.domain.account;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Account {

    private final AccountNo no;

    private final String bankName;

    public static Account of(final AccountNo no,
                             final String bankName) {

        return new Account(no, bankName);
    }

    public record AccountNo(Long id, String accountNumber) {}
}
