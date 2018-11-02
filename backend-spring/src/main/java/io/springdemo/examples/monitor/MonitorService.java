package io.springdemo.examples.monitor;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Component
@Aspect
@Slf4j
public class MonitorService {

    @Around("execution(* io.springdemo.examples..*Service.*(..))")
    public Object processSystemRequest(ProceedingJoinPoint pjp) throws Throwable {

        long start = System.currentTimeMillis();
        Object returnedValue = pjp.proceed();

        long end = System.currentTimeMillis();
        long differenceMs = end - start;

        log.info("Execution time {} - {} : {} mills", pjp.toShortString(), pjp.getArgs(), differenceMs);

        return returnedValue;
    }

}
