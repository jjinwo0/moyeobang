package com.ssafy.moyeobang.common.config.oauth.dto;

import lombok.Data;

@Data
public class KakaoAttributes {

    private Long id;

    private String connected_at;

    private KakaoAccount kakaoAccount;

    @Data
    public static class KakaoAccount {

        private String email;

        private Profile profile;

        @Data
        public static class Profile {

            private String nickname;

            private String profile_image_url;
        }
    }
}
