package com.ssafy.moyeobang.common.config.jwt.dto;

import java.time.LocalDateTime;

public record TokenDetail(String token, LocalDateTime expireTime) {
}
