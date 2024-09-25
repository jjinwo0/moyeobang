package com.ssafy.moyeobang.docs;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.moyeobang.account.application.port.in.CreateAccountUseCase;
import com.ssafy.moyeobang.account.application.port.in.GetAccountBalanceQuery;
import com.ssafy.moyeobang.account.application.port.in.GetAccountMemberBalanceQuery;
import com.ssafy.moyeobang.account.application.port.in.GetTransactionHistoriesQuery;
import com.ssafy.moyeobang.account.application.port.in.GetTransactionHistoryQuery;
import com.ssafy.moyeobang.account.application.port.in.SendMoneyUseCase;
import com.ssafy.moyeobang.travel.application.port.in.CheckQuizAnswerUseCase;
import com.ssafy.moyeobang.travel.application.port.in.CreateTravelUseCase;
import com.ssafy.moyeobang.travel.application.port.in.GetQuizQuestionQuery;
import com.ssafy.moyeobang.travel.application.port.in.GetTravelsQuery;
import com.ssafy.moyeobang.travel.application.port.in.UpdateTravelUseCase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest
@ExtendWith(RestDocumentationExtension.class)
public abstract class RestDocsSupport {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    protected ObjectMapper objectMapper;

    protected MockMvc mockMvc;

    @BeforeEach
    void setUp(RestDocumentationContextProvider provider) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .apply(documentationConfiguration(provider))
                .build();
    }

    @MockBean
    protected CheckQuizAnswerUseCase checkQuizAnswerUseCase;

    @MockBean
    protected CreateAccountUseCase createAccountUseCase;

    @MockBean
    protected CreateTravelUseCase createTravelUseCase;

    @MockBean
    protected GetAccountBalanceQuery getAccountBalanceQuery;

    @MockBean
    protected GetAccountMemberBalanceQuery getAccountMemberBalanceQuery;

    @MockBean
    protected GetQuizQuestionQuery getQuizQuestionQuery;

    @MockBean
    protected GetTransactionHistoriesQuery getTransactionHistoriesQuery;

    @MockBean
    protected GetTransactionHistoryQuery getTransactionHistoryQuery;

    @MockBean
    protected GetTravelsQuery getTravelsQuery;

    @MockBean
    protected SendMoneyUseCase sendMoneyUseCase;

    @MockBean
    protected UpdateTravelUseCase updateTravelUseCase;

}