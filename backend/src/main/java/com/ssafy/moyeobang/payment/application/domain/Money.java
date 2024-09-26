package com.ssafy.moyeobang.payment.application.domain;

import static lombok.AccessLevel.PRIVATE;

import java.math.BigInteger;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@ToString
@EqualsAndHashCode
@AllArgsConstructor(access = PRIVATE)
public class Money {

    public static final Money ZERO = Money.of(0L);

    private final BigInteger amount;

    public static Money of(long value) {
        return new Money(BigInteger.valueOf(value));
    }

    public static Money subtract(Money a, Money b) {
        return new Money(a.amount.subtract(b.amount));
    }

    public Money divide(int size) {
        return new Money(this.amount.divide(BigInteger.valueOf(size)));
    }

    public boolean isPositiveOrZero() {
        return this.amount.compareTo(BigInteger.ZERO) >= 0;
    }

    public long getAmount() {
        return amount.longValue();
    }
}
