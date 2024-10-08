package com.ssafy.moyeobang.schedule.adapter.out.persistence;

import static java.nio.charset.StandardCharsets.UTF_8;
import static java.util.UUID.randomUUID;
import static org.springframework.util.StringUtils.getFilenameExtension;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.schedule.application.domain.ScheduleImage;
import com.ssafy.moyeobang.schedule.application.port.out.UploadImagePort;
import java.net.URLDecoder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

@PersistenceAdapter
@RequiredArgsConstructor
public class S3FileStorageInSchedule implements UploadImagePort {

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    private final AmazonS3 amazonS3;

    @Override
    public String uploadImage(ScheduleImage image) {
        if (image == null) {
            return null;
        }

        String uploadImageName = uploadImageOnS3(image);
        return getImageUrl(uploadImageName);
    }

    private String uploadImageOnS3(ScheduleImage image) {
        String storeImageName = createStoreImageName(image.fileName());

        amazonS3.putObject(
                bucketName,
                storeImageName,
                image.inputStream(),
                getMetadata(image)
        );

        return storeImageName;
    }

    private String createStoreImageName(String originalFileName) {
        return randomUUID() + "." + getFilenameExtension(originalFileName);
    }

    private ObjectMetadata getMetadata(ScheduleImage image) {
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(image.size());
        objectMetadata.setContentType(image.contentType());
        return objectMetadata;
    }

    private String getImageUrl(String storeImageName) {
        return URLDecoder.decode(
                amazonS3.getUrl(bucketName, storeImageName).toString(),
                UTF_8
        );
    }

}
