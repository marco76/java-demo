package io.springdemo.controller.parameters;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class ParametersController {

    @Value("${platform.welcome.message}")
    private String welcomeMessage;

    @RequestMapping(value = "/rest/parameter/welcome", method = RequestMethod.GET)
    public ResponseEntity<String> getDocument() {
        return ResponseEntity.ok(welcomeMessage);
    }
}
