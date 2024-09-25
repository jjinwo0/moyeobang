package com.ssafy.moyeobang.common.persistenceentity.travel;

import com.ssafy.moyeobang.common.persistenceentity.BaseEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberTravelJpaEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "travel")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TravelJpaEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "travel_id")
    private Long id;

    private String title;

    private String travelKey;

    private LocalDate startDate;

    private LocalDate endDate;

    private String backgroundImageUrl;

    @OneToMany(mappedBy = "travel", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<MemberTravelJpaEntity> memberTravelJpaEntities = new ArrayList<>();

    @OneToMany(mappedBy = "travel", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<TravelPlaceJpaEntity> travelPlaceJpaEntities = new ArrayList<>();

    @Builder
    public TravelJpaEntity(String title,
                           String travelKey,
                           LocalDate startDate,
                           LocalDate endDate,
                           String backgroundImageUrl) {
        this.title = title;
        this.travelKey = travelKey;
        this.startDate = startDate;
        this.endDate = endDate;
        this.backgroundImageUrl = backgroundImageUrl;
    }

    //TODO: 여행 계획 API 구현 후 삭제 예정
    public void setTravelKey(String travelKey) {
        this.travelKey = travelKey;
    }

    public List<String> getTravelPlaces() {
        return travelPlaceJpaEntities.stream()
                .map(TravelPlaceJpaEntity::getName)
                .toList();
    }
}
