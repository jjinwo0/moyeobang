package com.ssafy.moyeobang.common.config.jwt;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Component
@ConfigurationProperties("jwt")
public class JwtProperties {

    private String secret;

    private String issuer;
}
