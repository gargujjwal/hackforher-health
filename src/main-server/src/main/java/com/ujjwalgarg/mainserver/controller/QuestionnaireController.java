package com.ujjwalgarg.mainserver.controller;

import com.ujjwalgarg.mainserver.dto.ApiResponse;
import com.ujjwalgarg.mainserver.dto.QuestionnaireReviewDto;
import com.ujjwalgarg.mainserver.dto.QuestionnaireSubmissionCreationDto;
import com.ujjwalgarg.mainserver.dto.QuestionnaireSubmissionResponseDto;
import com.ujjwalgarg.mainserver.dto.SectionCreationDto;
import com.ujjwalgarg.mainserver.dto.SectionResponseDto;
import com.ujjwalgarg.mainserver.service.QuestionnaireService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/questionnaire", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class QuestionnaireController {

  private final QuestionnaireService questionnaireService;

  @GetMapping(consumes = MediaType.ALL_VALUE)
  public ResponseEntity<ApiResponse<List<SectionResponseDto>>> getQuestionnaire() {
    List<SectionResponseDto> sections = questionnaireService.getQuestionnaire();
    return ResponseEntity.ok(ApiResponse.success(sections));
  }

  @PostMapping
  public ResponseEntity<ApiResponse<Void>> createQuestionnaire(
      @RequestBody List<SectionCreationDto> sections) {
    questionnaireService.createQuestionnaire(sections);
    return ResponseEntity.status(201).body(ApiResponse.success(null));
  }

  @PostMapping(path = "/submit")
  public ResponseEntity<ApiResponse<QuestionnaireSubmissionResponseDto>> submitResponseToQuestionnaire(
      @RequestParam("doctorAssignmentId") Long doctorAssignmentId,
      @RequestBody QuestionnaireSubmissionCreationDto questionnaireSubmissionCreationDto) {
    QuestionnaireSubmissionResponseDto submissionResponse = questionnaireService.submitResponseToQuestionnaire(
        doctorAssignmentId,
        questionnaireSubmissionCreationDto);
    return ResponseEntity.ok(ApiResponse.success(submissionResponse));
  }

  @PostMapping(path = "/{questionnaireSubmissionId}/review")
  public ResponseEntity<ApiResponse<Void>> reviewQuestionnaireSubmission(
      @PathVariable Long questionnaireSubmissionId,
      @RequestBody QuestionnaireReviewDto reviewDto) {
    questionnaireService.reviewQuestionnaireSubmission(questionnaireSubmissionId, reviewDto);
    return ResponseEntity.ok(ApiResponse.success(null));
  }

  @GetMapping(path = "/{questionnaireSubmissionId}", consumes = MediaType.ALL_VALUE)
  public ResponseEntity<ApiResponse<QuestionnaireSubmissionResponseDto>> getQuestionnaireSubmissionById(
      @PathVariable Long questionnaireSubmissionId) {
    QuestionnaireSubmissionResponseDto submissionResponse = questionnaireService.getQuestionnaireSubmissionById(
        questionnaireSubmissionId);
    return ResponseEntity.ok(ApiResponse.success(submissionResponse));
  }
}
