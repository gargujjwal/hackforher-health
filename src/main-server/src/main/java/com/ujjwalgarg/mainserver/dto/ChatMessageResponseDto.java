package com.ujjwalgarg.mainserver.dto;

import com.ujjwalgarg.mainserver.entity.user.Role;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link com.ujjwalgarg.mainserver.entity.medicalcase.ChatMessage}
 */
public record ChatMessageResponseDto(Long id, @NotNull Role senderRole, @NotBlank String message,
                                     LocalDateTime sentAt) implements
    Serializable {

}
