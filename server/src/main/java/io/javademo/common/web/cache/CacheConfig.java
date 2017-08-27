package io.javademo.common.web.cache;

import io.javademo.examples.blog.DocumentInfoBean;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.cache.CacheManager;
import javax.cache.Caching;
import javax.cache.configuration.MutableConfiguration;
import javax.cache.spi.CachingProvider;
import javax.ejb.Singleton;
import javax.ejb.Startup;

@Startup
@Singleton
public class CacheConfig {

    private CachingProvider cachingProvider;

    @PostConstruct
    public void init() {
           cachingProvider = Caching.getCachingProvider();
           CacheManager cacheManager = cachingProvider.getCacheManager();

            MutableConfiguration<String, DocumentInfoBean> configuration =
                    new MutableConfiguration<String, DocumentInfoBean>()
                            .setTypes(String.class, DocumentInfoBean.class)
                            .setStoreByValue(false);

            cacheManager.createCache("documents", configuration);

    }

    @PreDestroy
    public void close() {
        cachingProvider.close();
    }
}
