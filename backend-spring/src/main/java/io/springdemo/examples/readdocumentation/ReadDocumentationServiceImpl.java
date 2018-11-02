package io.springdemo.examples.readdocumentation;

import io.springdemo.github.GitHubTextUtil;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;

/**
 * Created by marcomolteni on 07.04.17.
 */

@Service
@Slf4j
public class ReadDocumentationServiceImpl implements ReadDocumentationService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("${app.server.directory.documents}")
    private String directoryPath;

    @Value("${cloud.document.path}")
    private String cloudPath;

    @Value("${git.document.path}")
    private String gitPath;

    @Value("${github.path.raw}")
    private String githubAbsolutePath;

    @Override
    @Cacheable("Document")
    public String readClassPathFile(final String documentPath) {
        log.info("Start -> readClassPathFile : {}", documentPath);

        String result = "";

        ClassPathResource cpr = new ClassPathResource(directoryPath + documentPath);
        try {
            byte[] bdata = FileCopyUtils.copyToByteArray(cpr.getInputStream());
            result = new String(bdata, StandardCharsets.UTF_8);
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
        }

        return result;
    }

    @Override
    @Cacheable("DocumentCloud")
    public String readCloudFile(final String documentPath) throws MalformedURLException {
        log.info("Start -> readCloudFile : {}", documentPath);


        String result = "";

        URL url = new URL(cloudPath + documentPath);
        try {
            byte[] bdata = FileCopyUtils.copyToByteArray(url.openStream());
            result = new String(bdata, StandardCharsets.UTF_8);
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
        }

        return result;
    }

    @Override
    @Cacheable("DocumentCloud")
    public String readGitFile(final String documentPath) throws MalformedURLException {
        log.info("Start -> readGitFile : {}", documentPath);

        String result = "";

        URL url = new URL(gitPath + documentPath);
        try {
            byte[] bdata = FileCopyUtils.copyToByteArray(url.openStream());
            result = new String(bdata, StandardCharsets.UTF_8);
            result = GitHubTextUtil.findStartingChar(result);
            result = GitHubTextUtil.replaceImages(result, githubAbsolutePath);
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
        }

        return result;
    }
}