package com.ujjwalgarg.mainserver.service.impl;

import com.ujjwalgarg.mainserver.dto.MedicalCaseCreationDto;
import com.ujjwalgarg.mainserver.dto.MedicalCaseResponseDto;
import com.ujjwalgarg.mainserver.dto.QuestionnaireSubmissionResponseDto;
import com.ujjwalgarg.mainserver.entity.medicalcase.DoctorAssignment;
import com.ujjwalgarg.mainserver.entity.medicalcase.MedicalCase;
import com.ujjwalgarg.mainserver.entity.user.Doctor;
import com.ujjwalgarg.mainserver.entity.user.Patient;
import com.ujjwalgarg.mainserver.entity.user.Role;
import com.ujjwalgarg.mainserver.entity.user.User;
import com.ujjwalgarg.mainserver.exception.DoctorForbiddenToAccessPatientRecordException;
import com.ujjwalgarg.mainserver.exception.ResourceConflictException;
import com.ujjwalgarg.mainserver.exception.ResourceNotFoundException;
import com.ujjwalgarg.mainserver.mapper.MedicalCaseMapper;
import com.ujjwalgarg.mainserver.mapper.QuestionnaireSubmissionMapper;
import com.ujjwalgarg.mainserver.repository.MedicalCaseRepository;
import com.ujjwalgarg.mainserver.service.AuthService;
import com.ujjwalgarg.mainserver.service.MedicalCaseService;
import com.ujjwalgarg.mainserver.service.UserService;
import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
@Slf4j(topic = "MEDICAL_CASE_SERVICE")
@RequiredArgsConstructor
public class MedicalCaseServiceImpl implements MedicalCaseService {

  private static final String MEDICAL_CASE_NOT_FOUND = "Medical case not found";
  private final MedicalCaseRepository medicalCaseRepository;
  private final MedicalCaseMapper medicalCaseMapper;
  private final UserService userService;
  private final AuthService authService;
  private final QuestionnaireSubmissionMapper questionnaireSubmissionMapper;

  @Override
  @PreAuthorize("hasRole('ROLE_PATIENT')")
  public void createNewMedicalCase(@Valid MedicalCaseCreationDto medicalCaseCreationDto) {
    User user = authService.getAuthenticatedUser();
    log.info("Authenticated user: {}", user.getUsername());
    Patient patient = userService.findPatientById(user.getId());
    log.info("Found patient: {}", patient.getId());

    medicalCaseRepository.findByPatient_IdAndIsResolvedFalse(patient.getId())
        .ifPresent(medicalCase -> {
          log.warn("Patient {} already has an unresolved medical case", patient.getId());
          throw new ResourceConflictException("Patient already has an unresolved medical case");
        });

    MedicalCase medicalCase = medicalCaseMapper.toEntity(medicalCaseCreationDto);
    medicalCase.setIsResolved(false);
    medicalCase.setPatient(patient);

    Doctor medicalCasedAssignedDoctor = userService.findDoctorById(
        medicalCaseCreationDto.doctorAssignments().getFirst().doctor().id());
    log.info("Assigning doctor {} to the new medical case", medicalCasedAssignedDoctor.getId());

    DoctorAssignment doctorAssignment = DoctorAssignment.builder()
        .doctor(medicalCasedAssignedDoctor)
        .medicalCase(medicalCase)
        .build();
    medicalCase.setDoctorAssignments(List.of(doctorAssignment));

    medicalCaseRepository.save(medicalCase);
    log.info("New medical case created with ID: {}", medicalCase.getId());
  }

  @Override
  @PreAuthorize("hasRole('ROLE_DOCTOR') or hasRole('ROLE_ADMIN') or (hasRole('ROLE_PATIENT') and #patientId == authentication.principal.id)")
  public MedicalCaseResponseDto getCurrentUnresolvedMedicalCaseByPatientId(Long patientId) {
    log.info("Fetching current unresolved medical case for patient ID: {}", patientId);
    return medicalCaseMapper.toDto(medicalCaseRepository.findByIsResolvedIsFalse().orElseThrow(
        () -> new ResourceNotFoundException("No unresolved medical case found for patient")));
  }

  @Override
  public MedicalCaseResponseDto getMedicalCaseById(Long medicalCaseId) {
    log.info("Fetching medical case by ID: {}", medicalCaseId);
    return medicalCaseMapper.toDto(medicalCaseRepository.findById(medicalCaseId)
        .orElseThrow(() -> new ResourceNotFoundException(MEDICAL_CASE_NOT_FOUND)));
  }

  @Override
  @PreAuthorize("hasRole('ROLE_DOCTOR') or (hasRole('ROLE_PATIENT') and #patientId == authentication.principal.id)")
  public Page<MedicalCaseResponseDto> getAllMedicalCasesForPatient(Long patientId,
      PageRequest pageRequest) {
    log.info("Fetching all medical cases for patient ID: {}", patientId);
    User user = authService.getAuthenticatedUser();
    if (user.getRole().equals(Role.DOCTOR)) {
      Doctor doctor = userService.findDoctorById(user.getId());
      boolean doctorHasTreatedPatientInPast = doctor.getDoctorAssignments()
          .stream()
          .map(DoctorAssignment::getMedicalCase)
          .map(MedicalCase::getPatient)
          .anyMatch(patient -> patient.getId().equals(patientId));
      if (!doctorHasTreatedPatientInPast) {
        log.warn("Doctor {} has not treated patient {} before", doctor.getId(), patientId);
        throw new DoctorForbiddenToAccessPatientRecordException(
            "Doctor has not treated the patient before");
      }
    }

    return medicalCaseRepository
        .findAllByPatient_IdOrderByCreatedAtDesc(patientId, pageRequest)
        .map(medicalCaseMapper::toDto);
  }

