package io.javademo.examples.readFile;

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
public class ReadFileService {

    private final static String JSR_STATUS_FILE = "/jsr-status.json";
    private final static String STATUS_URL = "https://s3.eu-central-1.amazonaws.com/io.javademo/jsr-status.json";

    private String cachedData;

    @Lock(LockType.READ)
    public String getData() {
        return cachedData;
    }

    private String readUrl() throws IOException {
        URL url = new URL(STATUS_URL);
        Stream<String> lines = new BufferedReader(
                new InputStreamReader(url.openStream(), "UTF-8")).lines();

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
