package com.ssafy.moyeobang.common.config;

import java.util.Optional;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

@Configuration
public class AuditingConfig {

    //    @Bean
    public AuditorAware<String> auditorProvider() {
        return () -> {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null || !authentication.isAuthenticated()) {
                return Optional.empty(); // 인증되지 않은 경우 처리
            }

            Object principal = authentication.getPrincipal();
            String username = ((UserDetails) principal).getUsername();

            return Optional.of(username);
        };
    }
}
