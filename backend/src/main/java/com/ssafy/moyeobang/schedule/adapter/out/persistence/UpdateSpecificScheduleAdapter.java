package com.ssafy.moyeobang.schedule.adapter.out.persistence;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleJpaEntity;
import com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule.ScheduleJpaRepositoryInSchedule;
import com.ssafy.moyeobang.schedule.application.port.in.UpdateTravelScheduleCommand;
import com.ssafy.moyeobang.schedule.application.port.out.UpdateSpecificSchedulePort;
import com.ssafy.moyeobang.schedule.application.port.out.UploadImagePort;
import com.ssafy.moyeobang.schedule.error.ErrorCode;
import com.ssafy.moyeobang.schedule.error.ScheduleException;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@PersistenceAdapter
@RequiredArgsConstructor
public class UpdateSpecificScheduleAdapter implements UpdateSpecificSchedulePort {

    private final ScheduleJpaRepositoryInSchedule scheduleRepository;
    private final UploadImagePort uploadImagePort;


    @Transactional
    @Override
    public void updateSpecificSchedule(UpdateTravelScheduleCommand command) {
        ScheduleJpaEntity existingSchedule = scheduleRepository.findById(command.scheduleId())
                .orElseThrow(() -> new ScheduleException(ErrorCode.TRAVEL_SCHEDULE_NOT_FOUND));

        String imageUrl = uploadImagePort.uploadImage(command.scheduleImage());

        existingSchedule.updateSchedule(
                command.scheduleTitle(),
                command.scheduleTime(),
                command.scheduleLocation().title(),
                command.scheduleLocation().address(),
                command.scheduleLocation().lat(),
                command.scheduleLocation().lng(),
                command.scheduleLocation().googlePlaceId(),
                command.memo(),
                imageUrl
        );

        scheduleRepository.save(existingSchedule);
    }
}
