package com.characterBuilder.controller;

import com.characterBuilder.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthService service;

//    @PostMapping("/register")
//    public ResponseEntity<String> register(
//            @RequestBody RegisterRequest request
//    ) {
//        return ResponseEntity.ok(service.register(request));
//    }



    @GetMapping("/refresh")
    public ResponseEntity<String> refresh(
            @RequestHeader("Authorization") String header
    ) {
        final String token = header.substring(7);
        return ResponseEntity.ok(service.refresh(token));
    }
}
