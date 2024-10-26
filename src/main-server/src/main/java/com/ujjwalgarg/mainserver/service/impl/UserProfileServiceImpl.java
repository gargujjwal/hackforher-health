package com.ujjwalgarg.mainserver.service.impl;

import com.ujjwalgarg.mainserver.dto.DoctorProfileDto;
import com.ujjwalgarg.mainserver.dto.PatientProfileDto;
import com.ujjwalgarg.mainserver.entity.profile.DoctorProfile;
import com.ujjwalgarg.mainserver.entity.profile.PatientProfile;
import com.ujjwalgarg.mainserver.exception.ResourceNotFoundException;
import com.ujjwalgarg.mainserver.mapper.DoctorProfileMapper;
import com.ujjwalgarg.mainserver.mapper.PatientProfileMapper;
import com.ujjwalgarg.mainserver.repository.DoctorProfileRepository;
import com.ujjwalgarg.mainserver.repository.PatientProfileRepository;
import com.ujjwalgarg.mainserver.service.UserProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {

  private final PatientProfileRepository patientProfileRepository;
  private final DoctorProfileRepository doctorProfileRepository;
  private final PatientProfileMapper patientProfileMapper;
  private final DoctorProfileMapper doctorProfileMapper;

  @Override
  @PreAuthorize("hasRole('ROLE_DOCTOR') or (hasRole('ROLE_PATIENT') and #patientId == authentication.principal.id) or hasRole('ROLE_ADMIN')")
  public PatientProfileDto getPatientProfile(Long patientId) {
    PatientProfile profile = patientProfileRepository.findById(patientId).orElseThrow(() -> {
      log.error("Patient profile not found for id: {}", patientId);
      return new ResourceNotFoundException("Patient profile not found");
    });
    return patientProfileMapper.toDto(profile);
  }

  @Override
  public DoctorProfileDto getDoctorProfile(Long doctorId) {
    DoctorProfile profile = doctorProfileRepository.findById(doctorId).orElseThrow(() -> {
      log.error("Doctor profile not found for id: {}", doctorId);
      return new ResourceNotFoundException("Doctor profile not found");
    });
    return doctorProfileMapper.toDto(profile);
  }

  @Override
  @PreAuthorize("hasRole('ROLE_PATIENT') and #patientId == authentication.principal.id")
  public PatientProfileDto updatePatientProfile(Long patientId,
      @Valid PatientProfileDto patientProfileUpdateDto) {
    PatientProfile patientProfile = patientProfileRepository.findById(patientId)
        .orElseThrow(
            () -> new ResourceNotFoundException("Patient not found with id: " + patientId));
    patientProfile = patientProfileMapper.partialUpdate(patientProfileUpdateDto, patientProfile);

    PatientProfile updatedProfile = patientProfileRepository.save(patientProfile);
    return patientProfileMapper.toDto(updatedProfile);
  }

  @Override
  public DoctorProfileDto updateDoctorProfile(Long doctorId,
      @Valid DoctorProfileDto doctorProfileRequestDto) {
    DoctorProfile doctorProfile = doctorProfileRepository.findById(doctorId)
        .orElseThrow(
            () -> new ResourceNotFoundException("Doctor not found with id: " + doctorId));
    doctorProfile = doctorProfileMapper.partialUpdate(doctorProfileRequestDto, doctorProfile);

    DoctorProfile updatedProfile = doctorProfileRepository.save(doctorProfile);
    return doctorProfileMapper.toDto(updatedProfile);
  }
}
