package com.ssafy.moyeobang.settle.application.service;

import com.ssafy.moyeobang.settle.application.domain.order.Order;
import com.ssafy.moyeobang.settle.application.domain.order.Order.OrderInfo;
import com.ssafy.moyeobang.settle.application.port.in.SettleCommand;
import com.ssafy.moyeobang.settle.application.port.out.CreateMemberOrderHistoryPort;
import com.ssafy.moyeobang.settle.application.port.out.CreateOrderPort;
import com.ssafy.moyeobang.settle.application.port.out.UpdateMemberTravelPort;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SettleServiceTest {

    @Mock
    private CreateOrderPort createOrderPort;

    @Mock
    private CreateMemberOrderHistoryPort createMemberOrderHistoryPort;

    @Mock
    private UpdateMemberTravelPort updateMemberTravelPort;

    @InjectMocks
    private SettleService settleService;

    private SettleCommand settleCommand;

    @BeforeEach
    void setUp() {

        // 요청 데이터
        settleCommand = new SettleCommand(
                10L,
                100L,
                "testTransaction",
                10000,
                List.of(1L, 2L, 3L)
        );
    }

    @Test
    @DisplayName("주문 건 당 참여자 별 정산 후 개별 예산 수정")
    void 주문_건당_회원별_정산() {

        // given: 주문 정보
        Order order = Order.of(
                1L, // Order ID
                new OrderInfo(
                        "testOrder", // 주문 정보
                        10000, // 주문 가격
                        100L // 거래 내역 ID
                ),
                List.of(1L, 2L, 3L) // 소비 참여자 ID
        );

        // createOrder가 호출되면 order 객체 return (인자값 -> OrderInfo Type)
        when(createOrderPort.createOrder(any(OrderInfo.class))).thenReturn(order);

        // when: balanceSettle 메서드 로직 실행
        boolean result = settleService.balanceSettle(settleCommand);

        // then: balanceSettle 호출에 대한 예상 동작 정의
        // createOrderPort의 createOrder 메서드가 1번 호출되는지 확인
        verify(createOrderPort, times(1)).createOrder(any(OrderInfo.class));

        // createMemberOrderHistoryPort의 createMemberOrderHistory 메서드가 회원 별로 각 1번씩 총 3번 호출되는지 확인
        verify(createMemberOrderHistoryPort, times(3)).createMemberOrderHistory(eq(10000), any());

        // updateMemberTravelPort decreaseMemberTravelAmount 메서드가 회원 별로 각 1번씩 총 3번 호출되는지 확인
        verify(updateMemberTravelPort, times(3)).decreaseMemberTravelAmount(eq(10000), anyLong(), anyLong());

        // balanceSettle 메서드의 결과가 true인지 확인
        assertThat(result).isTrue();
    }

    @Test
    @DisplayName("정산 로직에 호출된 회원의 ID값 검증")
    void 호출_회원_식별자_테스트() {

        // given: 주문 정보
        Order order = Order.of(
                1L, // Order ID
                new OrderInfo(
                        "testOrder", // 주문 정보
                        10000, // 주문 가격
                        100L // 거래 내역 ID
                ),
                List.of(1L, 2L, 3L) // 소비 참여자 ID
        );

        // createOrder가 호출되면 order 객체 return (인자값 -> OrderInfo Type)
        when(createOrderPort.createOrder(any(OrderInfo.class))).thenReturn(order);

        // when: balanceSettle 메서드 호출
        boolean result = settleService.balanceSettle(settleCommand);

        // then: 각 참여자에 대해 CreateMemberOrderHistoryPort와 UpdateMemberTravelPort 호출 확인
        // 거래 참여자의 ID값을 담아두기 위한 captor 선언
        ArgumentCaptor<Long> idCaptor = ArgumentCaptor.forClass(Long.class);

        // 호출되는 메서드 검증
        verify(createMemberOrderHistoryPort, times(3)).createMemberOrderHistory(eq(10000), any());
        // 호출 시 참여하는 회원의 ID값 captor 적재
        verify(updateMemberTravelPort, times(3)).decreaseMemberTravelAmount(eq(10000), idCaptor.capture(), anyLong());

        // 주문 참여자 ID 확보
        List<Long> allIds = idCaptor.getAllValues();

        // 주문 참여자 ID 검증
        assertThat(allIds).containsExactlyInAnyOrder(1L, 2L, 3L);

        // 메서드 처리 검증
        assertThat(result).isTrue();
    }
}