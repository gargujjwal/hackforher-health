package com.ujjwalgarg.mainserver.service.impl;

import com.ujjwalgarg.mainserver.dto.QuestionnaireReviewDto;
import com.ujjwalgarg.mainserver.dto.QuestionnaireSubmissionCreationDto;
import com.ujjwalgarg.mainserver.dto.QuestionnaireSubmissionResponseDto;
import com.ujjwalgarg.mainserver.dto.SectionCreationDto;
import com.ujjwalgarg.mainserver.dto.SectionResponseDto;
import com.ujjwalgarg.mainserver.entity.medicalcase.DoctorAssignment;
import com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.ModelPrediction;
import com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.Question;
import com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.QuestionType;
import com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.QuestionnaireSubmission;
import com.ujjwalgarg.mainserver.entity.user.Role;
import com.ujjwalgarg.mainserver.entity.user.User;
import com.ujjwalgarg.mainserver.exception.QuestionNotAnsweredException;
import com.ujjwalgarg.mainserver.exception.QuestionnairePredictionModelException;
import com.ujjwalgarg.mainserver.exception.ResourceNotFoundException;
import com.ujjwalgarg.mainserver.mapper.QuestionnaireSubmissionMapper;
import com.ujjwalgarg.mainserver.mapper.SectionMapper;
import com.ujjwalgarg.mainserver.repository.DoctorAssignmentRepository;
import com.ujjwalgarg.mainserver.repository.QuestionRepository;
import com.ujjwalgarg.mainserver.repository.QuestionnaireSubmissionRepository;
import com.ujjwalgarg.mainserver.repository.SectionRepository;
import com.ujjwalgarg.mainserver.service.AuthService;
import com.ujjwalgarg.mainserver.service.QuestionnaireService;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
@Slf4j(topic = "QUESTIONNAIRE_SERVICE")
@RequiredArgsConstructor
public class QuestionnaireServiceImpl implements QuestionnaireService {

  private static final String QUESTIONNAIRE_FORBIDDEN =
      "You are not allowed to view this questionnaire";
  private static final Map<Long, String> questionnaireAttributeName = new HashMap<>();

  static {
    questionnaireAttributeName.put(1L, "age");
    questionnaireAttributeName.put(2L, "sexualPartners");
    questionnaireAttributeName.put(3L, "firstIntercourse");
    questionnaireAttributeName.put(4L, "numPregnancies");
    questionnaireAttributeName.put(5L, "smokes");
    questionnaireAttributeName.put(6L, "smokesYears");
    questionnaireAttributeName.put(7L, "smokesPacks");
    questionnaireAttributeName.put(8L, "hormonalContraceptives");
    questionnaireAttributeName.put(9L, "hormonalContraceptivesYears");
    questionnaireAttributeName.put(10L, "iud");
    questionnaireAttributeName.put(11L, "iudYears");
    questionnaireAttributeName.put(12L, "stds");
    questionnaireAttributeName.put(13L, "stdsNumber");
    questionnaireAttributeName.put(14L, "stdsNumDiagnosis");
    questionnaireAttributeName.put(15L, "stdsTimeSinceFirstDiagnosis");
    questionnaireAttributeName.put(16L, "stdsTimeSinceLastDiagnosis");
    questionnaireAttributeName.put(17L, "stdsCondylomatosis");
    questionnaireAttributeName.put(18L, "stdsCervicalCondylomatosis");
    questionnaireAttributeName.put(19L, "stdsVaginalCondylomatosis");
    questionnaireAttributeName.put(20L, "stdsVulvoPerinealCondylomatosis");
    questionnaireAttributeName.put(21L, "stdsSyphilis");
    questionnaireAttributeName.put(22L, "stdsPelvicInflammatoryDisease");
    questionnaireAttributeName.put(23L, "stdsGenitalHerpes");
    questionnaireAttributeName.put(24L, "stdsMolluscumContagiosum");
    questionnaireAttributeName.put(25L, "stdsAids");
    questionnaireAttributeName.put(26L, "stdsHiv");
    questionnaireAttributeName.put(27L, "stdsHepatitisB");
    questionnaireAttributeName.put(28L, "stdsHpv");
    questionnaireAttributeName.put(29L, "dxCancer");
    questionnaireAttributeName.put(30L, "dxCin");
    questionnaireAttributeName.put(31L, "dxHpv");
    questionnaireAttributeName.put(32L, "dx");
    questionnaireAttributeName.put(33L, "hinselmann");
    questionnaireAttributeName.put(34L, "schiller");
    questionnaireAttributeName.put(35L, "citology");
    questionnaireAttributeName.put(36L, "biopsy");
  }

