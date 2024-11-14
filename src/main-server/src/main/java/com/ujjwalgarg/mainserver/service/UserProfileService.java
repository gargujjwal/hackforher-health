package com.ujjwalgarg.mainserver.service;

import com.ujjwalgarg.mainserver.dto.DoctorProfileDto;
import com.ujjwalgarg.mainserver.dto.PatientProfileDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

/** Service interface for handling user profile operations. */
public interface UserProfileService {

  /**
   * Retrieves the profile of a patient by their ID.
   *
   * @param patientId the ID of the patient
   * @return the patient profile data
   */
  PatientProfileDto getPatientProfile(Long patientId);

  /**
   * Retrieves the profile of a doctor by their ID.
   *
   * @param doctorId the ID of the doctor
   * @return the doctor profile data
   */
  DoctorProfileDto getDoctorProfile(Long doctorId);

  /**
   * Updates the profile of a patient.
   *
   * @param patientId the ID of the patient
   * @param patientProfileRequestDto the updated patient profile data
   * @return the updated patient profile data
   */
  PatientProfileDto updatePatientProfile(
      Long patientId, PatientProfileDto patientProfileRequestDto);

  /**
   * Updates the profile of a doctor.
   *
   * @param doctorId the ID of the doctor
   * @param doctorProfileRequestDto the updated doctor profile data
   * @return the updated doctor profile data
   */
  DoctorProfileDto updateDoctorProfile(Long doctorId, DoctorProfileDto doctorProfileRequestDto);

  Page<DoctorProfileDto> getAllDoctors(PageRequest pageRequest);
}
