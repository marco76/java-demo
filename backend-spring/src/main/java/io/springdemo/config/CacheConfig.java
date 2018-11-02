package io.springdemo.config;

import com.hazelcast.config.Config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//@Configuration
// hazelcast has problems with our cloud config
public class CacheConfig {

    @Bean
    public Config config() {
        return new Config();
    }
}
