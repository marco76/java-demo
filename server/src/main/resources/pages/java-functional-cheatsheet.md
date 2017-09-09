## Read the content of a file

``` java
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
```
