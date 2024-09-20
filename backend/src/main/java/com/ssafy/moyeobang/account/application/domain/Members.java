package com.ssafy.moyeobang.account.application.domain;

import static java.util.stream.Collectors.toSet;

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
