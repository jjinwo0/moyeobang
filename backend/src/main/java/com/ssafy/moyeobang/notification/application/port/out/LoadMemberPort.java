package com.ssafy.moyeobang.notification.application.port.out;

import com.ssafy.moyeobang.notification.application.domain.Member;

public interface LoadMemberPort {

    Member findById(Long id);
}
