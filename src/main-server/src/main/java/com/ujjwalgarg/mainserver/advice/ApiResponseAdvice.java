package com.ujjwalgarg.mainserver.advice;

import com.ujjwalgarg.mainserver.dto.ApiError;
import com.ujjwalgarg.mainserver.dto.ApiResponse;
import com.ujjwalgarg.mainserver.exception.InvalidRoleException;
import com.ujjwalgarg.mainserver.exception.QuestionNotAnsweredException;
import com.ujjwalgarg.mainserver.exception.QuestionnairePredictionModelException;
import com.ujjwalgarg.mainserver.exception.ResourceNotFoundException;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.ConversionNotSupportedException;
import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.validation.FieldError;
import org.springframework.validation.method.MethodValidationException;
import org.springframework.validation.method.ParameterValidationResult;
import org.springframework.web.ErrorResponseException;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.context.request.async.AsyncRequestTimeoutException;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@Slf4j(topic = "API_RESPONSE_ADVICE")
@RestControllerAdvice
public class ApiResponseAdvice extends ResponseEntityExceptionHandler {

  private static final String GENERIC_ERROR_MESSAGE =
      "An internal error occurred. Please contact support.";

  @Override
  protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(
      HttpRequestMethodNotSupportedException ex,
      HttpHeaders headers,
      HttpStatusCode status,
      WebRequest request) {
    log.error("Request method not supported: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_001", "Request method not supported",
        GENERIC_ERROR_MESSAGE);
    return buildResponseEntityObj(error, HttpStatus.METHOD_NOT_ALLOWED);
  }

