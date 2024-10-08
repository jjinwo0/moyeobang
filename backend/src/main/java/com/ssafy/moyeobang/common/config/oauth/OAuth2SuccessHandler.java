package com.ssafy.moyeobang.common.config.oauth;

import com.ssafy.moyeobang.common.config.jwt.TokenManager;
import com.ssafy.moyeobang.common.config.jwt.constant.TokenType;
import com.ssafy.moyeobang.common.config.jwt.dto.TokenDetail;
import com.ssafy.moyeobang.common.config.oauth.dto.CustomOAuth2User;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.util.CookieUtils;
import com.ssafy.moyeobang.notification.error.EntityNotFoundException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final MemberRepositoryInOAuth memberRepository;

    private final OAuth2AuthorizationRequestOnCookieRepository cookieRepository;

    private final TokenManager tokenManager;

    @Value("${spring.security.oauth2.client.redirect-path}")
    public String redirectPath;
    public static final String REFRESH_TOKEN_COOKIE_NAME = "refresh_token";
    public static final Duration REFRESH_TOKEN_DURATION = Duration.ofDays(14);
    public static final Duration ACCESS_TOKEN_DURATION = Duration.ofMinutes(15);

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        log.info("authentication: {}", authentication);

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        log.info("oauth login user: {}", oAuth2User);
        log.info("oauth login user name: {}", oAuth2User.getName());
        log.info("oauth login user attributes: {}", oAuth2User.getAttributes());

        String email = ((CustomOAuth2User) oAuth2User).userDto().email();

        log.info("oauth login user email: {}", email);

        MemberJpaEntity findMember = memberRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("[" + email + "] 에 해당하는 회원을 찾을 수 없습니다."));

        TokenDetail accessTokenDetail =
                tokenManager.generateToken(
                        findMember,
                        ACCESS_TOKEN_DURATION,
                        TokenType.ACCESS
                );

        TokenDetail refreshTokenDetail =
                tokenManager.generateToken(
                        findMember,
                        REFRESH_TOKEN_DURATION,
                        TokenType.REFRESH
                );

        // 요청이 localhost에서 왔는지 확인
        String serverName = request.getServerName();
        String finalRedirectPath = redirectPath;

        if ("localhost".equals(serverName)) {

            finalRedirectPath = "http://localhost:5173/entrance/success";
            log.info("localhost 요청 감지: 로컬 리다이렉트 경로 변경");
        } else {
            log.info("리다이렉트 경로: {}", finalRedirectPath);
        }

        addRefreshTokenToCookie(request, response, refreshTokenDetail.token());

        String targetUrl = getTargetUrl(
                finalRedirectPath,  // 최종 경로 전달
                accessTokenDetail.token(),
                accessTokenDetail.expireTime(),
                refreshTokenDetail.token(),
                refreshTokenDetail.expireTime()
        );

        clearAuthenticationAttributes(request, response);

        log.info("targetUrl: {}", targetUrl);
        log.info("accessTokenDetail: {}", accessTokenDetail);
        log.info("refreshTokenDetail: {}", refreshTokenDetail);
        log.info("authentication after CLEAR: {}", authentication);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    // 인증 관련 설정값 제거
    private void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
    }

    private String getTargetUrl(String path,
                                String accessToken,
                                LocalDateTime accessTokenExpireTime,
                                String refreshToken,
                                LocalDateTime refreshTokenExpireTime) {

        return UriComponentsBuilder.fromUriString(path)
                .queryParam("accessToken", accessToken)
                .queryParam("accessTokenExpireTime",
                        accessTokenExpireTime.atZone(ZoneId.of("Asia/Seoul")).toInstant().toEpochMilli())
                .queryParam("refreshToken", refreshToken)
                .queryParam("refreshTokenExpireTime",
                        refreshTokenExpireTime.atZone(ZoneId.of("Asia/Seoul")).toInstant().toEpochMilli())
                .build()
                .toUriString();
    }

    // 생성된 리프레시 토큰을 쿠키에 저장
    private void addRefreshTokenToCookie(HttpServletRequest request, HttpServletResponse response,
                                         String refreshToken) {
        int cookieMaxAge = (int) REFRESH_TOKEN_DURATION.toSeconds();

        CookieUtils.deleteCookie(request, response, REFRESH_TOKEN_COOKIE_NAME);
        CookieUtils.addCookie(response, REFRESH_TOKEN_COOKIE_NAME, refreshToken, cookieMaxAge);
    }
}
