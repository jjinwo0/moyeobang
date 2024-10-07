package com.ssafy.moyeobang.common.config.oauth.dto;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.Role;
import java.util.Map;

public class GoogleResponse implements OAuth2Response {

    private final Map<String, Object> attributes;

    public GoogleResponse(Map<String, Object> attributes) {
        System.out.println(attributes);
        this.attributes = attributes;
    }

    @Override
    public String getProvider() {
        return "google";
    }

    @Override
    public Long getProviderId() {
        return Long.parseLong(attributes.get("sub").toString());
    }

    @Override
    public String getEmail() {
        return attributes.get("email").toString();
    }

    @Override
    public String getNickname() {
        return attributes.get("name").toString();
    }

    @Override
    public String getProfileImage() {
        return attributes.get("picture").toString();
    }

    @Override
    public MemberJpaEntity toEntity() {

        String email = getEmail();
        String nickname = getNickname();
        String profile = getProfileImage();

        return MemberJpaEntity.builder()
                .email(email)
                .username(nickname)
                .profile(profile)
                .role(Role.MEMBER)
                .build();
    }
}
