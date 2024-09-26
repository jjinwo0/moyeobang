package com.ssafy.moyeobang.payment.adapter.out.bank;

import static org.springframework.http.MediaType.APPLICATION_JSON;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssafy.moyeobang.payment.error.ErrorCode;
import com.ssafy.moyeobang.payment.error.PaymentException;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.client.RestClient;

@Slf4j
abstract class RestClientUtils {

    private static final ObjectMapper MAPPER = objectMapper();

    public static JsonNode post(String uri, Object request) {
        try {
            String responseBody = restClient().post()
                    .uri(uri)
                    .contentType(APPLICATION_JSON)
                    .body(request)
                    .retrieve()
                    .body(String.class);

            return MAPPER.readTree(responseBody);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public static void postWithoutResponse(String uri, Object request) {
        String responseBody = restClient().post()
                .uri(uri)
                .contentType(APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(String.class);
        try {
            JsonNode jsonResponse = MAPPER.readTree(responseBody);
            if (!"H0000".equals(jsonResponse.get("Header").get("responseCode").asText())) {
                log.info("Error in SSAFY Bank");
                throw new PaymentException(ErrorCode.TRAVEL_ACCOUNT_CANNOT_ACCESS);
            }
        } catch (JsonProcessingException e) {
            log.info("JSON parsing error");
        }
    }

    public static <T> List<T> postConvertResponseToList(String uri, Object request, Class<T> clazz) {
        return MAPPER.convertValue(
                post(uri, request).path("REC").path("list"),
                MAPPER.getTypeFactory().constructCollectionType(List.class, clazz)
        );
    }

    private static RestClient restClient() {
        return RestClient.builder()
                .baseUrl("https://finopenapi.ssafy.io/ssafy/api/v1/edu")
                .build();
    }

    private static ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        return objectMapper;
    }
}