  private final DoctorAssignmentRepository doctorAssignmentRepository;
  private final SectionRepository sectionRepository;
  private final SectionMapper sectionMapper;
  private final QuestionnaireSubmissionRepository questionnaireSubmissionRepository;
  private final AuthService authService;
  private final QuestionnaireSubmissionMapper questionnaireSubmissionMapper;
  private final QuestionRepository questionRepository;

  @Value("${my.questionnaire.modelprediction.url}")
  private String questionnaireModelUrl;

  private RestClient questionnaireModelClient;

  @PostConstruct
  private void createQuestionnaireModelRestClient() {
    questionnaireModelClient =
        RestClient.builder()
            .baseUrl(questionnaireModelUrl)
            .defaultHeaders(httpHeaders -> httpHeaders.setContentType(MediaType.APPLICATION_JSON))
            .build();
  }

  @Override
  public List<SectionResponseDto> getQuestionnaire() {
    log.info("Fetching all sections of the questionnaire");
    return sectionRepository.findAll().stream().map(sectionMapper::toDto).toList();
  }

  @Override
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void createQuestionnaire(
      @Valid @NotNull @Min(1) List<@Valid SectionCreationDto> sections) {
    log.info("Creating new questionnaire with {} sections", sections.size());
    sectionRepository.saveAll(sections.stream().map(sectionMapper::toEntity).toList());
    log.info("Questionnaire created successfully");
  }

  @Override
  @PreAuthorize("hasRole('ROLE_PATIENT')")
  public QuestionnaireSubmissionResponseDto submitResponseToQuestionnaire(
      Long doctorAssignmentId,
      QuestionnaireSubmissionCreationDto questionnaireSubmissionCreationDto) {
    log.info(
        "Submitting response to questionnaire for doctor assignment ID: {}", doctorAssignmentId);

    Map<String, String> mappedQuestionnaireResponse =
        validateAndMapQuestionnaireResponse(questionnaireSubmissionCreationDto);

    ModelPrediction modelPrediction = getModelPrediction(mappedQuestionnaireResponse);

    DoctorAssignment doctorAssignment = getDoctorAssignment(doctorAssignmentId);

    QuestionnaireSubmission savedSubmission =
        saveQuestionnaireSubmission(
            questionnaireSubmissionCreationDto, doctorAssignment, modelPrediction);

    log.info(
        "Questionnaire response submitted successfully for doctor assignment ID: {}",
        doctorAssignmentId);
    return questionnaireSubmissionMapper.toDto(savedSubmission);
  }

  private Map<String, String> validateAndMapQuestionnaireResponse(
      QuestionnaireSubmissionCreationDto questionnaireSubmissionCreationDto) {
    return questionRepository.findAll().stream()
        .map(
            q -> {
              if (!questionnaireSubmissionCreationDto.questionResponses().containsKey(q.getId())) {
                log.warn("Question not answered, question ID: {}", q.getId());
                throw new QuestionNotAnsweredException(
                    "Question not answered, question: " + q.getText());
              }
              String answer = questionnaireSubmissionCreationDto.questionResponses().get(q.getId());
              if (isQuestionNotAnsweredCorrectly(q, answer)) {
                log.warn(
                    "Question not answered correctly, question ID: {}, answer: {}",
                    q.getId(),
                    answer);
                throw new QuestionNotAnsweredException(
                    "Question not answered correctly, question: "
                        + q.getText()
                        + ", answer: "
                        + answer);
              }
              return Map.entry(questionnaireAttributeName.get(q.getId()), answer);
            })
        .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
  }

  private ModelPrediction getModelPrediction(Map<String, String> mappedQuestionnaireResponse) {
    log.info(
        "Sending questionnaire response to model prediction service: {}",
        mappedQuestionnaireResponse);
    ResponseEntity<ModelPrediction> predictionResponse =
        questionnaireModelClient
            .post()
            .body(mappedQuestionnaireResponse)
            .retrieve()
            .toEntity(ModelPrediction.class);
    if (!predictionResponse.getStatusCode().is2xxSuccessful()) {
      log.error("Model prediction failed with status code: {}", predictionResponse.getStatusCode());
      throw new QuestionnairePredictionModelException(
          "Model prediction failed with status code: " + predictionResponse.getStatusCode());
    }
    return predictionResponse.getBody();
  }

