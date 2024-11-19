package com.ujjwalgarg.mainserver.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link com.ujjwalgarg.mainserver.entity.medicalcase.MedicalCase}
 */
public record MedicalCaseCreationDto(@NotBlank String caseDescription,
                                     @NotNull @Size(min = 1, max = 1) List<DoctorAssignmentDto> doctorAssignments) implements
    Serializable {

  /**
   * DTO for {@link com.ujjwalgarg.mainserver.entity.medicalcase.DoctorAssignment}
   */
  public record DoctorAssignmentDto(
      @NotNull MedicalCaseCreationDto.DoctorAssignmentDto.DoctorDto doctor) implements
      Serializable {

    /**
     * DTO for {@link com.ujjwalgarg.mainserver.entity.user.Doctor}
     */
    public record DoctorDto(@NotNull @Positive Long id) implements Serializable {

    }
  }
}
