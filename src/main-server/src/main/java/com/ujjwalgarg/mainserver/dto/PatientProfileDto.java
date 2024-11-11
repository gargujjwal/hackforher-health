package com.ujjwalgarg.mainserver.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ujjwalgarg.mainserver.annotation.NullOrNotBlank;
import com.ujjwalgarg.mainserver.entity.profile.Insurance;
import com.ujjwalgarg.mainserver.entity.user.Role;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

/**
 * DTO for {@link com.ujjwalgarg.mainserver.entity.profile.PatientProfile}
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record PatientProfileDto(@NullOrNotBlank String gender, Boolean isSmoker,
                                Boolean drinksAlcohol,
                                @NullOrNotBlank String bloodType,
                                @NullOrNotBlank String medicalHistory,
                                @NullOrNotBlank String foodPreference,
                                @NullOrNotBlank String familyMedicalHistory,
                                @NullOrNotBlank String address,
                                @NotNull Set<@NullOrNotBlank String> phoneNumber,
                                @NullOrNotBlank String secondaryEmail,
                                @NullOrNotBlank String emergencyContactName,
                                @NullOrNotBlank String emergencyContactNumber,
                                @NullOrNotBlank String emergencyContactEmail,
                                @NotNull Set<@Valid Insurance> insuranceDetails,
                                @NotNull Set<@NullOrNotBlank String> currentMedications,
                                @NotNull Set<@NullOrNotBlank String> allergies, Long id,
                                PatientDto patient) implements
    Serializable {

  /**
   * DTO for {@link com.ujjwalgarg.mainserver.entity.user.Patient}
   */
  public record PatientDto(Long id, String email, String firstName, String lastName, LocalDateTime dob, LocalDateTime createdAt, Role role) implements
      Serializable {

  }
}
