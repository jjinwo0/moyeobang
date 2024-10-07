package com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule;

import com.ssafy.moyeobang.common.persistenceentity.withdraw.SettleType;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class WithdrawInfo {
    private Long withdrawId;
    private String withdrawTitle;
    private LocalDateTime createdAt;
    private Long amount;
    private Double latitude;
    private Double longitude;
    private String paymentRequestId;
    private SettleType settleType;
}
