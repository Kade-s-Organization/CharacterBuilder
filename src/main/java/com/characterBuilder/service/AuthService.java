package com.characterBuilder.service;

import com.characterBuilder.payload.AuthRequestDto;

public interface AuthService {
    String authenticate(AuthRequestDto request);

    String refresh(String token);
}
