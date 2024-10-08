package com.ssafy.moyeobang.travel.application.port.out;

import com.ssafy.moyeobang.travel.application.domain.BackgroundImage;

public interface UploadImagePort {

    String uploadImage(BackgroundImage image);
}
