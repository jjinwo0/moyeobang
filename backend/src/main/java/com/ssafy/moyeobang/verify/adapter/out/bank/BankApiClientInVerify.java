package com.ssafy.moyeobang.verify.adapter.out.bank;

import com.ssafy.moyeobang.verify.adapter.out.bank.request.SendVerifyRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import static com.ssafy.moyeobang.verify.adapter.out.bank.RestClientUtils.post;
import static java.time.LocalDateTime.now;

@Component
@RequiredArgsConstructor
public class BankApiClientInVerify {

    public static final String ACCOUNT_TYPE_NUMBER = "999-1-8142cf9d861b42";

    public Long sendVerify(String accountNo, String memberKey) {

        SendVerifyRequest request = new SendVerifyRequest(
                HeaderFormat.createHeader(memberKey, "openAccountAuth", now()),
                accountNo,
                "moyeobang");

        return post("/accountAuth/openAccountAuth", request)
                .path("REC")
                .path("transactionUniqueNo")
                .asLong();
    }
}
