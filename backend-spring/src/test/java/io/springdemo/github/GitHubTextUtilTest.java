package io.springdemo.github;

import org.junit.Assert;
import org.junit.Test;

public class GitHubTextUtilTest {

    @Test
    public void readTextTest() {
        String result = GitHubTextUtil.findStartingChar("---aaa ---Text of the document");
        Assert.assertEquals("Text of the document", result);
    }

    @Test
    public void replaceImages() {
        String result = GitHubTextUtil.replaceImages("aaa {{site.baseurl}}/bla/bla", "https://mycoolwebsite.com");
        Assert.assertEquals("aaa https://mycoolwebsite.com/bla/bla", result);
    }
}
