package com.ssafy.moyeobang.travel.error;

public class FileStoreException extends RuntimeException {

    public FileStoreException() {
        super("파일 저장 중 예외가 발생했습니다.");
    }
}
