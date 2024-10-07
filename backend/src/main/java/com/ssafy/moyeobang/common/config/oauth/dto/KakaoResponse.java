package com.ssafy.moyeobang.common.config.oauth.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.Role;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class KakaoResponse implements OAuth2Response {

    private final KakaoAttributes kakaoAttributes;

    public KakaoResponse(Map<String, Object> attributes) {

        ObjectMapper objectMapper = new ObjectMapper();
        this.kakaoAttributes = objectMapper.convertValue(attributes, KakaoAttributes.class);

        log.debug("KakaoAttributes: {}", kakaoAttributes);
    }

    @Override
    public String getProvider() {

        return "kakao";
    }

    @Override
    public Long getProviderId() {

        return kakaoAttributes.getId();
    }

    @Override
    public String getEmail() {

        return kakaoAttributes.getKakaoAccount().getEmail();
    }

    @Override
    public String getNickname() {

        return kakaoAttributes.getKakaoAccount().getProfile().getNickname();
    }

    @Override
    public String getProfileImage() {

        return kakaoAttributes.getKakaoAccount().getProfile().getThumbnailImageUrl();
    }

    private String hashString(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(input.getBytes());
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString().substring(0, 10);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
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
