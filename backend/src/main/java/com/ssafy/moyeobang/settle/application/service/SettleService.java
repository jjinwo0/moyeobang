package com.ssafy.moyeobang.settle.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.settle.application.domain.order.MemberOrderHistory;
import com.ssafy.moyeobang.settle.application.domain.order.MemberOrderHistory.MappingInfo;
import com.ssafy.moyeobang.settle.application.domain.order.Order;
import com.ssafy.moyeobang.settle.application.domain.order.Order.OrderInfo;
import com.ssafy.moyeobang.settle.application.port.in.CustomSettleCommand;
import com.ssafy.moyeobang.settle.application.port.in.SettleCommand;
import com.ssafy.moyeobang.settle.application.port.in.SettleUseCase;
import com.ssafy.moyeobang.settle.application.port.out.*;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class SettleService implements SettleUseCase {

    private final CreateOrderPort createOrderPort;

    private final CreateMemberOrderHistoryPort createMemberOrderHistoryPort;

    private final UpdateMemberTravelPort updateMemberTravelPort;

    private final FindOrderPort findOrderPort;

    private final UpdateOrderPort updateOrderPort;

    private final LoadMemberOrderHistoryPort loadMemberOrderHistoryPort;

    private final UpdateMemberOrderHistoryPort updateMemberOrderHistoryPort;

    private final UpdateWithdrawPort updateWithdrawPort;

    @Override
    public boolean balanceSettle(SettleCommand command) {

        /*
        1. Order 객체를 만든다 OK
        2. OrderHistory에 Member 정보와 Order 정보를 넣는다.
        3. MemberTravel의 개인 예산에 사용 금액을 update한다.
         */
//        int amount = calculateAmount(command.amount(), command.participants().size());

        Order order = createOrderPort.createOrder(
                new OrderInfo(
                        command.title(),
                        command.amount(),
                        command.transactionId()
                )
        );

        command.participants().stream().forEach(id -> {
            createMemberOrderHistoryPort
                    .createMemberOrderHistory(command.amount(), new MappingInfo(id, order.getId()));

            updateMemberTravelPort
                    .decreaseMemberTravelAmount(command.amount(), id, command.travelId());
        });

        updateWithdrawPort.updateWithdrawToReceipt(command.transactionId());

        return true;
    }

    // todo: 입력 양식만 다를 뿐 사실상 boiler code
    @Override
    public boolean customBalanceSettle(CustomSettleCommand command) {

        Order order = createOrderPort.createOrder(
                new OrderInfo(
                        command.title(),
                        command.money(),
                        command.transactionId()
                )
        );

        createMemberOrderHistoryPort.createMemberOrderHistory(
                command.money(),
                new MappingInfo(
                        command.memberId(),
                        order.getId())
        );

        updateMemberTravelPort.decreaseMemberTravelAmount(
                command.money(),
                command.memberId(),
                command.travelId()
        );

        updateWithdrawPort.updateWithdrawToCustom(command.transactionId());

        return true;
    }

    @Override
    public boolean updateBalanceSettle(Long transactionId, Long travelId) {

        List<Order> findOrderList = findOrderPort.findOrderListByTransactionId(transactionId);

        findOrderList.forEach(
                order -> rollbackOrder(order, order.getOrderInfo().amount(), travelId)
        );

//        findOrderList.forEach(
//                order -> {
//                    order.getMemberOrderHistories().forEach(
//                            id -> {
//                                MemberOrderHistory findHistory = loadMemberOrderHistoryPort.findById(id);
//                                updateMemberTravelPort.addMemberTravelAmount(findHistory.getAmount(), findHistory.getMappingInfo().memberId(), travelId);
//                                updateMemberOrderHistoryPort.deleteMemberOrderHistory(id);
//                            }
//                    );
//                }
//        );

        return true;
    }

    @Override
    public boolean updateBalanceSettleInCustom(Long transactionId, Long travelId) {

        List<Order> findOrderList = findOrderPort.findOrderListByTransactionId(transactionId);

        findOrderList.forEach(
                order -> rollbackOrder(order, order.getOrderInfo().amount(), travelId)
        );

        return true;
    }

    private int calculateAmount(Integer amount, Integer size) {

        return (int) amount / size;
    }

    private void rollbackOrder(Order order, Integer amount, Long travelId) {

        List<MemberOrderHistory> findHistoryList = loadMemberOrderHistoryPort.findByOrderId(order.getId());

        updateOrderPort.deleteOrder(order.getId());

        // 기존 개임 결제내역 delete
        // 개인별 정산 금액 rollback
        findHistoryList.forEach(
                history -> {
                    updateMemberTravelPort.addMemberTravelAmount(amount, history.getMappingInfo().memberId(), travelId);
                    updateMemberOrderHistoryPort.deleteMemberOrderHistory(history.getId());
                }
        );
    }
}
