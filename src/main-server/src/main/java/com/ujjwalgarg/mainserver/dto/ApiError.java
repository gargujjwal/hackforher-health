package com.ujjwalgarg.mainserver.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * Represents an API error with a code and description.
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
   * Constructs a new ApiError with the specified code and description.
   *
   * @param code        the error code
   * @param description the error description
   */
  public ApiError(String code, String description) {
    this.code = code;
    this.description = description;
  }
}
