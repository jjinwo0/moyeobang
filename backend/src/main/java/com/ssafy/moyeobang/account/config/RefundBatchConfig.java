package com.ssafy.moyeobang.account.config;

import com.ssafy.moyeobang.account.application.service.RefundMoneyService;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.support.DefaultBatchConfiguration;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@RequiredArgsConstructor
public class RefundBatchConfig extends DefaultBatchConfiguration {

    private final RefundMoneyService refundMoneyService;

    @Bean
    public Job refundJob(JobRepository jobRepository,
                         PlatformTransactionManager transactionManager) {

        return new JobBuilder("refundJob", jobRepository)
                .start(refundStep(jobRepository, transactionManager))
                .build();
    }

    @Bean
    public Step refundStep(JobRepository jobRepository, PlatformTransactionManager transactionManager) {

        return new StepBuilder("refundStep", jobRepository)
                .tasklet(refundTasklet(), transactionManager)
                .build();
    }

    @Bean
    public Tasklet refundTasklet() {
        return ((contribution, chunkContext) -> {
            Long travelAccountId = (Long) chunkContext.getStepContext().getJobParameters().get("travelAccountId");

            // 환불 로직 실행
            refundMoneyService.refundMoney(travelAccountId);

            return RepeatStatus.FINISHED;
        });
    }
}
