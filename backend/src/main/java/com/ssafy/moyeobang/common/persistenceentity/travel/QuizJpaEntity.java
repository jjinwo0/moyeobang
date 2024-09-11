package com.ssafy.moyeobang.common.persistenceentity.travel;

import com.ssafy.moyeobang.common.persistenceentity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "quiz")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class QuizJpaEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quiz_id")
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String question;

    @Column(columnDefinition = "TEXT")
    private String answer;

    @OneToOne
    @JoinColumn(name = "travel_id")
    private TravelJpaEntity travel;

    @Builder
    public QuizJpaEntity(String question, String answer, TravelJpaEntity travel) {
        this.question = question;
        this.answer = answer;
        this.travel = travel;
    }
}
