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
   * The data returned by the API call.
   */
  private T data;

  /** The error information if the API call was not successful. */
  private ApiError error;

  /** The timestamp when the response was created. */
  private String timestamp;

  /**
   * Constructs a new ApiResponse with the specified success status, data, and error.
   *
   * @param data the data returned by the API call
   * @param error the error information if the API call was not successful
   */
  public ApiResponse(T data, ApiError error) {
    this.data = data;
    this.error = error;
    this.timestamp = Instant.now().toString();
  }

  /**
   * Creates a new successful ApiResponse with the specified data.
   *
   * @param data the data returned by the API call
   * @param <T> the type of the data contained in the response
   * @return a new ApiResponse indicating success
   */
  public static <T> ApiResponse<T> success(T data) {
    return new ApiResponse<>(data, null);
  }

  public static ApiResponse<Void> error(ApiError error) {
    return new ApiResponse<>(null, error);
  }
}
