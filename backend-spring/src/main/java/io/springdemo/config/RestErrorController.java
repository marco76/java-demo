package io.springdemo.config;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class RestErrorController implements ErrorController {

    private static final Logger LOGGER = LoggerFactory.getLogger(RestErrorController.class);

    private static final String ERROR_PATH = "/error";
    private static final String TARGET_PATH = "forward:/";

    @RequestMapping(value = "/error")
    public String error() {
        LOGGER.warn("path error");

        return TARGET_PATH;
    }

    @Override
    public String getErrorPath() {
        return ERROR_PATH;
    }
}
