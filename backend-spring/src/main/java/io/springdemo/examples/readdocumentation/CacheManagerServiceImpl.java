package io.springdemo.examples.readdocumentation;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CacheManagerServiceImpl implements CacheManagerService{

    @Override
    @Scheduled(fixedRate = 1000*60*60*24, initialDelay = 1000*60*60*24)
    @CacheEvict(value = "DocumentCloud", allEntries = true)
    public void cleanCache(){
        log.info("It's time to clean the cache of the documents");
    }
}
