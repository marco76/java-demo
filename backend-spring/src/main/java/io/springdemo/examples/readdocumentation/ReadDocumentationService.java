package io.springdemo.examples.readdocumentation;

import org.springframework.cache.annotation.Cacheable;

import java.net.MalformedURLException;

public interface ReadDocumentationService {
    String readClassPathFile(String documentPath);

    @Cacheable("DocumentCloud")
    String readCloudFile(String documentPath) throws MalformedURLException;

    @Cacheable("DocumentCloud")
    String readGitFile(String documentPath) throws MalformedURLException;


}
