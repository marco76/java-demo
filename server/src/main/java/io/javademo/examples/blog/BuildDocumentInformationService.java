package io.javademo.examples.blog;

import io.javademo.common.web.file.ReadFileService;


import javax.cache.Cache;
import javax.cache.CacheManager;
import javax.cache.Caching;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.validation.constraints.NotNull;
import java.io.IOException;

@Stateless
public class BuildDocumentInformationService {

    private String DEFAULT_PATH = "/pages/";
    private String TYPE_MARKDOWN = ".md";

    @Inject
    private ReadFileService readFileService;

    public DocumentInfoBean getDocument(@NotNull String name) throws IOException {

        DocumentInfoBean resultDocument = null;

        try (CacheManager cacheManager = Caching.getCachingProvider().getCacheManager()) {

            Cache<String, DocumentInfoBean> cache = cacheManager.getCache("documents", String.class, DocumentInfoBean.class);

            if (cache.containsKey(name)) {
                resultDocument = cache.get(name);
            } else {
                resultDocument = new DocumentInfoBean();
                resultDocument.setContent(readFileService.getContentFromFile(DEFAULT_PATH + name + TYPE_MARKDOWN));

                cache.put(name, resultDocument);
            }
        }

        return resultDocument;
    }
}
