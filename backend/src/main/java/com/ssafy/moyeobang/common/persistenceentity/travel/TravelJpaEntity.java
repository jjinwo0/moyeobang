package com.ssafy.moyeobang.common.persistenceentity.travel;

import com.ssafy.moyeobang.common.persistenceentity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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

    @Builder
    public TravelJpaEntity(String title, String travelKey) {
        this.title = title;
        this.travelKey = travelKey;
    }
}
