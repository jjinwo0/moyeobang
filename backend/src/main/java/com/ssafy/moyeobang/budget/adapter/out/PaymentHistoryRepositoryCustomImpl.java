package com.ssafy.moyeobang.budget.adapter.out;

import static org.elasticsearch.index.query.QueryBuilders.boolQuery;
import static org.elasticsearch.index.query.QueryBuilders.matchQuery;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.MatchQueryBuilder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class PaymentHistoryRepositoryCustomImpl implements PaymentHistoryRepositoryCustom {

    private final ElasticsearchOperations elasticsearchOperations;

    @Override
    public List<PaymentHistory> findBy(String placeName, List<Member> members) {
        NativeSearchQuery searchQuery = new NativeSearchQueryBuilder()
                .withQuery(combinedQuery(placeName, members))
                .build();

        return elasticsearchOperations.search(searchQuery, PaymentHistory.class).stream()
                .map(SearchHit::getContent)
                .toList();
    }

    private BoolQueryBuilder combinedQuery(String placeName, List<Member> members) {
        return boolQuery()
                .must(placeNameQuery(placeName))
                .must(membersCountQuery(members))
                .should(membersQuery(members));
    }

    private MatchQueryBuilder placeNameQuery(String placeName) {
        return matchQuery("placeName", placeName)
                .fuzziness("AUTO");
    }

    private MatchQueryBuilder membersCountQuery(List<Member> members) {
        return matchQuery("member.size", members.size());
    }

    private BoolQueryBuilder membersQuery(List<Member> members) {
        BoolQueryBuilder membersQuery = boolQuery();

        members.stream()
                .map(this::memberQuery)
                .forEach(membersQuery::should);

        return membersQuery;
    }

    private BoolQueryBuilder memberQuery(Member member) {
        return boolQuery()
                .must(matchQuery("member.gender", member.getGender()))
                .must(matchQuery("member.age", member.getAge()));
    }
}