package com.ssafy.moyeobang.settle.application.domain.account;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum AccountType {

    DOMESTIC("DOMESTIC");

    private String type;

    public static Boolean isAccountType(String type) {

        for (AccountType at : AccountType.values()){

            if (at.getType().equals(type)) return true;
        }

        return false;
    }
}
