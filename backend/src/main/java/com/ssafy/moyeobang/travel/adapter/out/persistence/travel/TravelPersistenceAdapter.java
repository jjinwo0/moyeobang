package com.ssafy.moyeobang.travel.adapter.out.persistence.travel;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.travel.QuizJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelPlaceJpaEntity;
import com.ssafy.moyeobang.travel.adapter.out.persistence.member.MemberTravelRepositoryInTravel;
import com.ssafy.moyeobang.travel.adapter.out.persistence.quiz.QuizRepositoryInTravel;
import com.ssafy.moyeobang.travel.application.port.out.CreateTravelOutCommand;
import com.ssafy.moyeobang.travel.application.port.out.CreateTravelPort;
import com.ssafy.moyeobang.travel.application.port.out.LeaveTravelPort;
import com.ssafy.moyeobang.travel.application.port.out.UpdateTravelOutCommand;
import com.ssafy.moyeobang.travel.application.port.out.UpdateTravelPort;
import com.ssafy.moyeobang.travel.error.TravelNotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class TravelPersistenceAdapter implements CreateTravelPort, UpdateTravelPort, LeaveTravelPort {

    private final TravelRepositoryInTravel travelRepository;
    private final TravelPlaceRepositoryInTravel travelPlaceRepository;
    private final QuizRepositoryInTravel quizRepository;
    private final MemberTravelRepositoryInTravel memberTravelRepository;

    @Override
    public Long createTravel(CreateTravelOutCommand command) {
        TravelJpaEntity travel = createTravelJpaEntity(command);
        travelRepository.save(travel);

        List<TravelPlaceJpaEntity> travelPlaces = createTravelPlacesJpaEntity(travel, command);
        travelPlaceRepository.saveAll(travelPlaces);

        return travel.getId();
    }

    @Override
    public boolean updateTravel(UpdateTravelOutCommand command) {
        TravelJpaEntity travel = getTravelBy(command);
        travel.updateTravel(
                command.title(),
                command.startDate(),
                command.endDate(),
                command.backgroundImageUrl()
        );

        updateTravelPlaces(command, travel);
        updateQuiz(command, travel);

        return true;
    }

    @Override
    public boolean leaveTravel(Long travelId, Long memberId) {
        return memberTravelRepository.deleteBy(travelId, memberId) == 1;
    }

    private void updateTravelPlaces(UpdateTravelOutCommand command, TravelJpaEntity travel) {
        travelPlaceRepository.deleteAllBy(command.travelId());
        List<TravelPlaceJpaEntity> travelPlaces = createTravelPlacesJpaEntity(travel, command);
        travelPlaceRepository.saveAll(travelPlaces);
    }

    private void updateQuiz(UpdateTravelOutCommand command, TravelJpaEntity travel) {
        quizRepository.deleteBy(command.travelId());
        QuizJpaEntity quiz = createQuizJpaEntity(command, travel);
        quizRepository.save(quiz);
    }

    private TravelJpaEntity createTravelJpaEntity(CreateTravelOutCommand command) {
        return TravelJpaEntity.builder()
                .title(command.title())
                .startDate(command.startDate())
                .endDate(command.endDate())
                .backgroundImageUrl(command.backgroundImageUrl())
                .build();
    }

    private List<TravelPlaceJpaEntity> createTravelPlacesJpaEntity(TravelJpaEntity travel, CreateTravelOutCommand command) {
        return command.travelPlaces().stream()
                .map(place -> createTravelPlaceJpaEntity(travel, place))
                .toList();
    }

    private List<TravelPlaceJpaEntity> createTravelPlacesJpaEntity(TravelJpaEntity travel, UpdateTravelOutCommand command) {
        return command.travelPlaces().stream()
                .map(place -> createTravelPlaceJpaEntity(travel, place))
                .toList();
    }

    private TravelPlaceJpaEntity createTravelPlaceJpaEntity(TravelJpaEntity travel, String name) {
        return TravelPlaceJpaEntity.builder()
                .travel(travel)
                .name(name)
                .build();
    }

    private QuizJpaEntity createQuizJpaEntity(UpdateTravelOutCommand command, TravelJpaEntity travel) {
        return QuizJpaEntity.builder()
                .question(command.quizQuestion())
                .answer(command.quizAnswer())
                .travel(travel)
                .build();
    }

    private TravelJpaEntity getTravelBy(UpdateTravelOutCommand command) {
        return travelRepository.findById(command.travelId())
                .orElseThrow(TravelNotFoundException::new);
    }
}
