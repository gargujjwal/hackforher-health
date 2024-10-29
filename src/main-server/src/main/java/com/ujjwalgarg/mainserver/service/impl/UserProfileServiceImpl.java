package com.ujjwalgarg.mainserver.service.impl;

import com.ujjwalgarg.mainserver.dto.DoctorProfileDto;
import com.ujjwalgarg.mainserver.dto.PatientProfileDto;
import com.ujjwalgarg.mainserver.entity.profile.DoctorProfile;
import com.ujjwalgarg.mainserver.entity.profile.PatientProfile;
import com.ujjwalgarg.mainserver.entity.user.Doctor;
import com.ujjwalgarg.mainserver.exception.ResourceNotFoundException;
import com.ujjwalgarg.mainserver.mapper.DoctorProfileMapper;
import com.ujjwalgarg.mainserver.mapper.PatientProfileMapper;
import com.ujjwalgarg.mainserver.repository.DoctorProfileRepository;
import com.ujjwalgarg.mainserver.repository.DoctorRepository;
import com.ujjwalgarg.mainserver.repository.PatientProfileRepository;
import com.ujjwalgarg.mainserver.service.UserProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
@Slf4j(topic = "USER_PROFILE_SERVICE")
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {

  private final PatientProfileRepository patientProfileRepository;
  private final DoctorProfileRepository doctorProfileRepository;
  private final PatientProfileMapper patientProfileMapper;
  private final DoctorProfileMapper doctorProfileMapper;
  private final DoctorRepository doctorRepository;

  @Override
  @PreAuthorize("hasRole('ROLE_DOCTOR') or (hasRole('ROLE_PATIENT') and #patientId == authentication.principal.id) or hasRole('ROLE_ADMIN')")
  public PatientProfileDto getPatientProfile(Long patientId) {
    log.info("Fetching patient profile for patient ID: {}", patientId);
    PatientProfile profile = patientProfileRepository.findById(patientId).orElseThrow(() -> {
      log.error("Patient profile not found for ID: {}", patientId);
      return new ResourceNotFoundException("Patient profile not found");
    });
    log.info("Patient profile found for patient ID: {}", patientId);
    return patientProfileMapper.toDto(profile);
  }

  @Override
  public DoctorProfileDto getDoctorProfile(Long doctorId) {
    log.info("Fetching doctor profile for doctor ID: {}", doctorId);
    Doctor doctor = getDoctorById(doctorId);
    DoctorProfile profile = getDoctorProfileById(doctorId);
    log.info("Doctor profile found for doctor ID: {}", doctorId);
    return doctorProfileMapper.toDto(profile, doctor);
  }

  @Override
  @PreAuthorize("hasRole('ROLE_PATIENT') and #patientId == authentication.principal.id")
  public PatientProfileDto updatePatientProfile(Long patientId,
      @Valid PatientProfileDto patientProfileUpdateDto) {
    log.info("Updating patient profile for patient ID: {}", patientId);
    PatientProfile patientProfile = getPatientProfileById(patientId);
    patientProfile = patientProfileMapper.partialUpdate(patientProfileUpdateDto, patientProfile);
    PatientProfile updatedProfile = patientProfileRepository.save(patientProfile);
    log.info("Patient profile updated for patient ID: {}", patientId);
    return patientProfileMapper.toDto(updatedProfile);
  }

  @Override
  public DoctorProfileDto updateDoctorProfile(Long doctorId,
      @Valid DoctorProfileDto doctorProfileRequestDto) {
    log.info("Updating doctor profile for doctor ID: {}", doctorId);
    DoctorProfile doctorProfile = getDoctorProfileById(doctorId);
    doctorProfile = doctorProfileMapper.partialUpdate(doctorProfileRequestDto, doctorProfile);
    DoctorProfile updatedProfile = doctorProfileRepository.save(doctorProfile);
    Doctor doctor = getDoctorById(doctorId);
    log.info("Doctor profile updated for doctor ID: {}", doctorId);
    return doctorProfileMapper.toDto(updatedProfile, doctor);
  }

  private Doctor getDoctorById(Long doctorId) {
    return doctorRepository.findById(doctorId).orElseThrow(() -> {
      log.error("Doctor not found for ID: {}", doctorId);
      return new ResourceNotFoundException("Doctor not found");
    });
  }

  private DoctorProfile getDoctorProfileById(Long doctorId) {
    return doctorProfileRepository.findById(doctorId).orElseThrow(() -> {
      log.error("Doctor profile not found for ID: {}", doctorId);
      return new ResourceNotFoundException("Doctor profile not found");
    });
  }

  private PatientProfile getPatientProfileById(Long patientId) {
    return patientProfileRepository.findById(patientId).orElseThrow(() -> {
      log.error("Patient not found with ID: {}", patientId);
      return new ResourceNotFoundException("Patient not found with ID: " + patientId);
    });
  }
}
