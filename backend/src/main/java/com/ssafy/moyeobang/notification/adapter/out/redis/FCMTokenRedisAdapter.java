package com.ssafy.moyeobang.notification.adapter.out.redis;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.notification.application.port.out.FCMTokenPort;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;

@PersistenceAdapter
@RequiredArgsConstructor
public class FCMTokenRedisAdapter implements FCMTokenPort {

    private final StringRedisTemplate redisTemplate;

    @Override
    public void saveToken(String email, String token) {

        redisTemplate.opsForValue().set(email, token);
    }

    @Override
    public String getToken(String email) {

        return redisTemplate.opsForValue().get(email);
    }

    @Override
    public void deleteToken(String email) {

        redisTemplate.delete(email);
    }

    @Override
    public boolean hasKey(String email) {

        return redisTemplate.hasKey(email);
    }
}
