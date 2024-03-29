package com.characterBuilder.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;

@Service
public class JwtTokenProvider {
    private String secret;
    private int jwtExpirationDateInMs;
    private int refreshExpirationDateInMs;


    @Value("${jwt.secret}")
    public void setSecret(String secret) {
        this.secret = secret;
    }

    @Value("${jwt.expirationDateInMs}")
    public void setJwtExpirationDateInMs(int jwtExpirationDateInMs) {
        this.jwtExpirationDateInMs = jwtExpirationDateInMs;
    }

    @Value("${jwt.refreshExpirationDateInMs}")
    public void setRefreshExpirationDateInMs(int refreshExpirationDateInMs) {
        this.refreshExpirationDateInMs = refreshExpirationDateInMs;
    }

    // TODO Handle exceptions for whitespace in the token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateAccessToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();

        Collection<? extends GrantedAuthority> roles = userDetails.getAuthorities();
        String role = roles.contains(new SimpleGrantedAuthority("ADMIN")) ? "ADMIN" : "USER";

        claims.put("role", role);

        return createAccessToken(claims, userDetails.getUsername());
    }

    public String generateRefreshToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();

        Collection<? extends GrantedAuthority> roles = userDetails.getAuthorities();
        String role = roles.contains(new SimpleGrantedAuthority("ADMIN")) ? "ADMIN" : "USER";

        claims.put("role", role);

        return createRefreshToken(claims, userDetails.getUsername());
    }


    public Map<String, String> getTokensFromUserDetails(UserDetails userDetails) {
        String access_token = generateAccessToken(userDetails);
        String refresh_token = generateRefreshToken(userDetails);
        Map<String, String> tokens = new HashMap<>();
        tokens.put("accessToken", access_token);
        tokens.put("refreshToken", refresh_token);
        return tokens;
    }

    private String createAccessToken(Map<String, Object> claims, String subject) {
        // Expires in 10 hours
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationDateInMs))
                .signWith(SignatureAlgorithm.HS256, secret).compact();
    }

    private String createRefreshToken(Map<String, Object> claims, String subject) {
        // Expires in 10 hours
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + refreshExpirationDateInMs))
                .signWith(SignatureAlgorithm.HS256, secret).compact();
    }

    public boolean validateToken(String authToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException ex) {
            throw new BadCredentialsException("INVALID_CREDENTIALS", ex);
        } catch (ExpiredJwtException ex) {
            throw ex;
        }
    }

//    public Boolean validateToken(String token, UserDetails userDetails) {
//        final String username = extractUsername(token);
//        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
//    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
        return claims.getSubject();

    }

    public List<SimpleGrantedAuthority> getRolesFromToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();

        String role = claims.get("role", String.class);
        if (role != null) {
            return Collections.singletonList(new SimpleGrantedAuthority(role));
        } else {
            return Collections.emptyList();
        }
    }
}