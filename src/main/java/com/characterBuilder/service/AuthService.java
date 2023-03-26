package com.characterBuilder.service;

import com.characterBuilder.entity.User;
import com.characterBuilder.payload.AuthRequestDto;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;

public interface AuthService {
    String authenticate(AuthRequestDto request);

    String refresh(String token);
}
