package com.ujjwalgarg.mainserver.service.impl;

import com.ujjwalgarg.mainserver.dto.QuestionnaireReviewDto;
import com.ujjwalgarg.mainserver.dto.QuestionnaireSubmissionCreationDto;
import com.ujjwalgarg.mainserver.dto.QuestionnaireSubmissionRepository;
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
@Slf4j
@RequiredArgsConstructor
public class QuestionnaireServiceImpl implements QuestionnaireService {

  private static final String QUESTIONNAIRE_FORBIDDEN = "You are not allowed to view this questionnaire";
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
    questionnaireModelClient = RestClient.builder()
        .baseUrl(questionnaireModelUrl)
        .defaultHeaders(httpHeaders -> httpHeaders.setContentType(MediaType.APPLICATION_JSON))
        .build();
  }

  @Override
  public List<SectionResponseDto> getQuestionnaire() {
    return sectionRepository.findAll().stream().map(sectionMapper::toDto).toList();
  }

  @Override
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void createQuestionnaire(
      @Valid @NotNull @Min(1) List<@Valid SectionCreationDto> sections) {
    sectionRepository.saveAll(sections.stream().map(sectionMapper::toEntity).toList());
  }

  @Override
  @PreAuthorize("hasRole('ROLE_PATIENT')")
  public QuestionnaireSubmissionResponseDto submitResponseToQuestionnaire(
      Long doctorAssignmentId,
      QuestionnaireSubmissionCreationDto questionnaireSubmissionCreationDto) {
    // validate if every question was answered or not
    Map<String, String> mappedQuestionnaireResponse = questionRepository
        .findAll()
        .stream()
        .map(q -> {
          if (!questionnaireSubmissionCreationDto.questionResponses().containsKey(q.getId())) {
            throw new QuestionNotAnsweredException(
                "Question not answered, question: " + q.getText());
          }
          // make sure its answered the right way
          String answer = questionnaireSubmissionCreationDto.questionResponses().get(q.getId());
          if (isQuestionNotAnsweredCorrectly(q, answer)) {
            throw new QuestionNotAnsweredException("Question not answered correctly, question: "
                + q.getText() + ", answer: " + answer);
          }

          return Map.entry(questionnaireAttributeName.get(q.getId()), answer);
        })
        .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

    // get model prediction
    log.info("Sending questionnaire response to model prediction service: {}",
        mappedQuestionnaireResponse);
    ResponseEntity<ModelPrediction> predictionResponse = questionnaireModelClient
        .post()
        .body(mappedQuestionnaireResponse)
        .retrieve()
        .toEntity(ModelPrediction.class);
    if (!predictionResponse.getStatusCode().is2xxSuccessful()) {
      throw new QuestionnairePredictionModelException(
          "Model prediction failed with status code: " + predictionResponse.getStatusCode());
    }

    // get doctor assignment
    DoctorAssignment doctorAssignment = doctorAssignmentRepository.findById(doctorAssignmentId)
        .orElseThrow(() -> new ResourceNotFoundException("Doctor assignment not found"));

    // create questionnaire submission object and save it
    QuestionnaireSubmission prospectSubmission = questionnaireSubmissionMapper.toEntity(
        questionnaireSubmissionCreationDto);
    prospectSubmission.setDoctorAssignment(doctorAssignment);
    prospectSubmission.setModelPrediction(predictionResponse.getBody());
    QuestionnaireSubmission savedSubmission = questionnaireSubmissionRepository.save(
        prospectSubmission);

    return questionnaireSubmissionMapper.toDto(savedSubmission);
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
  public void reviewQuestionnaireSubmission(Long questionnaireSubmissionId,
      QuestionnaireReviewDto reviewDto) {
    // make sure that the questionnaire can only be reviewed by doctor who is currently
    // treating the patient
    QuestionnaireSubmission submission = questionnaireSubmissionRepository.findById(
            questionnaireSubmissionId)
        .orElseThrow(() -> new ResourceNotFoundException("Questionnaire submission not found"));
    User user = authService.getAuthenticatedUser();
    if (!submission.getDoctorAssignment().getDoctor().getId().equals(user.getId())) {
      throw new AccessDeniedException("You are not allowed to review this questionnaire");
    }

    // review the questionnaire
    submission = questionnaireSubmissionMapper.partialUpdate(reviewDto, submission);
    questionnaireSubmissionRepository.save(submission);
  }

  @Override
  @PreAuthorize("hasAnyRole('ROLE_DOCTOR', 'ROLE_PATIENT')")
  public QuestionnaireSubmissionResponseDto getQuestionnaireSubmissionById(
      Long questionnaireSubmissionId) {
    // make sure that the questionnaire can only be viewed by doctor who is currently
    // treating the patient or the patient himself
    User user = authService.getAuthenticatedUser();
    QuestionnaireSubmission submission = questionnaireSubmissionRepository.findById(
            questionnaireSubmissionId)
        .orElseThrow(() -> new ResourceNotFoundException("Questionnaire submission not found"));
    if (user.getRole().equals(Role.PATIENT) && !submission.getDoctorAssignment().getMedicalCase()
        .getPatient().getId()
        .equals(user.getId())) {
      throw new AccessDeniedException(QUESTIONNAIRE_FORBIDDEN);
    }
    if (user.getRole().equals(Role.DOCTOR) && !submission.getDoctorAssignment().getDoctor().getId()
        .equals(user.getId())) {
      throw new AccessDeniedException(QUESTIONNAIRE_FORBIDDEN);
    }

    return questionnaireSubmissionMapper.toDto(submission);
  }
}
