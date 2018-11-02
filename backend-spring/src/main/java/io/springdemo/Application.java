package io.springdemo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

/**
 * Created by marcomolteni on 10.04.17.
 */
    @SpringBootApplication
    @EnableCaching
    @EnableAspectJAutoProxy
    public class Application {
        public static void main(String [] args){
            SpringApplication.run(Application.class, args);
        }
    }
