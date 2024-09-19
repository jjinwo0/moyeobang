package com.ssafy.moyeobang.payment.adapter.out.bank;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Headers {

    private static final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
    private static final DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HHmmss");

    private String apiName;
    private String transmissionDate;
    private String transmissionTime;
    private String institutionCode;
    private String fintechAppNo;
    private String apiServiceCode;
    private String institutionTransactionUniqueNo;
    private String apiKey;
    private String userKey;

    public static Headers withCommonUserKey(String apiName, LocalDateTime transmissionDateTime) {
        return withUserKey("eea1652c-b5f3-4ef3-9aba-5360026f03b0", apiName, transmissionDateTime);
    }

    public static Headers withUserKey(String userKey, String apiName, LocalDateTime transmissionDateTime) {
        return Headers.builder()
                .apiName(apiName)
                .transmissionDate(transmissionDateTime.format(dateFormatter))
                .transmissionTime(transmissionDateTime.format(timeFormatter))
                .institutionCode("00100")
                .fintechAppNo("001")
                .apiServiceCode(apiName)
                .institutionTransactionUniqueNo(generateRandomNumber())
                .apiKey("e218423b4af644c6ad9f3ae58e27af3c")
                .userKey(userKey)
                .build();
    }

    private static String generateRandomNumber() {
        return new BigInteger(130, new SecureRandom())
                .toString(10)
                .substring(0, 20);
    }

    @Builder(access = AccessLevel.PRIVATE)
    private Headers(String apiName,
                    String transmissionDate,
                    String transmissionTime,
                    String institutionCode,
                    String fintechAppNo,
                    String apiServiceCode,
                    String institutionTransactionUniqueNo,
                    String apiKey,
                    String userKey) {
        this.apiName = apiName;
        this.transmissionDate = transmissionDate;
        this.transmissionTime = transmissionTime;
        this.institutionCode = institutionCode;
        this.fintechAppNo = fintechAppNo;
        this.apiServiceCode = apiServiceCode;
        this.institutionTransactionUniqueNo = institutionTransactionUniqueNo;
        this.apiKey = apiKey;
        this.userKey = userKey;
    }
}
