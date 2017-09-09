package io.javademo.e2e;

import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.safari.SafariDriver;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertEquals;

public class FirstSelenium {

    private static String baseUrl = "http://localhost:4200";
    private static WebDriver driver;

    @BeforeClass
    public static void openBrowser() {
        driver = new SafariDriver();
        driver.get(baseUrl);
        driver.manage().timeouts().implicitlyWait(2, TimeUnit.SECONDS);

    }

    @Test
    public void pageTitleTest() throws IOException {
        assertEquals("Page title test", "Java EE 8 Demo, powered by Angular", driver.getTitle());
    }

    @Test
    public void beanValidationSimpleTest() {
        driver.navigate().to(baseUrl + "/bv");

        driver.findElement(By.id("name")).sendKeys("Marco");
        driver.findElement(By.id("send")).click();
        WebElement error = driver.findElement(By.className("alert-danger"));
        Assert.assertTrue(error != null);
    }

    @Test
    public void beanValidationSimpleOkTest() {
        driver.navigate().to(baseUrl + "/bv");

        driver.findElement(By.id("name")).sendKeys("Marco");
        driver.findElement(By.id("email")).sendKeys("mail@mail.ch");
        driver.findElement(By.id("send")).click();
        WebElement error = driver.findElement(By.className("alert-success"));
        Assert.assertTrue(error != null);
    }

    @AfterClass
    public static void closeResources() {
        driver.close();
    }
}
