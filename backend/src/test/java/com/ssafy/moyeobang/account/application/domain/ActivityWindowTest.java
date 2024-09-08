package com.ssafy.moyeobang.account.application.domain;

import static java.time.LocalDateTime.now;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ActivityWindowTest {

    @DisplayName("거래 내역을 바탕으로 잔액을 계산한다.")
    @Test
    void calculateBalance() {
        //given
        Activity activity1 = createActivity("111", "111", "222", Money.of(5000));
        Activity activity2 = createActivity("111", "333", "111", Money.of(10000));
        Activity activity3 = createActivity("111", "111", "444", Money.of(3000));

        ActivityWindow activityWindow = new ActivityWindow(List.of(activity1, activity2, activity3));

        //when
        Money money = activityWindow.calculateBalance();

        //then
        assertThat(money).isEqualTo(Money.of(2000));
    }

    private static Activity createActivity(String ownerAccountNumber,
                                           String sourceAccountNumber,
                                           String targetAccountNumber,
                                           Money money) {
        return new Activity(ownerAccountNumber, sourceAccountNumber, targetAccountNumber, now(), money);
    }

}