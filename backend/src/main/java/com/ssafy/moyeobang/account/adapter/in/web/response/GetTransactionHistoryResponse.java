package com.ssafy.moyeobang.account.adapter.in.web.response;

import com.ssafy.moyeobang.account.application.domain.travelaccount.Withdrawal;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public abstract class GetTransactionHistoryResponse {

    private final Long transactionId;
    private final String paymentName;
    private final String address;
    private final String acceptNumber;
    private final Long totalPrice;
    private final LocalDateTime createdAt;

    public static GetTransactionHistoryResponse ofType(Withdrawal withdrawal) {
        if ("RECEIPT".equals(withdrawal.getSettleType())) {
            return new GetReceiptTransactionHistoryResponse(withdrawal);
        }

        return new GetCustomTransactionHistoryResponse(withdrawal);
    }

    public abstract Object getDetails();

    public abstract String getSplitMethod();
}
