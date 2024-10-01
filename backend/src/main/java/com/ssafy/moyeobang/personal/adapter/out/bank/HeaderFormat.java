package com.ssafy.moyeobang.personal.adapter.out.bank;

import lombok.*;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class HeaderFormat {

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

    public static HeaderFormat createHeader(String userKey, String apiName, LocalDateTime transmissionDateTime){

        return HeaderFormat.builder()
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

    @Builder
    public HeaderFormat(String apiName,
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

