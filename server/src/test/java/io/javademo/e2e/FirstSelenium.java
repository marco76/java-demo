package io.javademo.e2e;

import org.apache.commons.io.FileUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.safari.SafariDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.io.IOException;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class FirstSelenium {

    private String baseUrl = "http://google.ch";
    private WebDriver driver;
    private ScreenshotHelper screenshotHelper;

    @Before
    public void openBrowser() {
        baseUrl = System.getProperty("webdriver.base.url");
        driver = new SafariDriver();
        driver.get(baseUrl);
        screenshotHelper = new ScreenshotHelper();
    }

    @After
    public void saveScreenshotAndCloseBrowser() throws IOException {
//        screenshotHelper.saveScreenshot("screenshot.png");
        driver.quit();
    }

    @Test
    public void pageTitleAfterSearchShouldBeginWithDrupal() throws IOException {
        assertEquals("The page title should equal Google at the start of the test.", "Google", driver.getTitle());
        WebElement searchField = driver.findElement(By.name("q"));
        searchField.sendKeys("Drupal!");
        searchField.submit();

        driver.quit();

    }

    private class ScreenshotHelper {

        public void saveScreenshot(String screenshotFileName) throws IOException {
            File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
            FileUtils.copyFile(screenshot, new File(screenshotFileName));
        }
    }
}
