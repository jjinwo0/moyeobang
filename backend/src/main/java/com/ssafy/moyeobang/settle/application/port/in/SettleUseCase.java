package com.ssafy.moyeobang.settle.application.port.in;

public interface SettleUseCase {

    boolean balanceSettle(SettleCommand command);

    boolean customBalanceSettle(CustomSettleCommand command);
}
