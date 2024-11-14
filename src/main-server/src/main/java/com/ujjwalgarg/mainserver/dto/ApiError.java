package com.ujjwalgarg.mainserver.dto;

import java.util.Map;
import lombok.Getter;
import lombok.Setter;

/**
 * Represents an API error with a code, description, and optional validation errors.
 */
@Getter
@Setter
public class ApiError {

  /**
   * The error code.
   */
  private String code;

  /**
   * The error description.
   */
  private String description;

  /**
   * The error message
   */
  private String message;

  /**
   * The validation errors, if any.
   */
  private Map<String, String> validationErrors;

  public ApiError(String code, String description, String message) {
    this.code = code;
    this.description = description;
    this.message = message;
  }

  /**
   * Constructs a new ApiError with the specified code, description, and validation errors.
   *
   * @param code             the error code
   * @param description      the error description
   * @param validationErrors the validation errors
   */
  public ApiError(String code, String description, Map<String, String> validationErrors) {
    this.code = code;
    this.description = description;
    this.message = "Please clear validation errors before proceeding";
    this.validationErrors = validationErrors;
  }
}
