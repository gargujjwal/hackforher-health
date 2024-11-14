package com.ujjwalgarg.mainserver.dto;

import jakarta.validation.constraints.*;

public record DoctorAssignmentCreationDto(@NotNull @Positive Long doctorId) {

}
