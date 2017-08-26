package io.javademo.examples.jsr;

import javax.annotation.PostConstruct;
import javax.ejb.Lock;
import javax.ejb.LockType;
import javax.ejb.Schedule;
import javax.ejb.Singleton;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Created by marcomolteni on 07.04.17.
 */
@Singleton
public class ReadDataService {

    private static final String JSR_STATUS_FILE = "/jsr-status.json";
    private static final String STATUS_URL = "https://s3.eu-central-1.amazonaws.com/io.javademo/jsr-status.json";
    private static final String UTF_8 = "UTF-8";

    private String cachedData;

    @Lock(LockType.READ)
    public String getData() {
        return cachedData;
    }

    private String readUrl() throws IOException {
        URL url = new URL(STATUS_URL);

        Stream<String> lines;

        // try-with-resources close the resource automatically
        try (BufferedReader bufferedReader = new BufferedReader(
                new InputStreamReader(url.openStream(), UTF_8))) {
            lines = bufferedReader.lines();
        }

        return lines.map(Object::toString).collect(Collectors.joining());
    }

    private String readClassPathFile() {

        Stream<String> lines = new BufferedReader(new InputStreamReader(getClass().getClassLoader()
                .getResourceAsStream(JSR_STATUS_FILE))).lines();

        return lines.map(Object::toString).collect(Collectors.joining());
    }


    @Schedule(hour = "2", persistent = false)
    @PostConstruct
    private void loadData() {
        try {
            cachedData = readUrl();
        } catch (IOException e) {
            cachedData = readClassPathFile();
        }
    }
}