package com.ssafy.moyeobang.common.config.oauth.dto;

import com.ssafy.moyeobang.common.persistenceentity.member.Role;

public record OAuth2UserDto(String email, String name, Role role, String accountNo) {
}
