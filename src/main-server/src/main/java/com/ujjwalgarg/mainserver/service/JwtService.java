package com.ujjwalgarg.mainserver.service;

import com.ujjwalgarg.mainserver.entity.user.User;
import com.ujjwalgarg.mainserver.exception.TokenGenerationException;
import com.ujjwalgarg.mainserver.exception.TokenValidationException;

/**
 * Service interface for handling JWT operations.
 */
public interface JwtService {

  /**
   * The validity period of the access token in seconds. (5 minutes)
   */
  int ACCESS_TOKEN_VALIDITY_IN_SECS = 60 * 5;

  /**
   * The validity period of the refresh token in seconds. (6 months)
   */
  int REFRESH_TOKEN_VALIDITY_IN_SECS = 60 * 60 * 24 * 30 * 6;

  /**
   * Generates an access token for the specified user.
   *
   * @param user the user for whom the token is generated
   * @return the generated access token
   * @throws TokenGenerationException if an error occurs during token generation
   */
  String generateAccessToken(User user) throws TokenGenerationException;

  /**
   * Generates a refresh token for the specified user.
   *
   * @param user the user for whom the token is generated
   * @return the generated refresh token
   * @throws TokenGenerationException if an error occurs during token generation
   */
  String generateRefreshToken(User user) throws TokenGenerationException;

  /**
   * Extracts the email from the specified token.
   *
   * @param token the token from which the email is extracted
   * @return the extracted email
   * @throws TokenValidationException if an error occurs during token validation
   */
  String getEmailFromToken(String token) throws TokenValidationException;

  /**
   * Validates the specified token.
   *
   * @param token the token to validate
   * @return true if the token is valid, false otherwise
   */
  boolean validateToken(String token);
}
