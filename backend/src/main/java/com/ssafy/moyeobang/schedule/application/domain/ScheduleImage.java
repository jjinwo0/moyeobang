package com.ssafy.moyeobang.schedule.application.domain;

import java.io.InputStream;

public record ScheduleImage(String fileName,
                            String contentType,
                            InputStream inputStream,
                            long size) {
}
