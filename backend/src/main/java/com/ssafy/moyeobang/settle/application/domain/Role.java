package com.ssafy.moyeobang.settle.application.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Role {

    USER("USER"), ADMIN("ADMIN");

    private String type;

    public static Boolean isRoleType(String type) {

        for (Role role : Role.values()){

            if (role.getType().equals(type)) return true;
        }

        return false;
    }
}
