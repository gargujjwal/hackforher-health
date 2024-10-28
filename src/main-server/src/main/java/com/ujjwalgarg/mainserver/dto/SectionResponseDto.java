package com.ujjwalgarg.mainserver.dto;

import com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.QuestionType;
import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.Section}
 */
public record SectionResponseDto(Long id, String title, List<QuestionDto> questions) implements
    Serializable {

  /**
   * DTO for {@link com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.Question}
   */
  public record QuestionDto(Long id, String text, QuestionType type,
                            List<String> options) implements
      Serializable {

  }
}
