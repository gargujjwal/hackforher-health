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
@Slf4j
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

      log.info("Access token generated for user with email: {}, token: {}", user.getUsername(),
          token);
      return token;
    } catch (Exception e) {
      log.error("Failed to generate access token for user with email: {}, exception: {}",
          user.getUsername(),
          e.getClass().getSimpleName());
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

      log.info("Refresh token generated for user with email: {}, token: {}", user.getUsername(),
          token);
      return token;
    } catch (Exception e) {
      log.error("Failed to generate refresh token for user with email: {}, exception: {}",
          user.getUsername(),
          e.getClass().getSimpleName());
      throw new TokenGenerationException("Could not generate refresh token", e);
    }
  }

  @Override
  public String getEmailFromToken(String token) throws TokenValidationException {
    try {
      Claims claims = Jwts.parser().verifyWith(getSecretKey()).build().parseSignedClaims(token)
          .getPayload();
      String email = claims.getSubject();

      log.debug("User Id extracted from token: {}, user email: {}", token, email);
      return email;
    } catch (Exception e) {
      log.error("Failed to extract username from token, token: {}, exception: {}", token,
          e.getClass().getSimpleName());
      throw new TokenValidationException("Could not extract username from token", e);
    }
  }

  @Override
  public boolean validateToken(String token) {
    try {
      Jwts.parser().verifyWith(getSecretKey()).build().parseSignedClaims(token);
      log.debug("Token validated successfully, token: {}", token);
      return true;
    } catch (SignatureException e) {
      log.warn("Invalid JWT signature, token: {}, exception: {}", token,
          e.getClass().getSimpleName());
    } catch (MalformedJwtException e) {
      log.warn("Invalid JWT token, token: {}, exception: {}", token, e.getClass().getSimpleName());
    } catch (ExpiredJwtException e) {
      log.info("Expired JWT token, token: {}, exception: {}", token, e.getClass().getSimpleName());
    } catch (UnsupportedJwtException e) {
      log.warn("Unsupported JWT token, token: {}, exception: {}", token,
          e.getClass().getSimpleName());
    } catch (IllegalArgumentException e) {
      log.warn("JWT claims string is empty, token: {}, exception: {}", token,
          e.getClass().getSimpleName());
    }
    return false;
  }
}
