package com.ssafy.moyeobang.travel.adapter.out.s3;

import static java.nio.charset.StandardCharsets.UTF_8;
import static java.util.UUID.randomUUID;
import static org.springframework.util.StringUtils.getFilenameExtension;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.travel.application.domain.BackgroundImage;
import com.ssafy.moyeobang.travel.application.port.out.UploadImagePort;
import java.net.URLDecoder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

@PersistenceAdapter
@RequiredArgsConstructor
public class S3FileStorage implements UploadImagePort {

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    private final AmazonS3 amazonS3;

    @Override
    public String uploadImage(BackgroundImage image) {
        if (image == null) {
            return null;
        }

        String uploadImageName = uploadImageOnS3(image);
        return getImageUrl(uploadImageName);
    }

    private String uploadImageOnS3(BackgroundImage image) {
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

    private ObjectMetadata getMetadata(BackgroundImage image) {
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
