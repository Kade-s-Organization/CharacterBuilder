package com.characterBuilder.controller;

import com.characterBuilder.entity.User;
import com.characterBuilder.payload.UserDto;
import com.characterBuilder.security.JwtTokenProvider;
import com.characterBuilder.service.AuthService;
import com.characterBuilder.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final JwtTokenProvider jwtTokenProvider;
    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody UserDto userDto) {
        User user = userService.signUpUser(userDto);
        UserDetails userDetails = userService.loadUserByUsername(user.getUsername());
        Map<String, String> tokens = jwtTokenProvider.getTokensFromUserDetails(user);
        return ResponseEntity.ok(tokens);
    }



    @GetMapping("/refresh")
    public ResponseEntity<String> refresh(
            @RequestHeader("Authorization") String header
    ) {
        final String token = header.substring(7);
        return ResponseEntity.ok(authService.refresh(token));
    }
}
