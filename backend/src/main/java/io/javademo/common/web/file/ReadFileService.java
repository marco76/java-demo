package io.javademo.common.web.file;

import javax.ejb.Stateless;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

@Stateless
public class ReadFileService {

    private static final String UTF_8 = "UTF-8";

    public String getContentFromFile(String path) throws IOException {
        String lineDelimiter = "\n";
        String result;

        // try-with-resources close the resource automatically
        try (BufferedReader bufferedReader = new BufferedReader(
                new InputStreamReader(getClass().getClassLoader()
                        .getResourceAsStream(path), UTF_8))) {

            result = bufferedReader
                     .lines()
                     .map(Object::toString)
                     .collect(Collectors.joining(lineDelimiter));
        }

        return result;
    }
}