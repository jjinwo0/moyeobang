package com.ssafy.moyeobang.common.config.oauth.dto;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.Role;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class KakaoResponse implements OAuth2Response {

    private final Map<String, Object> attributes;
    private final Map<String, Object> kakaoAccount;
    private final Map<String, Object> profile;

    public KakaoResponse(Map<String, Object> attributes) {
        this.attributes = attributes;

        System.out.println("??들어오나");
        System.out.println(attributes);

        log.debug("attribute: {}", attributes.get("kakao_account"));
        this.kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        this.profile = (Map<String, Object>) kakaoAccount.get("profile");
    }

    @Override
    public String getProvider() {
        return "kakao";
    }

    @Override
    public Long getProviderId() {
        return (Long) attributes.get("id");
    }

    @Override
    public String getEmail() {
        return kakaoAccount.get("email").toString();
    }

    @Override
    public String getNickname() {

        return profile.get("nickname").toString();
    }

    @Override
    public String getProfileImage() {

        return profile.get("profile_image_url").toString();
    }

    public String makeNickname() {
        String email = getEmail();
        return hashString(email);
    }

    private String hashString(String input) {
        MessageDigest digest = null;
        try {
            digest = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        byte[] hash = digest.digest(input.getBytes());
        StringBuilder hexString = new StringBuilder();

        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }

        return hexString.toString().substring(0, 10);
    }

    @Override
    public MemberJpaEntity toEntity() {

        return MemberJpaEntity.builder()
                .email(getEmail())
                .username(getNickname())
                .profile(profile.get("profile_image_url").toString())
                .role(Role.MEMBER)
                .build();
    }
}
