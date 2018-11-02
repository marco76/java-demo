package io.springdemo.examples.readdocumentation;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

public interface CacheManagerService {
    void cleanCache();
}
