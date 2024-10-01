package com.ssafy.moyeobang.common.config.jwt.dto;

import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public record TokenDetail(String token, LocalDateTime expireTime) {
}
