package com.ujjwalgarg.mainserver.dto;

import java.time.Instant;
import lombok.Getter;
import lombok.Setter;

/**
 * Represents a generic API response.
 *
 * @param <T> the type of the data contained in the response
 */
@Getter
@Setter
public class ApiResponse<T> {

  /**
   * Indicates whether the API call was successful.
   */
  private boolean success;

  /**
   * The data returned by the API call.
   */
  private T data;

  /**
   * The error information if the API call was not successful.
   */
  private ApiError error;

  /**
   * The timestamp when the response was created.
   */
  private String timestamp;

  /**
   * Constructs a new ApiResponse with the specified success status, data, and error.
   *
   * @param success indicates whether the API call was successful
   * @param data    the data returned by the API call
   * @param error   the error information if the API call was not successful
   */
  public ApiResponse(boolean success, T data, ApiError error) {
    this.success = success;
    this.data = data;
    this.error = error;
    this.timestamp = Instant.now().toString();
  }
}