  private DoctorAssignment getDoctorAssignment(Long doctorAssignmentId) {
    return doctorAssignmentRepository
        .findById(doctorAssignmentId)
        .orElseThrow(
            () -> {
              log.error("Doctor assignment not found for ID: {}", doctorAssignmentId);
              return new ResourceNotFoundException("Doctor assignment not found");
            });
  }

  private QuestionnaireSubmission saveQuestionnaireSubmission(
      QuestionnaireSubmissionCreationDto questionnaireSubmissionCreationDto,
      DoctorAssignment doctorAssignment,
      ModelPrediction modelPrediction) {
    QuestionnaireSubmission prospectSubmission =
        questionnaireSubmissionMapper.toEntity(questionnaireSubmissionCreationDto);
    prospectSubmission.setDoctorAssignment(doctorAssignment);
    prospectSubmission.setModelPrediction(modelPrediction);
    return questionnaireSubmissionRepository.save(prospectSubmission);
  }

  private boolean isQuestionNotAnsweredCorrectly(Question q, String answer) {
    boolean questionNotAnsweredCorrectly =
        q.getType() == QuestionType.MCQ && !q.getOptions().contains(answer);
    if (q.getType() == QuestionType.BOOLEAN && !List.of("0", "1").contains(answer)) {
      questionNotAnsweredCorrectly = true;
    }
    if (q.getType() == QuestionType.OPEN_ENDED && answer.isBlank()) {
      questionNotAnsweredCorrectly = true;
    }
    return questionNotAnsweredCorrectly;
  }

  @Override
  @PreAuthorize("hasRole('ROLE_DOCTOR')")
  public void reviewQuestionnaireSubmission(
      Long questionnaireSubmissionId, QuestionnaireReviewDto reviewDto) {
    log.info("Reviewing questionnaire submission ID: {}", questionnaireSubmissionId);

    QuestionnaireSubmission submission = getQuestionnaireSubmission(questionnaireSubmissionId);

    User user = authService.getAuthenticatedUser();
    if (!submission.getDoctorAssignment().getDoctor().getId().equals(user.getId())) {
      log.warn(
          "Doctor ID: {} is not allowed to review questionnaire submission ID: {}",
          user.getId(),
          questionnaireSubmissionId);
      throw new AccessDeniedException("You are not allowed to review this questionnaire");
    }

    submission = questionnaireSubmissionMapper.partialUpdate(reviewDto, submission);
    questionnaireSubmissionRepository.save(submission);
    log.info("Questionnaire submission ID: {} reviewed successfully", questionnaireSubmissionId);
  }

  @Override
  @PreAuthorize("hasAnyRole('ROLE_DOCTOR', 'ROLE_PATIENT')")
  public QuestionnaireSubmissionResponseDto getQuestionnaireSubmissionById(
      Long questionnaireSubmissionId) {
    log.info("Fetching questionnaire submission by ID: {}", questionnaireSubmissionId);

    User user = authService.getAuthenticatedUser();
    QuestionnaireSubmission submission = getQuestionnaireSubmission(questionnaireSubmissionId);
    validateUserAccessToSubmission(user, submission);

    log.info("Questionnaire submission ID: {} fetched successfully", questionnaireSubmissionId);
    return questionnaireSubmissionMapper.toDto(submission);
  }

  private QuestionnaireSubmission getQuestionnaireSubmission(Long questionnaireSubmissionId) {
    return questionnaireSubmissionRepository
        .findById(questionnaireSubmissionId)
        .orElseThrow(
            () -> {
              log.error("Questionnaire submission not found for ID: {}", questionnaireSubmissionId);
              return new ResourceNotFoundException("Questionnaire submission not found");
            });
  }

  private void validateUserAccessToSubmission(User user, QuestionnaireSubmission submission) {
    if (user.getRole().equals(Role.PATIENT)
        && !submission
        .getDoctorAssignment()
        .getMedicalCase()
        .getPatient()
        .getId()
        .equals(user.getId())) {
      log.warn(
          "Patient ID: {} is not allowed to view questionnaire submission ID: {}",
          user.getId(),
          submission.getId());
      throw new AccessDeniedException(QUESTIONNAIRE_FORBIDDEN);
    }
    if (user.getRole().equals(Role.DOCTOR)
        && !submission.getDoctorAssignment().getDoctor().getId().equals(user.getId())) {
      log.warn(
          "Doctor ID: {} is not allowed to view questionnaire submission ID: {}",
          user.getId(),
          submission.getId());
      throw new AccessDeniedException(QUESTIONNAIRE_FORBIDDEN);
    }
  }
}
