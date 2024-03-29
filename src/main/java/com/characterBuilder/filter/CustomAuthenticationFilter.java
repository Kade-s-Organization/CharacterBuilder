package com.characterBuilder.filter;

import com.characterBuilder.security.JwtTokenProvider;
import com.characterBuilder.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.characterBuilder.payload.AuthRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RequiredArgsConstructor
@Slf4j
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            AuthRequestDto authRequestDto = new ObjectMapper().readValue(request.getInputStream(), AuthRequestDto.class);
            String email = authRequestDto.getEmail();
            String password = authRequestDto.getPassword();
            log.info("email is: {}", email);
            log.info("Password is: {}", password);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);
            return authenticationManager.authenticate(authenticationToken);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    // this filter will be applied to /api/v1/authenticate in the security config. The client sends a post request with the email and password in the body to this endpoint. The attemptAuthentication method is called, the credentials are used to create a token, the token is used to return an authentication object. If the authentication is successful, this object is passed into the successfulAuthentication method below. It contains the details and persmissions of the authenticated user.

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        UserDetails user = (UserDetails) authResult.getPrincipal();
        Map<String, String> tokens = jwtTokenProvider.getTokensFromUserDetails(user);
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);
    }


    //TODO stop brute force attacks by limiting unsuccesful attempts

//    @Override
//    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
//        super.unsuccessfulAuthentication(request, response, failed);
//    }
}
