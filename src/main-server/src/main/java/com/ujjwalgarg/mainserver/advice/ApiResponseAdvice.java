package com.ujjwalgarg.mainserver.advice;

import com.ujjwalgarg.mainserver.dto.ApiError;
import com.ujjwalgarg.mainserver.dto.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.ConversionNotSupportedException;
import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.validation.method.MethodValidationException;
import org.springframework.web.ErrorResponseException;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.context.request.async.AsyncRequestTimeoutException;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@Slf4j
@RestControllerAdvice
public class ApiResponseAdvice extends ResponseEntityExceptionHandler {

  @Override
  protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(
      HttpRequestMethodNotSupportedException ex, HttpHeaders headers, HttpStatusCode status,
      WebRequest request) {
    log.error("Request method not supported: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_001", "Request method not supported");
    ApiResponse<Object> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.METHOD_NOT_ALLOWED);
  }

  @Override
  protected ResponseEntity<Object> handleHttpMediaTypeNotSupported(
      HttpMediaTypeNotSupportedException ex, HttpHeaders headers, HttpStatusCode status,
      WebRequest request) {
    log.error("Media type not supported: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_002", "Media type not supported");
    ApiResponse<Object> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
  }

  @Override
  protected ResponseEntity<Object> handleHttpMediaTypeNotAcceptable(
      HttpMediaTypeNotAcceptableException ex, HttpHeaders headers, HttpStatusCode status,
      WebRequest request) {
    log.error("Media type not acceptable: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_003", "Media type not acceptable");
    ApiResponse<Object> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);
  }

  @Override
  protected ResponseEntity<Object> handleMissingPathVariable(MissingPathVariableException ex,
      HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    log.error("Missing path variable: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_004", "Missing path variable");
    ApiResponse<Object> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @Override
  protected ResponseEntity<Object> handleMissingServletRequestParameter(
      MissingServletRequestParameterException ex, HttpHeaders headers, HttpStatusCode status,
      WebRequest request) {
    log.error("Missing request parameter: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_005", "Missing request parameter");
    ApiResponse<Object> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @Override
  protected ResponseEntity<Object> handleMissingServletRequestPart(
      MissingServletRequestPartException ex, HttpHeaders headers, HttpStatusCode status,
      WebRequest request) {
    log.error("Missing request part: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_006", "Missing request part");
    ApiResponse<Object> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @Override
  protected ResponseEntity<Object> handleServletRequestBindingException(
      ServletRequestBindingException ex, HttpHeaders headers, HttpStatusCode status,
      WebRequest request) {
    log.error("Request binding error: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_007", "Request binding error");
    ApiResponse<Object> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
      HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    log.error("Method argument not valid: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_008", "Method argument not valid");
    ApiResponse<Object> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @Override
  protected ResponseEntity<Object> handleHandlerMethodValidationException(
      HandlerMethodValidationException ex, HttpHeaders headers, HttpStatusCode status,
      WebRequest request) {
    log.error("Handler method validation error: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_009", "Handler method validation error");
    ApiResponse<Object> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @Override
  protected ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex,
      HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    log.error("No handler found for request: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_010", "No handler found for request");
    ApiResponse<Object> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
  }

  @Override
  protected ResponseEntity<Object> handleNoResourceFoundException(NoResourceFoundException ex,
      HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    log.error("No resource found for request: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_011", "No resource found for request");
    ApiResponse<Object> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
  }

  @Override
  protected ResponseEntity<Object> handleAsyncRequestTimeoutException(
      AsyncRequestTimeoutException ex, HttpHeaders headers, HttpStatusCode status,
      WebRequest request) {
    log.error("Async request timeout: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_012", "Async request timeout");
    ApiResponse<Object> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.SERVICE_UNAVAILABLE);
  }

  @Override
  protected ResponseEntity<Object> handleErrorResponseException(ErrorResponseException ex,
      HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    log.error("Error response exception: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_013", "Error response exception");
    ApiResponse<Object> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @Override
  protected ResponseEntity<Object> handleMaxUploadSizeExceededException(
      MaxUploadSizeExceededException ex, HttpHeaders headers, HttpStatusCode status,
      WebRequest request) {
    log.error("Max upload size exceeded: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_014", "Max upload size exceeded");
    ApiResponse<Object> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.PAYLOAD_TOO_LARGE);
  }

  @Override
  protected ResponseEntity<Object> handleConversionNotSupported(ConversionNotSupportedException ex,
      HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    log.error("Conversion not supported: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_015", "Conversion not supported");
    ApiResponse<Object> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @Override
  protected ResponseEntity<Object> handleTypeMismatch(TypeMismatchException ex, HttpHeaders headers,
      HttpStatusCode status, WebRequest request) {
    log.error("Type mismatch: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_016", "Type mismatch");
    ApiResponse<Object> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @Override
  protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
      HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    log.error("HTTP message not readable: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_017", "HTTP message not readable");
    ApiResponse<Object> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @Override
  protected ResponseEntity<Object> handleHttpMessageNotWritable(HttpMessageNotWritableException ex,
      HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    log.error("HTTP message not writable: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_018", "HTTP message not writable");
    ApiResponse<Object> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @Override
  protected ResponseEntity<Object> handleMethodValidationException(MethodValidationException ex,
      HttpHeaders headers, HttpStatus status, WebRequest request) {
    log.error("Method validation error: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_019", "Method validation error");
    ApiResponse<Object> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @Override
  protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body,
      HttpHeaders headers, HttpStatusCode statusCode, WebRequest request) {
    log.error("Internal server error: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_020", "Internal server error");
    ApiResponse<Object> response = new ApiResponse<>(false, null, error);
    return new ResponseEntity<>(response, statusCode);
  }
}
