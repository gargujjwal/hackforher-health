package com.ujjwalgarg.mainserver.advice;

import com.ujjwalgarg.mainserver.dto.ApiError;
import com.ujjwalgarg.mainserver.dto.ApiResponse;
import com.ujjwalgarg.mainserver.exception.DoctorForbiddenToAccessPatientRecordException;
import com.ujjwalgarg.mainserver.exception.ResourceConflictException;
import com.ujjwalgarg.mainserver.exception.TokenGenerationException;
import com.ujjwalgarg.mainserver.exception.TokenValidationException;
import com.ujjwalgarg.mainserver.exception.UnAuthorizedAccessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@Slf4j(topic = "SECURITY_EXCEPTION_ADVICE")
@RestControllerAdvice
public class SecurityExceptionAdvice {

  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<ApiResponse<Void>> handleAccessDeniedException(
      AccessDeniedException ex, WebRequest request) {
    log.error("Access denied: {}", ex.getMessage());
    ApiError error = new ApiError("SECURITY_ERROR_001", "Access denied", ex.getMessage());
    return buildResponseEntity(error, HttpStatus.FORBIDDEN);
  }

  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<ApiResponse<Void>> handleBadCredentialsException(
      BadCredentialsException ex, WebRequest request) {
    log.error("Bad credentials: {}", ex.getMessage());
    ApiError error = new ApiError("SECURITY_ERROR_002", "Bad credentials", ex.getMessage());
    return buildResponseEntity(error, HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(UsernameNotFoundException.class)
  public ResponseEntity<ApiResponse<Void>> handleUsernameNotFoundException(
      UsernameNotFoundException ex, WebRequest request) {
    log.error("Username not found: {}", ex.getMessage());
    ApiError error = new ApiError("SECURITY_ERROR_003", "Username not found", ex.getMessage());
    return buildResponseEntity(error, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(TokenGenerationException.class)
  public ResponseEntity<ApiResponse<Void>> handleTokenGenerationException(
      TokenGenerationException ex, WebRequest request) {
    log.error("Token generation failed: {}", ex.getMessage());
    ApiError error = new ApiError("SECURITY_ERROR_004", "Token generation failed", ex.getMessage());
    return buildResponseEntity(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(TokenValidationException.class)
  public ResponseEntity<ApiResponse<Void>> handleTokenValidationException(
      TokenValidationException ex, WebRequest request) {
    log.error("Token validation failed: {}", ex.getMessage());
    ApiError error = new ApiError("SECURITY_ERROR_005", "Token validation failed", ex.getMessage());
    return buildResponseEntity(error, HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler
  public ResponseEntity<ApiResponse<Void>> handleResourceConflictException(
      ResourceConflictException ex, WebRequest request) {
    log.error("Resource conflict: {}", ex.getMessage());
    ApiError error = new ApiError("SECURITY_ERROR_006", "Resource conflict", ex.getMessage());
    return buildResponseEntity(error, HttpStatus.CONFLICT);
  }

  @ExceptionHandler
  public ResponseEntity<ApiResponse<Void>> handleDoctorForbiddenToAccessPatientRecordException(
      DoctorForbiddenToAccessPatientRecordException ex, WebRequest request) {
    log.error("Doctor Forbidden to access Patient Record: {}", ex.getMessage());
    ApiError error =
        new ApiError(
            "SECURITY_ERROR_007", "Doctor Forbidden to access Patient Record", ex.getMessage());
    return buildResponseEntity(error, HttpStatus.CONFLICT);
  }

  @ExceptionHandler
  public ResponseEntity<ApiResponse<Void>> handleUnAuthorizedAccessException(
      UnAuthorizedAccessException ex, WebRequest request) {
    log.error("Internal server error: {}", ex.getMessage());
    ApiError error = new ApiError("SECURITY_ERROR_008", "Unauthrozed Exception", ex.getMessage());
    return buildResponseEntity(error, HttpStatus.UNAUTHORIZED);
  }

  private ResponseEntity<ApiResponse<Void>> buildResponseEntity(ApiError error, HttpStatus status) {
    return new ResponseEntity<>(ApiResponse.error(error), status);
  }
}
