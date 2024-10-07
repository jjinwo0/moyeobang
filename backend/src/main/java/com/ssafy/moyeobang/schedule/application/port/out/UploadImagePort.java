package com.ssafy.moyeobang.schedule.application.port.out;

import com.ssafy.moyeobang.schedule.application.domain.ScheduleImage;

public interface UploadImagePort {

    public String uploadImage(ScheduleImage image);
}
