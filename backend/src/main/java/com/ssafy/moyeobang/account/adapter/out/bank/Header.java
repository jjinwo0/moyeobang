package com.ssafy.moyeobang.account.adapter.out.bank;

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
public class Header {

    private static final String API_KEY = "e218423b4af644c6ad9f3ae58e27af3c";
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

    public static Header withUserKey(String userKey, String apiName, LocalDateTime transmissionDateTime) {
        String institutionTransactionUniqueNo = new BigInteger(130, new SecureRandom())
                .toString(10)
                .substring(0, 20);

        return Header.builder()
                .apiName(apiName)
                .transmissionDate(transmissionDateTime.format(dateFormatter))
                .transmissionTime(transmissionDateTime.format(timeFormatter))
                .institutionCode("00100")
                .fintechAppNo("001")
                .apiServiceCode(apiName)
                .institutionTransactionUniqueNo(institutionTransactionUniqueNo)
                .apiKey(API_KEY)
                .userKey(userKey)
                .build();
    }

    @Builder(access = AccessLevel.PRIVATE)
    private Header(String apiName,
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
