package com.ujjwalgarg.mainserver.advice;

import com.ujjwalgarg.mainserver.dto.ApiError;
import com.ujjwalgarg.mainserver.dto.ApiResponse;
import com.ujjwalgarg.mainserver.exception.ResourceConflictException;
import com.ujjwalgarg.mainserver.exception.TokenGenerationException;
import com.ujjwalgarg.mainserver.exception.TokenValidationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@Slf4j
@RestControllerAdvice
public class SecurityExceptionAdvice {

  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<ApiResponse<ApiError>> handleAccessDeniedException(AccessDeniedException ex,
      WebRequest request) {
    log.error("Access denied: {}", ex.getMessage());
    ApiError error = new ApiError("SECURITY_ERROR_001", "Access denied", ex.getMessage());
    ApiResponse<ApiError> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
  }

  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<ApiResponse<ApiError>> handleBadCredentialsException(
      BadCredentialsException ex,
      WebRequest request) {
    log.error("Bad credentials: {}", ex.getMessage());
    ApiError error = new ApiError("SECURITY_ERROR_002", "Bad credentials", ex.getMessage());
    ApiResponse<ApiError> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(UsernameNotFoundException.class)
  public ResponseEntity<ApiResponse<ApiError>> handleUsernameNotFoundException(
      UsernameNotFoundException ex,
      WebRequest request) {
    log.error("Username not found: {}", ex.getMessage());
    ApiError error = new ApiError("SECURITY_ERROR_003", "Username not found", ex.getMessage());
    ApiResponse<ApiError> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(TokenGenerationException.class)
  public ResponseEntity<ApiResponse<ApiError>> handleTokenGenerationException(
      TokenGenerationException ex,
      WebRequest request) {
    log.error("Token generation failed: {}", ex.getMessage());
    ApiError error = new ApiError("SECURITY_ERROR_004", "Token generation failed", ex.getMessage());
    ApiResponse<ApiError> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(TokenValidationException.class)
  public ResponseEntity<ApiResponse<ApiError>> handleTokenValidationException(
      TokenValidationException ex, WebRequest request) {
    log.error("Token validation failed: {}", ex.getMessage());
    ApiError error = new ApiError("SECURITY_ERROR_005", "Token validation failed", ex.getMessage());
    ApiResponse<ApiError> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler
  public ResponseEntity<ApiResponse<ApiError>> handleResourceConflictException(
      ResourceConflictException ex,
      WebRequest request) {
    log.error("Resource conflict: {}", ex.getMessage());
    ApiError error = new ApiError("SECURITY_ERROR_006", "Resource conflict", ex.getMessage());
    ApiResponse<ApiError> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.CONFLICT);
  }
}