  @Override
  protected ResponseEntity<Object> handleHttpMediaTypeNotSupported(
      HttpMediaTypeNotSupportedException ex,
      HttpHeaders headers,
      HttpStatusCode status,
      WebRequest request) {
    log.error("Media type not supported: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_002", "Media type not supported", GENERIC_ERROR_MESSAGE);
    return buildResponseEntityObj(error, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
  }

  @Override
  protected ResponseEntity<Object> handleHttpMediaTypeNotAcceptable(
      HttpMediaTypeNotAcceptableException ex,
      HttpHeaders headers,
      HttpStatusCode status,
      WebRequest request) {
    log.error("Media type not acceptable: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_003", "Media type not acceptable", GENERIC_ERROR_MESSAGE);
    return buildResponseEntityObj(error, HttpStatus.NOT_ACCEPTABLE);
  }

  @Override
  protected ResponseEntity<Object> handleMissingPathVariable(
      MissingPathVariableException ex,
      HttpHeaders headers,
      HttpStatusCode status,
      WebRequest request) {
    log.error("Missing path variable: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_004", "Missing path variable", GENERIC_ERROR_MESSAGE);
    return buildResponseEntityObj(error, HttpStatus.BAD_REQUEST);
  }

  @Override
  protected ResponseEntity<Object> handleMissingServletRequestParameter(
      MissingServletRequestParameterException ex,
      HttpHeaders headers,
      HttpStatusCode status,
      WebRequest request) {
    log.error("Missing request parameter: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_005", "Missing request parameter", GENERIC_ERROR_MESSAGE);
    return buildResponseEntityObj(error, HttpStatus.BAD_REQUEST);
  }

  @Override
  protected ResponseEntity<Object> handleMissingServletRequestPart(
      MissingServletRequestPartException ex,
      HttpHeaders headers,
      HttpStatusCode status,
      WebRequest request) {
    log.error("Missing request part: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_006", "Missing request part", GENERIC_ERROR_MESSAGE);
    return buildResponseEntityObj(error, HttpStatus.BAD_REQUEST);
  }

  @Override
  protected ResponseEntity<Object> handleServletRequestBindingException(
      ServletRequestBindingException ex,
      HttpHeaders headers,
      HttpStatusCode status,
      WebRequest request) {
    log.error("Request binding error: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_007", "Request binding error", GENERIC_ERROR_MESSAGE);
    return buildResponseEntityObj(error, HttpStatus.BAD_REQUEST);
  }

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(
      MethodArgumentNotValidException ex,
      HttpHeaders headers,
      HttpStatusCode status,
      WebRequest request) {
    log.error("Validation error: {}", ex.getMessage());

    Map<String, String> validationErrors = new HashMap<>();
    for (FieldError error : ex.getBindingResult().getFieldErrors()) {
      validationErrors.put(error.getField(), error.getDefaultMessage());
    }

    ApiError error = new ApiError("ERROR_008", "Validation error", validationErrors);
    return buildResponseEntityObj(error, HttpStatus.BAD_REQUEST);
  }

  @Override
  protected ResponseEntity<Object> handleHandlerMethodValidationException(
      HandlerMethodValidationException ex,
      HttpHeaders headers,
      HttpStatusCode status,
      WebRequest request) {
    log.error("Handler method validation error: {}", ex.getMessage());

    Map<String, String> validationErrors = getValidationErrorsFromException(ex);

    ApiError error = new ApiError("ERROR_008", "Validation Error", validationErrors);
    error.setMessage("Please clear validation errors before proceeding");
    return buildResponseEntityObj(error, HttpStatus.BAD_REQUEST);
  }

  private Map<String, String> getValidationErrorsFromException(
      HandlerMethodValidationException ex) {
    Map<String, String> validationErrors = new HashMap<>();
    for (ParameterValidationResult error : ex.getAllValidationResults()) {
      String fieldName = error.getMethodParameter().getParameterName();
      StringBuilder sb = new StringBuilder();
      for (var msg : error.getResolvableErrors()) {
        sb.append(msg.getDefaultMessage());
        sb.append(",");
      }
      sb.deleteCharAt(sb.length() - 1);
      String errorMessage = sb.toString();

      validationErrors.put(fieldName, errorMessage);
    }
    return validationErrors;
  }

  @Override
  protected ResponseEntity<Object> handleNoHandlerFoundException(
      NoHandlerFoundException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    log.error("No handler found for request: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_009", "No handler found for request",
        GENERIC_ERROR_MESSAGE);
    return buildResponseEntityObj(error, HttpStatus.NOT_FOUND);
  }

  @Override
  protected ResponseEntity<Object> handleNoResourceFoundException(
      NoResourceFoundException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    log.error("No resource found for request: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_010", "No resource found for request",
        GENERIC_ERROR_MESSAGE);
    return buildResponseEntityObj(error, HttpStatus.NOT_FOUND);
  }

  @Override
  protected ResponseEntity<Object> handleAsyncRequestTimeoutException(
      AsyncRequestTimeoutException ex,
      HttpHeaders headers,
      HttpStatusCode status,
      WebRequest request) {
    log.error("Async request timeout: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_011", "Async request timeout", GENERIC_ERROR_MESSAGE);
    return buildResponseEntityObj(error, HttpStatus.SERVICE_UNAVAILABLE);
  }

  @Override
  protected ResponseEntity<Object> handleErrorResponseException(
      ErrorResponseException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    log.error("Error response exception: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_012", "Error response exception", GENERIC_ERROR_MESSAGE);
    return buildResponseEntityObj(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @Override
  protected ResponseEntity<Object> handleMaxUploadSizeExceededException(
      MaxUploadSizeExceededException ex,
      HttpHeaders headers,
      HttpStatusCode status,
      WebRequest request) {
    log.error("Max upload size exceeded: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_013", "Max upload size exceeded", GENERIC_ERROR_MESSAGE);
    return buildResponseEntityObj(error, HttpStatus.PAYLOAD_TOO_LARGE);
  }

  @Override
  protected ResponseEntity<Object> handleConversionNotSupported(
      ConversionNotSupportedException ex,
      HttpHeaders headers,
      HttpStatusCode status,
      WebRequest request) {
    log.error("Conversion not supported: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_014", "Conversion not supported", GENERIC_ERROR_MESSAGE);
    return buildResponseEntityObj(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @Override
  protected ResponseEntity<Object> handleTypeMismatch(
      TypeMismatchException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    log.error("Type mismatch: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_015", "Type mismatch", GENERIC_ERROR_MESSAGE);
    return buildResponseEntityObj(error, HttpStatus.BAD_REQUEST);
  }

  @Override
  protected ResponseEntity<Object> handleHttpMessageNotReadable(
      HttpMessageNotReadableException ex,
      HttpHeaders headers,
      HttpStatusCode status,
      WebRequest request) {
    log.error("HTTP message not readable: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_016", "HTTP message not readable", GENERIC_ERROR_MESSAGE);
    return buildResponseEntityObj(error, HttpStatus.BAD_REQUEST);
  }

  @Override
  protected ResponseEntity<Object> handleHttpMessageNotWritable(
      HttpMessageNotWritableException ex,
      HttpHeaders headers,
      HttpStatusCode status,
      WebRequest request) {
    log.error("HTTP message not writable: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_017", "HTTP message not writable", GENERIC_ERROR_MESSAGE);
    return buildResponseEntityObj(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @Override
  protected ResponseEntity<Object> handleMethodValidationException(
      MethodValidationException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
    log.error("Method validation error: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_018", "Method validation error", GENERIC_ERROR_MESSAGE);
    return buildResponseEntityObj(error, HttpStatus.BAD_REQUEST);
  }

  @Override
  protected ResponseEntity<Object> handleExceptionInternal(
      Exception ex,
      Object body,
      HttpHeaders headers,
      HttpStatusCode statusCode,
      WebRequest request) {
    log.error("Internal server error: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_019", "Internal server error", GENERIC_ERROR_MESSAGE);
    return buildResponseEntityObj(error, HttpStatus.valueOf(statusCode.value()));
  }

  @ExceptionHandler(ResourceNotFoundException.class)
  protected ResponseEntity<ApiResponse<Void>> handleResourceNotFoundException(
      ResourceNotFoundException ex, WebRequest request) {
    log.error("Resource not found: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_020", ex.getMessage(), "Resource not found");
    return buildResponseEntity(error, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(InvalidRoleException.class)
  protected ResponseEntity<ApiResponse<Void>> handleInvalidRoleException(
      InvalidRoleException ex, WebRequest request) {
    log.error("Invalid role: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_021", ex.getMessage(), "Invalid role");
    return buildResponseEntity(error, HttpStatus.FORBIDDEN);
  }

  @ExceptionHandler(QuestionnairePredictionModelException.class)
  protected ResponseEntity<ApiResponse<Void>> handleQuestionnairePredictionModelException(
      QuestionnairePredictionModelException ex, WebRequest request) {
    log.error("Questionnaire prediction model error: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_022", ex.getMessage(), "Prediction model error");
    return buildResponseEntity(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(QuestionNotAnsweredException.class)
  protected ResponseEntity<ApiResponse<Void>> handleQuestionNotAnsweredException(
      QuestionNotAnsweredException ex, WebRequest request) {
    log.error("Question not answered: {}", ex.getMessage());
    ApiError error = new ApiError("ERROR_023", ex.getMessage(), "Question not answered");
    return buildResponseEntity(error, HttpStatus.BAD_REQUEST);
  }

  private ResponseEntity<ApiResponse<Void>> buildResponseEntity(ApiError error, HttpStatus status) {
    return new ResponseEntity<>(ApiResponse.error(error), status);
  }

  private ResponseEntity<Object> buildResponseEntityObj(ApiError error, HttpStatus status) {
    return new ResponseEntity<>(ApiResponse.error(error), status);
  }
}
