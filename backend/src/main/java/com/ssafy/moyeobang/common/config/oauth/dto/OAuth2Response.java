package com.ssafy.moyeobang.common.config.oauth.dto;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;

public interface OAuth2Response {

    String getProvider();

    Long getProviderId();

    String getEmail();

    String getNickname();

    String getProfileImage();

    MemberJpaEntity toEntity();
}
