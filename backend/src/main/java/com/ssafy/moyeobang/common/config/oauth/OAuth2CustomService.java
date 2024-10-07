package com.ssafy.moyeobang.common.config.oauth;

import com.ssafy.moyeobang.common.config.oauth.dto.CustomOAuth2User;
import com.ssafy.moyeobang.common.config.oauth.dto.GoogleResponse;
import com.ssafy.moyeobang.common.config.oauth.dto.KakaoResponse;
import com.ssafy.moyeobang.common.config.oauth.dto.OAuth2Response;
import com.ssafy.moyeobang.common.config.oauth.dto.OAuth2UserDto;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OAuth2CustomService extends DefaultOAuth2UserService {

    private static final Logger log = LoggerFactory.getLogger(OAuth2CustomService.class);
    private final MemberRepositoryInOAuth memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        log.info("userRequest: {}", userRequest.toString());

        OAuth2User user = super.loadUser(userRequest);
        log.info("find OAuth2User: {}", user);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        log.info("find registrationId: {}", registrationId);

        OAuth2Response response = null;

        if (registrationId.equals("kakao")) {
            response = new KakaoResponse(user.getAttributes());
        } else if (registrationId.equals("google")) {
            response = new GoogleResponse(user.getAttributes());
        } else {
            throw new OAuth2AuthenticationException("지원하지 않는 제공자입니다: " + registrationId);
        }

        System.out.println("response Email: " + response.getEmail());

        Optional<MemberJpaEntity> findMember = memberRepository.findByEmail(response.getEmail());

        if (findMember.isEmpty()) {

            MemberJpaEntity createMember = response.toEntity();

            memberRepository.save(createMember);

            OAuth2UserDto oAuth2User = toOAuth2UserDto(createMember);

            log.info("new oAuth2User: {}", oAuth2User);

            return new CustomOAuth2User(oAuth2User);
        } else {

            MemberJpaEntity member = findMember.get();

            log.info("exist oAuth2User: {}", member);

            OAuth2UserDto oAuth2User = toOAuth2UserDto(member);

            return new CustomOAuth2User(oAuth2User);
        }
    }

    private OAuth2UserDto toOAuth2UserDto(MemberJpaEntity member) {

        return new OAuth2UserDto(
                member.getEmail(),
                member.getUsername(),
                member.getRole()
        );
    }
}
