package com.ssafy.moyeobang.budget.adapter.out;

import static org.springframework.data.domain.Sort.Direction.DESC;
import static org.springframework.data.elasticsearch.core.query.Criteria.where;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class PaymentHistoryRepositoryCustomImpl implements PaymentHistoryRepositoryCustom {

    private final ElasticsearchOperations elasticsearchOperations;

    @Override
    public List<PaymentHistory> findBy(String placeName, List<Member> members) {
        return elasticsearchOperations.search(combinedQuery(placeName, members), PaymentHistory.class).stream()
                .map(SearchHit::getContent)
                .toList();
    }

    private CriteriaQuery combinedQuery(String placeName, List<Member> members) {
        return new CriteriaQuery(combinedCond(placeName, members))
                .addSort(Sort.by(DESC, "_score"))
                .setPageable(Pageable.ofSize(10));
    }

    private Criteria combinedCond(String placeName, List<Member> members) {
        return wherePlaceNameIs(placeName)
                .and(whereMemberCountIs(members.size()))
                .and(whereMembersIs(members));
    }

    private Criteria wherePlaceNameIs(String placeName) {
        return where("placeName").fuzzy(placeName);
    }

    private Criteria whereMemberCountIs(int memberCount) {
        return where("memberCount").is(memberCount);
    }

    private Criteria whereMembersIs(List<Member> members) {
        return members.stream()
                .map(this::whereMemberIs)
                .reduce(Criteria::or)
                .orElseThrow();
    }

    private Criteria whereMemberIs(Member member) {
        return where("member.gender").is(member.getGender())
                .and("member.age").is(member.getAge());
    }
}