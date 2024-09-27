package com.ssafy.moyeobang.travel.adapter.out.local;

import static java.util.UUID.randomUUID;
import static org.springframework.util.StringUtils.getFilenameExtension;

import com.ssafy.moyeobang.travel.application.domain.BackgroundImage;
import com.ssafy.moyeobang.travel.application.port.out.UploadImagePort;
import com.ssafy.moyeobang.travel.error.FileStoreException;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import org.springframework.beans.factory.annotation.Value;

public class LocalFileStorage implements UploadImagePort {

    @Value("${moyeobang.storage.path}")
    private String storagePath;

    @Override
    public String uploadImage(BackgroundImage image) {
        String storeFileName = createStoreFileName(image.fileName());
        String fullPath = createFullPath(storeFileName);

        File file = new File(fullPath);

        try (OutputStream outputStream = new FileOutputStream(file);
             InputStream inputStream = image.inputStream()) {
            byte[] buffer = new byte[1024];
            int bytesRead;

            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }

            return fullPath;
        } catch (IOException e) {
            throw new FileStoreException();
        }
    }

    private String createStoreFileName(String originalFileName) {
        return randomUUID() + "." + getFilenameExtension(originalFileName);
    }

    private String createFullPath(String fileName) {
        return storagePath + "/" + fileName;
    }
}
