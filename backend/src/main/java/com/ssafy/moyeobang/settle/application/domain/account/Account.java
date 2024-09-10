package com.ssafy.moyeobang.settle.application.domain.account;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Account {

    private final AccountNo no;

    private final AccountInfo info;

    public static Account of(final AccountNo no,
                             final AccountInfo info) {

        return new Account(no, info);
    }

    public record AccountNo(Long id, String accountNumber) {
    }

    public record AccountInfo(String accountName, String bankName) {
    }
}
