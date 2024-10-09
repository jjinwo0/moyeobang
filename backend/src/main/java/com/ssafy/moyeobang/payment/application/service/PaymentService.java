package com.ssafy.moyeobang.payment.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleStatus;
import com.ssafy.moyeobang.common.util.LocationUtils;
import com.ssafy.moyeobang.payment.application.domain.Money;
import com.ssafy.moyeobang.payment.application.domain.ScheduleLocation;
import com.ssafy.moyeobang.payment.application.domain.Store;
import com.ssafy.moyeobang.payment.application.domain.TravelAccount;
import com.ssafy.moyeobang.payment.application.port.in.PaymentCommand;
import com.ssafy.moyeobang.payment.application.port.in.PaymentUseCase;
import com.ssafy.moyeobang.payment.application.port.out.ConfirmPaymentPort;
import com.ssafy.moyeobang.payment.application.port.out.LoadSchedulesPort;
import com.ssafy.moyeobang.payment.application.port.out.LoadTravelAccountPort;
import com.ssafy.moyeobang.payment.application.port.out.PaymentResult;
import com.ssafy.moyeobang.payment.application.port.out.ProcessPaymentPort;
import com.ssafy.moyeobang.payment.application.port.out.SsePort;
import com.ssafy.moyeobang.payment.application.port.out.UpdateMemberBalancePort;
import com.ssafy.moyeobang.payment.application.port.out.UpdateScheduleTransactionPort;
import com.ssafy.moyeobang.payment.error.ErrorCode;
import com.ssafy.moyeobang.payment.error.PaymentException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@UseCase
@RequiredArgsConstructor
public class PaymentService implements PaymentUseCase {

    private final SsePort ssePort;
    private final LoadSchedulesPort loadSchedulesPort;
    private final ConfirmPaymentPort confirmPaymentPort;
    private final ProcessPaymentPort processPaymentPort;
    private final LoadTravelAccountPort loadTravelAccountPort;
    private final UpdateMemberBalancePort updateMemberBalancePort;
    private final UpdateScheduleTransactionPort updateScheduleTransactionPort;
    private final LocationUtils locationUtils;

    @Override
    @Transactional
    public boolean confirmPayment(PaymentCommand command) {
        TravelAccount travelAccount = loadTravelAccountPort.loadTravelAccount(command.travelAccountNumber());

        boolean canPayment = !travelAccount.couldNotWithdraw(command.paymentRequestMoney());

        if (!canPayment) {
            ssePort.sendPaymentFailure(command.paymentRequestId(), "Payment failed");
            return false;
        }

        int travelMemberCount = loadTravelAccountPort.loadMemberCount(command.travelAccountNumber());

        Money splitMoney = command.paymentRequestMoney().divide(travelMemberCount);

        updateMemberBalancePort.updateMemberBalances(command.travelAccountNumber(), splitMoney);

        PaymentResult paymentResult = processPaymentPort.processPayment(travelAccount, command.toStoreDomain(),
                command.paymentRequestMoney(), command.paymentRequestId());
        log.info("confirmPayment, processPaymentPort => paymentResult : {}", paymentResult);
        List<ScheduleLocation> scheduleLocations = loadSchedulesPort.loadSchedules(travelAccount.getTravelId());

        int maxSequence = findMaxSequence(scheduleLocations);

        Store store = command.toStoreDomain();
        for (ScheduleLocation schedule : scheduleLocations) {
            if (schedule.getStatus() == ScheduleStatus.INCOMPLETE) {
                double distance = locationUtils.calculateDistance(schedule.getLatitude(), schedule.getLongitude(),
                        store.getLatitude(), store.getLongitude());
                if (distance <= 1) {
                    updateScheduleTransactionPort.matchingScheduleTransaction(schedule.getScheduleId(),
                            paymentResult.transactionId());
                    ssePort.sendPaymentSuccess(command.paymentRequestId(), paymentResult);
                    return true;
                }
            }
        }
        ssePort.sendPaymentSuccess(command.paymentRequestId(), paymentResult);
        updateScheduleTransactionPort.createUnmatchingScheduleTransaction(paymentResult.transactionId(),
                maxSequence + 1);
        return true;
    }

    private static int findMaxSequence(List<ScheduleLocation> scheduleLocations) {
        return scheduleLocations.stream()
                .mapToInt(ScheduleLocation::getSequence)
                .max()
                .orElse(0);
    }

    @Override
    @Transactional
    public PaymentResult processPayment(PaymentCommand command) {
        TravelAccount travelAccount = loadTravelAccountPort.loadTravelAccount(command.travelAccountNumber());

        boolean canPayment = !travelAccount.couldNotWithdraw(command.paymentRequestMoney());

        if (!canPayment) {
            confirmPaymentPort.confirmPaymentFailure(command.paymentRequestId());
            throw new PaymentException(ErrorCode.INSUFFICIENT_BALANCE_IN_TRAVEL_ACCOUNT);
        }

        int travelMemberCount = loadTravelAccountPort.loadMemberCount(command.travelAccountNumber());

        Money splitMoney = command.paymentRequestMoney().divide(travelMemberCount);

        updateMemberBalancePort.updateMemberBalances(command.travelAccountNumber(), splitMoney);

        PaymentResult paymentResult = processPaymentPort.processPayment(travelAccount, command.toStoreDomain(),
                command.paymentRequestMoney(), command.paymentRequestId());
        confirmPaymentPort.confirmPaymentSuccess(command.paymentRequestId());
        return paymentResult;
    }


}
