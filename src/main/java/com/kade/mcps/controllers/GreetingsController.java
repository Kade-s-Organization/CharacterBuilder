package com.kade.mcps.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/greetings")
public class GreetingsController {
    @GetMapping
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello from our API");
    }

    @GetMapping("/say-good-bye")
    public ResponseEntity<String> sayGoodbye() {
        return ResponseEntity.ok("Goodbye from our API");
    }
}
