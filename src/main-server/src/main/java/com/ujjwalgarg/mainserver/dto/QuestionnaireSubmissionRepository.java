package com.ujjwalgarg.mainserver.dto;

import com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.QuestionnaireSubmission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionnaireSubmissionRepository extends
    JpaRepository<QuestionnaireSubmission, Long> {

}
