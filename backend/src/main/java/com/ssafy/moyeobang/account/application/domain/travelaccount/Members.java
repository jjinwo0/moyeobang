package com.ssafy.moyeobang.account.application.domain.travelaccount;

import static java.util.stream.Collectors.toSet;

import com.ssafy.moyeobang.account.application.domain.Member;
import java.util.Map;
import java.util.Set;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class Members {

    private final Map<Long, Member> members;

    public Member getMember(Long id) {
        return members.get(id);
    }

    public Set<Member> getMembers(Set<Long> ids) {
        return ids.stream()
                .map(members::get)
                .collect(toSet());
    }
}