  @Override
  @PreAuthorize("hasRole('ROLE_DOCTOR') and #doctorId == authentication.principal.id")
  public Page<MedicalCaseResponseDto> getAllMedicalCasesForDoctor(Long doctorId,
      PageRequest pageRequest) {
    log.info("Fetching all medical cases for doctor ID: {}", doctorId);
    return medicalCaseRepository
        .findAllByDoctorAssignments_Doctor_IdOrderByCreatedAtDesc(doctorId, pageRequest)
        .map(medicalCaseMapper::toDto);
  }

  @Override
  @PreAuthorize("hasRole('ROLE_PATIENT') and @medicalCaseServiceImpl.isPatientAuthorizedToEditMedicalCase(#medicalCaseId)")
  public void markMedicalCaseAsResolved(Long medicalCaseId) {
    log.info("Marking medical case ID {} as resolved", medicalCaseId);
    MedicalCase medicalCase = medicalCaseRepository.findById(medicalCaseId)
        .orElseThrow(() -> new ResourceNotFoundException(MEDICAL_CASE_NOT_FOUND));
    medicalCase.setIsResolved(true);

    medicalCase.getDoctorAssignments().stream()
        .filter(doctorAssignment -> doctorAssignment.getUnassignedAt() == null)
        .forEach(doctorAssignment -> doctorAssignment.setUnassignedAt(LocalDateTime.now()));

    medicalCaseRepository.save(medicalCase);
    log.info("Medical case ID {} marked as resolved", medicalCaseId);
  }

  @Override
  @PreAuthorize("hasRole('ROLE_PATIENT') and @medicalCaseServiceImpl.isPatientAuthorizedToEditMedicalCase(#medicalCaseId)")
  public void assignNewDoctorToMedicalCase(Long medicalCaseId, Long doctorId) {
    log.info("Assigning new doctor ID {} to medical case ID {}", doctorId, medicalCaseId);
    MedicalCase medicalCase = medicalCaseRepository.findById(medicalCaseId)
        .orElseThrow(() -> new ResourceNotFoundException(MEDICAL_CASE_NOT_FOUND));
    if (medicalCase.getDoctorAssignments().getFirst().getDoctor().getId().equals(doctorId)) {
      log.warn("Doctor ID {} is already assigned to medical case ID {}", doctorId, medicalCaseId);
      throw new ResourceConflictException("Doctor is already assigned to the medical case");
    }

    DoctorAssignment doctorAssignment = medicalCase.getDoctorAssignments().stream()
        .filter(da -> da.getUnassignedAt() == null)
        .findFirst()
        .orElseThrow(() -> new RuntimeException(
            "Invalid Doctor assignment, no doctor found whose unassignedAt is null"));
    doctorAssignment.setUnassignedAt(LocalDateTime.now());

    DoctorAssignment newDoctorAssignment = DoctorAssignment.builder()
        .doctor(userService.findDoctorById(doctorId))
        .medicalCase(medicalCase)
        .build();
    medicalCase.getDoctorAssignments().add(newDoctorAssignment);

    medicalCaseRepository.save(medicalCase);
    log.info("New doctor ID {} assigned to medical case ID {}", doctorId, medicalCaseId);
  }

  @Override
  @PreAuthorize("hasAnyRole('ROLE_DOCTOR', 'ROLE_PATIENT')")
  public List<QuestionnaireSubmissionResponseDto> getAllQuestionnaireSubmissionOfMedicalCaseUnderDoctor(
      Long medicalCaseId, Long doctorId) {
    log.info("Fetching all questionnaire submissions for medical case ID {} under doctor ID {}",
        medicalCaseId, doctorId);
    User user = authService.getAuthenticatedUser();
    MedicalCase medicalCase = medicalCaseRepository.findById(medicalCaseId)
        .orElseThrow(() -> new ResourceNotFoundException(MEDICAL_CASE_NOT_FOUND));
    if (user.getRole().equals(Role.PATIENT) && !medicalCase.getPatient().getId()
        .equals(user.getId())) {
      log.warn("Patient {} is not allowed to view questionnaire submissions for medical case ID {}",
          user.getId(), medicalCaseId);
      throw new AccessDeniedException(
          "You are not allowed to view this questionnaire submission");
    }

    if (user.getRole().equals(Role.DOCTOR) && medicalCase.getDoctorAssignments().stream().noneMatch(
        doctorAssignment -> doctorAssignment.getDoctor().getId().equals(user.getId()))) {
      log.warn("Doctor {} is not allowed to view questionnaire submissions for medical case ID {}",
          user.getId(), medicalCaseId);
      throw new AccessDeniedException(
          "You are not allowed to view this questionnaire submission");
    }

    return medicalCase.getDoctorAssignments().stream()
        .filter(da -> da.getDoctor().getId().equals(doctorId))
        .findFirst()
        .orElseThrow(() -> new ResourceNotFoundException("Doctor not assigned to medical case"))
        .getQuestionnaireSubmissions().stream()
        .map(questionnaireSubmissionMapper::toDto)
        .toList();
  }

  public boolean isPatientAuthorizedToEditMedicalCase(Long medicalCaseId) {
    User user = authService.getAuthenticatedUser();
    log.info("Checking if patient {} is authorized to edit medical case ID {}", user.getId(),
        medicalCaseId);
    Patient patient = userService.findPatientById(user.getId());
    MedicalCase medicalCase = medicalCaseRepository.findById(medicalCaseId)
        .orElseThrow(() -> new ResourceNotFoundException(MEDICAL_CASE_NOT_FOUND));
    return medicalCase.getPatient().getId().equals(patient.getId());
  }
}
