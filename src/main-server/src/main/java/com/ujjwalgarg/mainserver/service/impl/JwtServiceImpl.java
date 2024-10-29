package com.ujjwalgarg.mainserver.service.impl;

import com.ujjwalgarg.mainserver.entity.user.User;
import com.ujjwalgarg.mainserver.exception.TokenGenerationException;
import com.ujjwalgarg.mainserver.exception.TokenValidationException;
import com.ujjwalgarg.mainserver.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j(topic = "JWT_SERVICE")
public class JwtServiceImpl implements JwtService {

  @Value("${my.jwt.secret.key}")
  private String jwtSecret;

  private SecretKey getSecretKey() {
    return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
  }

  @Override
  public String generateAccessToken(User user) throws TokenGenerationException {
    try {
      Date now = new Date();
      Date expiryDate = new Date(now.getTime() + ACCESS_TOKEN_VALIDITY_IN_SECS * 1000L);

      String token = Jwts.builder()
          .subject(user.getUsername())
          .issuedAt(now)
          .expiration(expiryDate)
          .signWith(getSecretKey())
          .compact();

      log.info("Generated access token for user: {}", user.getUsername());
      return token;
    } catch (Exception e) {
      log.error("Failed to generate access token for user: {}, error: {}", user.getUsername(),
          e.getMessage());
      throw new TokenGenerationException("Could not generate access token", e);
    }
  }

  @Override
  public String generateRefreshToken(User user) throws TokenGenerationException {
    try {
      Date now = new Date();
      Date expiryDate = new Date(now.getTime() + REFRESH_TOKEN_VALIDITY_IN_SECS * 1000L);

      String token = Jwts.builder()
          .subject(user.getUsername())
          .issuedAt(now)
          .expiration(expiryDate)
          .signWith(getSecretKey())
          .compact();

      log.info("Generated refresh token for user: {}", user.getUsername());
      return token;
    } catch (Exception e) {
      log.error("Failed to generate refresh token for user: {}, error: {}", user.getUsername(),
          e.getMessage());
      throw new TokenGenerationException("Could not generate refresh token", e);
    }
  }

  @Override
  public String getEmailFromToken(String token) throws TokenValidationException {
    try {
      Claims claims = Jwts.parser().verifyWith(getSecretKey()).build().parseSignedClaims(token)
          .getPayload();
      String email = claims.getSubject();

      log.debug("Extracted email from token: {}", email);
      return email;
    } catch (Exception e) {
      log.error("Failed to extract email from token: {}, error: {}", token, e.getMessage());
      throw new TokenValidationException("Could not extract email from token", e);
    }
  }

  @Override
  public boolean validateToken(String token) {
    try {
      Jwts.parser().verifyWith(getSecretKey()).build().parseSignedClaims(token);
      log.debug("Token validated successfully: {}", token);
      return true;
    } catch (SignatureException e) {
      log.warn("Invalid JWT signature: {}", token);
    } catch (MalformedJwtException e) {
      log.warn("Invalid JWT token: {}", token);
    } catch (ExpiredJwtException e) {
      log.info("Expired JWT token: {}", token);
    } catch (UnsupportedJwtException e) {
      log.warn("Unsupported JWT token: {}", token);
    } catch (IllegalArgumentException e) {
      log.warn("JWT claims string is empty: {}", token);
    }
    return false;
  }
}
