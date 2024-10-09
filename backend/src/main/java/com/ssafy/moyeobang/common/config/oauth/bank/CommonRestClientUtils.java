package com.ssafy.moyeobang.common.config.oauth.bank;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.web.client.RestClient;

import static org.springframework.http.MediaType.APPLICATION_JSON;

abstract class CommonRestClientUtils {

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

    public static JsonNode postWithBaseUrl(String baseUrl, Object request) {
        try {
            String responseBody = restClient(baseUrl).post()
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
        restClient().post()
                .uri(uri)
                .contentType(APPLICATION_JSON)
                .body(request)
                .retrieve();
    }

    private static RestClient restClient() {
        return RestClient.builder()
                .baseUrl("https://finopenapi.ssafy.io/ssafy/api/v1/edu")
                .build();
    }

    private static RestClient restClient(String baseUrl) {
        return RestClient.builder()
                .baseUrl(baseUrl)
                .build();
    }

    private static ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        return objectMapper;
    }
}