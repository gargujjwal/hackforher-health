package com.ujjwalgarg.mainserver.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link com.ujjwalgarg.mainserver.entity.user.User}
 */
public record SignupRequest(@Email @NotBlank String email, @NotBlank String firstName,
                            @NotBlank String lastName, @Past LocalDateTime dob,
                            @Size(min = 6, max = 16) @NotBlank String password) implements
    Serializable {

}
