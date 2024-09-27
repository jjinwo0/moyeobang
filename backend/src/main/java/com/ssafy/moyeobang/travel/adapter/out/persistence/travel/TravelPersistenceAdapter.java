package com.ssafy.moyeobang.travel.adapter.out.persistence.travel;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberTravelJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.QuizJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelPlaceJpaEntity;
import com.ssafy.moyeobang.travel.adapter.out.persistence.member.MemberRepositoryInTravel;
import com.ssafy.moyeobang.travel.adapter.out.persistence.member.MemberTravelRepositoryInTravel;
import com.ssafy.moyeobang.travel.adapter.out.persistence.quiz.QuizRepositoryInTravel;
import com.ssafy.moyeobang.travel.application.port.out.CreateTravelOutCommand;
import com.ssafy.moyeobang.travel.application.port.out.CreateTravelPort;
import com.ssafy.moyeobang.travel.application.port.out.LeaveTravelPort;
import com.ssafy.moyeobang.travel.application.port.out.UpdateTravelOutCommand;
import com.ssafy.moyeobang.travel.application.port.out.UpdateTravelPort;
import com.ssafy.moyeobang.travel.error.MemberNotFoundException;
import com.ssafy.moyeobang.travel.error.TravelNotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class TravelPersistenceAdapter implements CreateTravelPort, UpdateTravelPort, LeaveTravelPort {

    private final MemberRepositoryInTravel memberRepository;
    private final MemberTravelRepositoryInTravel memberTravelRepository;

    private final TravelRepositoryInTravel travelRepository;
    private final TravelPlaceRepositoryInTravel travelPlaceRepository;

    private final QuizRepositoryInTravel quizRepository;

    @Override
    public Long createTravel(CreateTravelOutCommand command) {
        TravelJpaEntity travel = createTravelJpaEntity(command);
        travelRepository.save(travel);

        List<TravelPlaceJpaEntity> travelPlaces = createTravelPlacesJpaEntity(travel, command.travelPlaces());
        travelPlaceRepository.saveAll(travelPlaces);

        MemberJpaEntity member = getMemberBy(command.creatorId());

        MemberTravelJpaEntity memberTravel = createMemberTravel(travel, member);
        memberTravelRepository.save(memberTravel);

        QuizJpaEntity quiz = createQuizJpaEntity(travel, command.quizQuestion(), command.quizAnswer());
        quizRepository.save(quiz);

        return travel.getId();
    }

    @Override
    public boolean updateTravel(UpdateTravelOutCommand command) {
        TravelJpaEntity travel = getTravelBy(command.travelId());
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
        List<TravelPlaceJpaEntity> travelPlaces = createTravelPlacesJpaEntity(travel, command.travelPlaces());
        travelPlaceRepository.saveAll(travelPlaces);
    }

    private void updateQuiz(UpdateTravelOutCommand command, TravelJpaEntity travel) {
        quizRepository.deleteBy(command.travelId());
        QuizJpaEntity quiz = createQuizJpaEntity(travel, command.quizQuestion(), command.quizAnswer());
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

    private List<TravelPlaceJpaEntity> createTravelPlacesJpaEntity(TravelJpaEntity travel, List<String> travelPlaces) {
        return travelPlaces.stream()
                .map(place -> createTravelPlaceJpaEntity(travel, place))
                .toList();
    }

    private TravelPlaceJpaEntity createTravelPlaceJpaEntity(TravelJpaEntity travel, String name) {
        return TravelPlaceJpaEntity.builder()
                .travel(travel)
                .name(name)
                .build();
    }

    private MemberTravelJpaEntity createMemberTravel(TravelJpaEntity travel, MemberJpaEntity member) {
        return MemberTravelJpaEntity.builder()
                .travel(travel)
                .member(member)
                .balance(0)
                .build();
    }

    private QuizJpaEntity createQuizJpaEntity(TravelJpaEntity travel, String question, String answer) {
        return QuizJpaEntity.builder()
                .question(question)
                .answer(answer)
                .travel(travel)
                .build();
    }

    private TravelJpaEntity getTravelBy(Long travelId) {
        return travelRepository.findById(travelId)
                .orElseThrow(TravelNotFoundException::new);
    }

    private MemberJpaEntity getMemberBy(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(MemberNotFoundException::new);
    }
}
