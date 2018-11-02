package io.springdemo.github;

/**
 * This class format correctly the text contained in GitHub
 */
public class GitHubTextUtil {

    private GitHubTextUtil() {
    }

    /**
     * The documents imported from github used with jekyll contains a technical header that
     * has to be excluded from the document delivered.
     * @param gitText text from git
     * @return text to show in the application
     */

    public static String findStartingChar(String gitText) {
        int headerStart = gitText.indexOf("---");
        if (headerStart > -1) {
            int headerEnd = gitText.indexOf("---", headerStart + 3);
            if (headerEnd > -1) {
                return gitText.substring(headerEnd + 3);
            }

        }
        return gitText;
    }

    /**
     * For Jekyll the images use a relative path, we have to convert this relative path in the absolute path of github.
     * @param result the webpage code
     * @param path the absolute path
     * @return the webpage with the absolute path
     */
    public static String replaceImages(String result, String path) {
        return result.replace("{{site.baseurl}}", path);
    }
}
