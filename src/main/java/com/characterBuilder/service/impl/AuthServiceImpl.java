package com.characterBuilder.service.impl;

import com.characterBuilder.entity.Role;
import com.characterBuilder.repository.UserRepository;
import com.characterBuilder.security.JwtTokenProvider;
import com.characterBuilder.entity.User;
import com.characterBuilder.payload.AuthRequestDto;
import com.characterBuilder.service.AuthService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

// https://www.javainuse.com/webseries/spring-security-jwt/chap7
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;


    @Override
    public String authenticate(AuthRequestDto request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = repository.findByUsername(request.getEmail()).orElseThrow();
        var jwtToken = jwtTokenProvider.generateAccessToken(user);
        return jwtToken;
    }

    @Override
    public String refresh(String token) {
        try {
            jwtTokenProvider.validateToken(token);
            String username = jwtTokenProvider.extractUsername(token);
            User user = repository.findByUsername(username).orElseThrow();
            String newToken = jwtTokenProvider.generateRefreshToken(user);
            return newToken;
        } catch (ExpiredJwtException e) {
            Claims claims = e.getClaims();
            String username = claims.getSubject();
            // If you can still use an expired token to authenticate via this refresh token then what's the point?
            // This line here authenticates them. If their permissions have changed, then it's applied at refresh
            User user = repository.findByUsername(username).orElseThrow();
            String newToken = jwtTokenProvider.generateRefreshToken(user);
            return newToken;
        }
    }

}

