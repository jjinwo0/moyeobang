package com.ssafy.moyeobang.common.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.FirebaseOptions.Builder;
import java.io.IOException;
import java.io.InputStream;
import javax.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class FirebaseConfig {

    @PostConstruct
    public void firebaseApp() throws IOException {

        ClassPathResource serviceAccount = new ClassPathResource(
                "firebase/moyeobang-d1dec-firebase-adminsdk-6uakm-bf0a8d2044.json");

        InputStream accountInputStream = serviceAccount.getInputStream();

        FirebaseOptions options = new Builder()
                .setCredentials(GoogleCredentials.fromStream(accountInputStream))
                .build();

        if (FirebaseApp.getApps().isEmpty()) {

            FirebaseApp.initializeApp(options);
            log.info("FirebaseApp initialized Successfully");
        }
    }
}
