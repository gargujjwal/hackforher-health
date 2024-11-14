package com.ujjwalgarg.mainserver.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

public record LoginRequest(
    @NotBlank @Email String email, @NotBlank @Length(min = 8, max = 16) String password) {

}
