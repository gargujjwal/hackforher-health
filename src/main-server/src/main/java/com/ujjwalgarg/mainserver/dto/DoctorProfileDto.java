package com.ujjwalgarg.mainserver.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ujjwalgarg.mainserver.annotation.NullOrUrl;
import com.ujjwalgarg.mainserver.entity.profile.ConsultationTiming;
import com.ujjwalgarg.mainserver.entity.profile.MedicalPublication;
import com.ujjwalgarg.mainserver.entity.profile.MedicalQualification;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.io.Serializable;
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
    // Doctor attributes
    Double avgRating,
    Integer noAppointmentsFailed,
    Set<ConsultationTiming> consultationTimings
) implements Serializable {
}
