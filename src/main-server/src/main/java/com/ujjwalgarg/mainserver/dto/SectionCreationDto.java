package com.ujjwalgarg.mainserver.dto;

import com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.QuestionType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.Section}
 */
public record SectionCreationDto(@NotNull String title,
                                 @Min(1) List<@Valid QuestionDto> questions) implements
    Serializable {

  /**
   * DTO for {@link com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.Question}
   */
  public record QuestionDto(@NotBlank String text, @NotNull QuestionType type,
                            List<String> options, @NotBlank String placeholderText,
                            @NotBlank String descriptionText,
                            String attribute) implements
      Serializable {

  }
}
