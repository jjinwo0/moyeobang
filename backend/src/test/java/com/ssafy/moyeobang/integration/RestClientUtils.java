package com.ssafy.moyeobang.integration;

import static org.springframework.http.MediaType.APPLICATION_JSON;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

abstract class RestClientUtils {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static String getSseEventStream(int port, String uri) {
        return restClient(port).get()
                .uri(uri)
                .accept(MediaType.TEXT_EVENT_STREAM)
                .retrieve()
                .body(String.class);
    }

    public static JsonNode get(int port, String uri) {
        try {
            String responseBody = restClient(port).get()
                    .uri(uri)
                    .retrieve()
                    .body(String.class);

            return MAPPER.readTree(responseBody);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public static JsonNode post(int port, String uri, Object request) {
        try {
            String responseBody = restClient(port).post()
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

    public static JsonNode postWithMultipart(int port, String uri, Object jsonRequest, MultipartFile imageFile) {
        try {
            HttpHeaders jsonHeaders = new HttpHeaders();
            jsonHeaders.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Object> jsonPart = new HttpEntity<>(jsonRequest, jsonHeaders);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("data", jsonPart);

            if (imageFile != null) {
                body.add("image", imageFile.getResource());
            }

            String responseBody = restClient(port).post()
                    .uri(uri)
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .body(body)
                    .retrieve()
                    .body(String.class);

            return MAPPER.readTree(responseBody);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }


    public static JsonNode patch(int port, String uri) {
        try {
            String responseBody = restClient(port).patch()
                    .uri(uri)
                    .contentType(APPLICATION_JSON)
                    .retrieve()
                    .body(String.class);

            return MAPPER.readTree(responseBody);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public static JsonNode delete(int port, String uri) {
        try {
            String responseBody = restClient(port).delete()
                    .uri(uri)
                    .retrieve()
                    .body(String.class);

            return MAPPER.readTree(responseBody);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }


    private static RestClient restClient(int port) {
        return RestClient.builder()
                .baseUrl("http://localhost:" + port)
                .build();
    }
}
