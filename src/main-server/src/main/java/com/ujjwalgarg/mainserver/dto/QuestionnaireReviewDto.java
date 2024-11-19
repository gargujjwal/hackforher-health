package com.ujjwalgarg.mainserver.dto;

import com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.ReviewStatus;
import jakarta.validation.constraints.*;
import java.io.Serializable;

/**
 * DTO for
 * {@link com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.QuestionnaireSubmission}
 */
public record QuestionnaireReviewDto(@NotNull ReviewStatus reviewStatus,
                                     String doctorNotes) implements
    Serializable {

}
