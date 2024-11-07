package com.ujjwalgarg.mainserver.service;

import com.ujjwalgarg.mainserver.dto.QuestionnaireReviewDto;
import com.ujjwalgarg.mainserver.dto.QuestionnaireSubmissionCreationDto;
import com.ujjwalgarg.mainserver.dto.QuestionnaireSubmissionResponseDto;
import com.ujjwalgarg.mainserver.dto.SectionCreationDto;
import com.ujjwalgarg.mainserver.dto.SectionResponseDto;
import java.util.List;

/**
 * Service interface for managing questionnaires.
 */
public interface QuestionnaireService {

  /**
   * Retrieves the list of sections in the questionnaire.
   *
   * @return a list of SectionResponseDto representing the sections of the questionnaire
   */
  List<SectionResponseDto> getQuestionnaire();

  /**
   * Creates a new questionnaire with the given sections.
   *
   * @param sections a list of SectionCreationDto representing the sections to be created
   */
  void createQuestionnaire(List<SectionCreationDto> sections);

  /**
   * Submits a response to the questionnaire.
   *
   * @param doctorAssignmentId the ID of the doctor assignment
   * @param questionnaireSubmissionCreationDto the submission data for the questionnaire
   * @return a QuestionnaireSubmissionResponseDto representing the response to the submission
   */
  QuestionnaireSubmissionResponseDto submitResponseToQuestionnaire(
      Long doctorAssignmentId,
      QuestionnaireSubmissionCreationDto questionnaireSubmissionCreationDto);

  /**
   * Reviews a submitted questionnaire.
   *
   * @param questionnaireSubmissionId the ID of the questionnaire submission to be reviewed
   * @param reviewDto the review data for the questionnaire submission
   */
  void reviewQuestionnaireSubmission(
      Long questionnaireSubmissionId, QuestionnaireReviewDto reviewDto);

  /**
   * Retrieves a questionnaire submission by its ID.
   *
   * @param questionnaireSubmissionId the ID of the questionnaire submission
   * @return a QuestionnaireSubmissionResponseDto representing the questionnaire submission
   */
  QuestionnaireSubmissionResponseDto getQuestionnaireSubmissionById(Long questionnaireSubmissionId);

  QuestionnaireSubmissionResponseDto predict(
      QuestionnaireSubmissionCreationDto questionnaireSubmissionCreationDto);
}
