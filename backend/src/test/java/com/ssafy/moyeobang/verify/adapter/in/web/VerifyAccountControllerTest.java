package com.ssafy.moyeobang.verify.adapter.in.web;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.moyeobang.verify.adapter.in.web.request.CheckRequest;
import com.ssafy.moyeobang.verify.adapter.in.web.request.VerifyRequest;
import com.ssafy.moyeobang.verify.application.port.in.VerifyAccountUseCase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

class VerifyAccountControllerTest {

    @Mock
    private VerifyAccountUseCase verifyAccountUseCase;

    @InjectMocks
    private VerifyAccountController verifyAccountController;

    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(verifyAccountController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    @DisplayName("1원 송금 API 테스트")
    void 인증_1원_송금() throws Exception {
        // given
        String token = "Bearer sample-token";
        VerifyRequest verifyRequest = new VerifyRequest("1234567890", "싸피뱅크");

        when(verifyAccountUseCase.verifyAccount(token, verifyRequest.accountNumber(), verifyRequest.bankName()))
                .thenReturn(7L);

        // when
        mockMvc.perform(post("/api/auth/account/verify/initiate")
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(verifyRequest)))
                .andExpect(status().isOk());

        // then
        verify(verifyAccountUseCase, times(1))
                .verifyAccount(token, "1234567890", "싸피뱅크");
    }

    @Test
    @DisplayName("인증 코드 확인 테스트")
    void testCheckAuthCode() throws Exception {
        // given
        String token = "Bearer sample-token";
        CheckRequest checkRequest = new CheckRequest("1234567890", "123456");

        // mocking behavior
        when(verifyAccountUseCase.checkVerifyAccount(token, checkRequest.accountNumber(), checkRequest.authCode()))
                .thenReturn("Code Confirmed");

        // when & then
        mockMvc.perform(post("/api/auth/account/verify/confirm")
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(checkRequest)))
                .andExpect(status().isOk());

        verify(verifyAccountUseCase, times(1))
                .checkVerifyAccount(token, "1234567890", "123456");
    }
}