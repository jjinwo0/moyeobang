package com.ssafy.moyeobang.notification.adapter.out.bank.request;

import com.ssafy.moyeobang.notification.adapter.out.bank.HeaderFormatInNotification;

public record GetTransactionInfoRequest(HeaderFormatInNotification Header, String accountNo, Long transactionUniqueNo) {
}
