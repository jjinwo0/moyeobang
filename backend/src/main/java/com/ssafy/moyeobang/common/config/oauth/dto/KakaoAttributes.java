package com.ssafy.moyeobang.common.config.oauth.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class KakaoAttributes {

    private Long id;

    @JsonProperty("connected_at")
    private String connectedAt;

    private Properties properties;

    @JsonProperty("kakao_account")
    private KakaoAccount kakaoAccount;

    @Data
    public static class Properties {

        private String nickname;

        @JsonProperty("profile_image")
        private String profileImage;

        @JsonProperty("thumbnail_image")
        private String thumbnailImage;
    }

    @Data
    public static class KakaoAccount {

        private String email;

        private Profile profile;

        @Data
        public static class Profile {
            private String nickname;

            @JsonProperty("profile_image_url")
            private String profileImageUrl;

            @JsonProperty("thumbnail_image_url")
            private String thumbnailImageUrl;
        }
    }
}
