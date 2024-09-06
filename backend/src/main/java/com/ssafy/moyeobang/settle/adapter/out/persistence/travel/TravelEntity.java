package com.ssafy.moyeobang.settle.adapter.out.persistence.travel;

import com.ssafy.moyeobang.common.util.BaseEntity;
import com.ssafy.moyeobang.settle.adapter.out.persistence.account.TravelAccountEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@Table(name = "travel")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TravelEntity extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "travel_id")
    private Long id;

    private String title;

    @OneToOne(mappedBy = "travelEntity", fetch = FetchType.LAZY)
    private TravelAccountEntity travelAccountEntity;

    @OneToMany(mappedBy = "travelEntity", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<MemberTravelEntity> memberTravelEntities = new ArrayList<>();
}
