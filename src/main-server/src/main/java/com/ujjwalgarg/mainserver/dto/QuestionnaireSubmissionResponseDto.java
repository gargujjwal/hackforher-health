package com.ujjwalgarg.mainserver.dto;

import com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.ModelPrediction;
import com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.ReviewStatus;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Map;

/**
 * DTO for
 * {@link com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.QuestionnaireSubmission}
 */
public record QuestionnaireSubmissionResponseDto(Long id, LocalDateTime submittedAt,
                                                 Map<Long, String> questionResponses,
                                                 ModelPrediction modelPrediction,
                                                 ReviewStatus reviewStatus,
                                                 String doctorNotes) implements
    Serializable {

}
