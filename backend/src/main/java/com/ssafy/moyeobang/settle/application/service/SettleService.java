package com.ssafy.moyeobang.settle.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.settle.application.domain.order.MemberOrderHistory.MappingInfo;
import com.ssafy.moyeobang.settle.application.domain.order.Order;
import com.ssafy.moyeobang.settle.application.domain.order.Order.OrderInfo;
import com.ssafy.moyeobang.settle.application.port.in.CustomSettleCommand;
import com.ssafy.moyeobang.settle.application.port.in.SettleCommand;
import com.ssafy.moyeobang.settle.application.port.in.SettleUseCase;
import com.ssafy.moyeobang.settle.application.port.out.CreateMemberOrderHistoryPort;
import com.ssafy.moyeobang.settle.application.port.out.CreateOrderPort;
import com.ssafy.moyeobang.settle.application.port.out.UpdateMemberTravelPort;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class SettleService implements SettleUseCase {

    private final CreateOrderPort createOrderPort;

    private final CreateMemberOrderHistoryPort createMemberOrderHistoryPort;

    private final UpdateMemberTravelPort updateMemberTravelPort;

    @Override
    public boolean balanceSettle(SettleCommand command) {

        /*
        1. Order 객체를 만든다 OK
        2. OrderHistory에 Member 정보와 Order 정보를 넣는다.
        3. MemberTravel의 개인 예산에 사용 금액을 update한다.
         */

        Order order = createOrderPort.createOrder(
                new OrderInfo(
                        command.title(),
                        command.amount(), // 이미 계산해서 보내는 금액
                        command.transactionId()
                )
        );

        command.participants().stream().forEach(id -> {
            createMemberOrderHistoryPort
                    .createMemberOrderHistory(command.amount(), new MappingInfo(id, order.getId()));

            updateMemberTravelPort
                    .decreaseMemberTravelAmount(command.amount(), id, order.getId());
        });

        return true;
    }

    // todo: 입력 양식만 다를 뿐 사실상 boiler code
    @Override
    public boolean customBalanceSettle(CustomSettleCommand command) {

        Order order = createOrderPort.createOrder(
                new OrderInfo(
                        command.title(),
                        command.amount(),
                        command.transactionId()
                )
        );

        createMemberOrderHistoryPort.createMemberOrderHistory(
                command.amount(),
                new MappingInfo(
                        command.memberId(),
                        order.getId())
        );

        updateMemberTravelPort.decreaseMemberTravelAmount(
                command.amount(),
                command.memberId(),
                order.getId()
        );

        return true;
    }
}
