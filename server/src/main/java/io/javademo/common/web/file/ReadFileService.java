package io.javademo.common.web.file;

import javax.ejb.Stateless;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Stateless
public class ReadFileService {

    public String getContentFromFile(String path) {
        Stream<String> lines = new BufferedReader(new InputStreamReader(getClass().getClassLoader()
                .getResourceAsStream(path))).lines();

        return lines.map(Object::toString).collect(Collectors.joining());
    }
}
