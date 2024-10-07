package com.ssafy.moyeobang.common.config;

import com.ssafy.moyeobang.common.config.jwt.TokenManager;
import com.ssafy.moyeobang.common.config.oauth.MemberRepositoryInOAuth;
import com.ssafy.moyeobang.common.config.oauth.OAuth2CustomService;
import com.ssafy.moyeobang.common.config.oauth.OAuth2SuccessHandler;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final OAuth2CustomService oAuth2CustomService;

    private final MemberRepositoryInOAuth memberRepository;

    private final TokenManager tokenManager;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(corsConfigurer -> corsConfigurer.configurationSource(apiConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .headers(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .logout(AbstractHttpConfigurer::disable)
                .sessionManagement(management -> management
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // RESTful API를 위한 STATELESS
                )
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/**").permitAll()
                )
                .oauth2Login(
                        auth -> auth.loginPage("/login")
                                .authorizationEndpoint(
                                        endpoint -> endpoint
                                                .baseUri("/api/oauth2/authorization")
                                )
                                .redirectionEndpoint(
                                        endpoint -> endpoint
                                                .baseUri("/api/login/oauth2/code/*")
                                )
                                .userInfoEndpoint(
                                        endpoint -> endpoint.userService(oAuth2CustomService))
                                .successHandler(oAuth2SuccessHandler())
                                .failureHandler(oAuth2FailureHandler())
                )
                .addFilterAfter(new SecurityContextPersistenceFilter(), SecurityContextPersistenceFilter.class)
                // /api로 시작하는 url인 경우 401 상태 코드를 반환하도록 예외 처리
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .defaultAuthenticationEntryPointFor(
                                new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED),
                                new AntPathRequestMatcher("/api/**")
                        )
                )
                .build();
    }

    private CorsConfigurationSource apiConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setMaxAge(86400L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    public OAuth2SuccessHandler oAuth2SuccessHandler() {

        return new OAuth2SuccessHandler(
                memberRepository,
                tokenManager
        );
    }

    private AuthenticationFailureHandler oAuth2FailureHandler() {

        return (request, response, e) -> {
            String errorMessage = URLEncoder.encode("authorization_request_not_found", StandardCharsets.UTF_8);
            response.sendRedirect("/login?error=" + errorMessage + "&code=" + response.getStatus());
        };
    }
}