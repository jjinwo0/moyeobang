package com.ssafy.moyeobang.common.config.jwt.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;

public record AccessTokenInfo(
        String accessToken,

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        Date accessTokenExpireTime
) {
}
