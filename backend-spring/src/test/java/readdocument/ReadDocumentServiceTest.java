package readdocument;

import io.springdemo.examples.readdocumentation.ReadDocumentationService;
import io.springdemo.examples.readdocumentation.ReadDocumentationServiceImpl;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@Import(ReadDocumentationServiceImpl.class)
// Override the test.properties file
@TestPropertySource(locations = "classpath:test.properties", properties = {
        "app.server.directory.documents=documents/",
})
public class ReadDocumentServiceTest {

    @Autowired
    ReadDocumentationService readDocumentationService;

    @Test
    public void readFileFromResource() {
        Assert.assertTrue(true);
        String result = readDocumentationService.readClassPathFile("simple.md");
        Assert.assertNotNull(result);
        Assert.assertTrue(result.startsWith("###"));
    }
}
