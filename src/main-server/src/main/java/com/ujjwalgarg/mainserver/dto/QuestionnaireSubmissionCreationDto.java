package com.ujjwalgarg.mainserver.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Map;

/**
 * DTO for
 * {@link com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.QuestionnaireSubmission}
 */
public record QuestionnaireSubmissionCreationDto(
    @NotNull Map<Long, String> questionResponses) implements
    Serializable {

}
