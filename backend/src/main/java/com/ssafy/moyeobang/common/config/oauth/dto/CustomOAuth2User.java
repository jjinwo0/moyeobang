package com.ssafy.moyeobang.common.config.oauth.dto;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

@Getter
public record CustomOAuth2User(OAuth2UserDto userDto) implements OAuth2User {

    @Override
    public Map<String, Object> getAttributes() {
        return Map.of();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return userDto.role().getRoleType();
            }
        });

        return collection;
    }

    @Override
    public String getName() {
        return userDto.name();
    }

    public String getEmail() {
        return userDto.email();
    }

    public String getRole() {
        return userDto.role().getRoleType();
    }
}
