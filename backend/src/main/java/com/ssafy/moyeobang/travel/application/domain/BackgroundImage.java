package com.ssafy.moyeobang.travel.application.domain;

import java.io.InputStream;

public record BackgroundImage(String fileName,
                              String contentType,
                              InputStream inputStream,
                              long size) {
}
