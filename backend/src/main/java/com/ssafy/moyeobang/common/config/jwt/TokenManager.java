package com.ssafy.moyeobang.common.config.jwt;

import com.ssafy.moyeobang.common.config.jwt.constant.TokenType;
import com.ssafy.moyeobang.common.config.jwt.dto.TokenDetail;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collections;
import java.util.Date;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class TokenManager {

    private final JwtProperties jwtProperties;

    public TokenDetail generateToken(MemberJpaEntity member, Duration expiry, TokenType tokenType) {

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiry.toMillis());

        String token = makeToken(member, expiryDate, tokenType);
        LocalDateTime localDateTime = expiryDate.toInstant().atZone(ZoneId.of("Asia/Seoul")).toLocalDateTime();

        return new TokenDetail(token, localDateTime);
    }

    private String makeToken(MemberJpaEntity member, Date expiryDate, TokenType tokenType) {

        if (TokenType.isAccessToken(tokenType.name())) {
            return makeAccessToken(member, expiryDate);
        }

        return makeRefreshToken(member, expiryDate);
    }

    private String makeRefreshToken(MemberJpaEntity member, Date expiryDate) {

        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setHeaderParam(TokenType.REFRESH.name(), TokenType.REFRESH.name())
                .setIssuer(jwtProperties.getIssuer())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(expiryDate)
                .setSubject(member.getEmail())
                .claim("id", member.getId())
                .signWith(SignatureAlgorithm.HS256, jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8))
                .compact();
    }

    private String makeAccessToken(MemberJpaEntity member, Date expiryDate) {

        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setHeaderParam(TokenType.ACCESS.name(), TokenType.ACCESS.name())
                .setIssuer(jwtProperties.getIssuer())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(expiryDate)
                .setSubject(member.getEmail())
                .claim("id", member.getId())
                .signWith(SignatureAlgorithm.HS256, jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8))
                .compact();
    }

    // JWT 토큰 유효성 검증메서드
    public boolean validToken(String token) {
        try {
            // "Bearer " 접두사 제거
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);  // "Bearer " 부분을 제거
            }

            Jwts.parser()
                    .setSigningKey(jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8))  // 서명 검증
                    .parseClaimsJws(token);  // 유효성 검사 및 서명 검증

            return true;
        } catch (ExpiredJwtException e) {
            log.info("Token has expired: {}", e.getMessage());
        } catch (SignatureException e) {
            log.info("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.info("Invalid JWT token format: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.info("JWT token is empty or has invalid arguments: {}", e.getMessage());
        } catch (Exception e) {
            log.info("Failed to validate token: {}", e.getMessage());
        }
        return false;
    }

    public Authentication getAuthentication(String token) {

        Claims claims = getClaims(token);

        Set<SimpleGrantedAuthority> authorities = Collections.singleton(
                new SimpleGrantedAuthority(Role.MEMBER.getRoleType())
        );

        // 스프링 시큐리티 사용자 인증을 반환한다.
        // 사용자 이름과 비밀번호를 이용한 인증을 진행한다. JWT 클레임에서 JWT가 발급된 사용자를 가져온다.
        // 시큐리티 유저 정보에 클레임에서 받아온 유저 이메일 정보, 비밀번호, 권한을 넣고 생성, 토큰, 권한목록을 통해 인증 정보 반환
        return new UsernamePasswordAuthenticationToken(
                new User(claims.getSubject(), "", authorities),
                token,
                authorities
        );
    }

    public Long getMemberId(String token) {

        return getClaims(token).get("id", Long.class);
    }

    // 토큰을 분석하면서 claims을 빼낸다.
    public Claims getClaims(String token) {
        // "Bearer " 접두사 제거
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);  // "Bearer " 부분을 제거
        }

        return Jwts.parser()
                .setSigningKey(jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8))  // 서명 검증
                .parseClaimsJws(token)
                .getBody();
    }

}
