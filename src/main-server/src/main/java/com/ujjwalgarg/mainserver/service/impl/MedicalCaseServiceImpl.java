package com.ujjwalgarg.mainserver.service.impl;

import com.ujjwalgarg.mainserver.dto.MedicalCaseCreationDto;
import com.ujjwalgarg.mainserver.dto.MedicalCaseResponseDto;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class MedicalCaseServiceImpl implements MedicalCaseService {

  private static final String MEDICAL_CASE_NOT_FOUND = "Medical case not found";
  private final MedicalCaseRepository medicalCaseRepository;
  private final MedicalCaseMapper medicalCaseMapper;
  private final UserService userService;
  private final AuthService authService;

  @Override
  @PreAuthorize("hasRole('ROLE_PATIENT')")
  public void createNewMedicalCase(@Valid MedicalCaseCreationDto medicalCaseCreationDto) {
    // ensure that the patient can only have 1 unresolved medical case at a time
    medicalCaseRepository.findByIsResolvedIsFalse()
        .ifPresent(medicalCase -> {
          throw new ResourceConflictException("Patient already has an unresolved medical case");
        });
    MedicalCase medicalCase = medicalCaseMapper.toEntity(medicalCaseCreationDto);

    // all medical cases are initially unresolved
    medicalCase.setIsResolved(false);

    // current authenticated user is patient
    Patient patient = userService.findPatientById(authService.getAuthenticatedUser().getId());
    medicalCase.setPatient(patient);

    // create doctor assignment obj
    Doctor medicalCasedAssignedDoctor = userService.findDoctorById(
        medicalCaseCreationDto.doctorAssignments().getFirst().doctor().id());
    DoctorAssignment doctorAssignment = DoctorAssignment.builder()
        .doctor(medicalCasedAssignedDoctor)
        .medicalCase(medicalCase)
        .build();
    medicalCase.setDoctorAssignments(List.of(doctorAssignment));

    medicalCaseRepository.save(medicalCase);
  }

  @Override
  @PreAuthorize("hasRole('ROLE_DOCTOR') or hasRole('ROLE_ADMIN') or (hasRole('ROLE_PATIENT') and #patientId == authentication.principal.id)")
  public MedicalCaseResponseDto getCurrentUnresolvedMedicalCaseByPatientId(Long patientId) {
    return medicalCaseMapper.toDto(medicalCaseRepository.findByIsResolvedIsFalse().orElseThrow(
        () -> new ResourceNotFoundException("No unresolved medical case found for patient")));
  }

  @Override
  public MedicalCaseResponseDto getMedicalCaseById(Long medicalCaseId) {
    return medicalCaseMapper.toDto(medicalCaseRepository.findById(medicalCaseId)
        .orElseThrow(() -> new ResourceNotFoundException(MEDICAL_CASE_NOT_FOUND)));
  }

  @Override
  @PreAuthorize("hasRole('ROLE_DOCTOR') or (hasRole('ROLE_PATIENT') and #patientId == authentication.principal.id)")
  public Page<MedicalCaseResponseDto> getAllMedicalCasesForPatient(Long patientId,
      PageRequest pageRequest) {
    // ensure that the doctor who has previously treated the patient and the one treating right now
    // are the only ones who can view all medical cases for a patient
    User user = authService.getAuthenticatedUser();
    if (user.getRole().equals(Role.DOCTOR)) {
      Doctor doctor = userService.findDoctorById(user.getId());
      // check if the doctor has treated the patient before
      boolean doctorHasTreatedPatientInPast = doctor.getDoctorAssignments()
          .stream()
          .map(DoctorAssignment::getMedicalCase)
          .map(MedicalCase::getPatient)
          .anyMatch(patient -> patient.getId().equals(patientId));
      if (!doctorHasTreatedPatientInPast) {
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
    return medicalCaseRepository
        .findAllByDoctorAssignments_Doctor_IdOrderByCreatedAtDesc(doctorId, pageRequest)
        .map(medicalCaseMapper::toDto);
  }

  @Override
  @PreAuthorize("hasRole('ROLE_PATIENT') and @medicalCaseServiceImpl.isPatientAuthorizedToEditMedicalCase(#medicalCaseId)")
  public void markMedicalCaseAsResolved(Long medicalCaseId) {
    MedicalCase medicalCase = medicalCaseRepository.findById(medicalCaseId)
        .orElseThrow(() -> new ResourceNotFoundException(MEDICAL_CASE_NOT_FOUND));
    medicalCase.setIsResolved(true);
    medicalCaseRepository.save(medicalCase);
  }

  @Override
  @PreAuthorize("hasRole('ROLE_PATIENT') and @medicalCaseServiceImpl.isPatientAuthorizedToEditMedicalCase(#medicalCaseId)")
  public void assignNewDoctorToMedicalCase(Long medicalCaseId, Long doctorId) {
    MedicalCase medicalCase = medicalCaseRepository.findById(medicalCaseId)
        .orElseThrow(() -> new ResourceNotFoundException(MEDICAL_CASE_NOT_FOUND));
    // if the doctor is already assigned to the medical case, throw an exception
    if (medicalCase.getDoctorAssignments().getFirst().getDoctor().getId().equals(doctorId)) {
      throw new ResourceConflictException("Doctor is already assigned to the medical case");
    }

    // un-assign previous doctor
    DoctorAssignment doctorAssignment = medicalCase.getDoctorAssignments().stream()
        .filter(da -> da.getUnassignedAt() == null)
        .findFirst()
        .orElseThrow(() -> new RuntimeException(
            "Invalid Doctor assignment, no doctor found whose unassignedAt is null"));
    doctorAssignment.setUnassignedAt(LocalDateTime.now());

    // assign the case to the new doctor
    DoctorAssignment newDoctorAssignment = DoctorAssignment.builder()
        .doctor(userService.findDoctorById(doctorId))
        .medicalCase(medicalCase)
        .build();
    medicalCase.getDoctorAssignments().add(newDoctorAssignment);

    medicalCaseRepository.save(medicalCase);
  }

  public boolean isPatientAuthorizedToEditMedicalCase(Long medicalCaseId) {
    User user = authService.getAuthenticatedUser();
    Patient patient = userService.findPatientById(user.getId());
    MedicalCase medicalCase = medicalCaseRepository.findById(medicalCaseId)
        .orElseThrow(() -> new ResourceNotFoundException(MEDICAL_CASE_NOT_FOUND));
    return medicalCase.getPatient().getId().equals(patient.getId());
  }
}
