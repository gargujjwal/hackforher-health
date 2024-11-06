package com.ujjwalgarg.mainserver.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ujjwalgarg.mainserver.annotation.NullOrUrl;
import com.ujjwalgarg.mainserver.entity.profile.ConsultationTiming;
import com.ujjwalgarg.mainserver.entity.profile.MedicalPublication;
import com.ujjwalgarg.mainserver.entity.profile.MedicalQualification;
import com.ujjwalgarg.mainserver.entity.user.Role;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

/**
 * DTO for {@link com.ujjwalgarg.mainserver.entity.profile.DoctorProfile}
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record DoctorProfileDto(
    @NullOrUrl String medicalCertificatePath,
    @NotBlank String medicalLicenseNumber,
    @NotBlank String address,
    @NotBlank String phoneNumber,
    @NotBlank String secondaryEmail,
    @NotNull Set<@Valid MedicalQualification> qualifications,
    @NotNull Set<@Valid MedicalPublication> publications,
    Long id, DoctorDto doctor) implements Serializable {

  /**
   * DTO for {@link com.ujjwalgarg.mainserver.entity.user.Doctor}
   */
  public record DoctorDto(Long id, String email, String firstName, String lastName,
                          LocalDateTime dob, String passwordHash, LocalDateTime createdAt,
                          Role role, Double avgRating, Integer noAppointmentsFailed,
                          Set<ConsultationTiming> consultationTimings) implements
      Serializable {

  }
}
