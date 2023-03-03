package com.characterBuilder.controller;

import com.characterBuilder.payload.GreetingResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/greetings")
public class GreetingsController {
    @GetMapping
    public ResponseEntity<GreetingResponse> sayHello() {
        GreetingResponse response = new GreetingResponse("Hello from our API");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/say-good-bye")
    public ResponseEntity<GreetingResponse> sayGoodbye() {
        GreetingResponse response = new GreetingResponse("Goodbye from our API");
        return ResponseEntity.ok(response);
    }
}
