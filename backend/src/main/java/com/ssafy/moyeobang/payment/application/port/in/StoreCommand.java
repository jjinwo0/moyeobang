package com.ssafy.moyeobang.payment.application.port.in;

import com.ssafy.moyeobang.payment.application.domain.Store;

public interface StoreCommand {
    Store toDomain();
}
