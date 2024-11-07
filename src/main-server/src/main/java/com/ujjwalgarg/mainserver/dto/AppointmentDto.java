package com.ujjwalgarg.mainserver.dto;

import com.ujjwalgarg.mainserver.annotation.ValidAppointment;
import com.ujjwalgarg.mainserver.entity.medicalcase.appointment.AppointmentStatus;
import com.ujjwalgarg.mainserver.entity.medicalcase.appointment.AppointmentType;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link com.ujjwalgarg.mainserver.entity.medicalcase.appointment.Appointment}
 */
@ValidAppointment
public record AppointmentDto(
    LocalDateTime startTime,
    LocalDateTime endTime,
    AppointmentType appointmentType,
    String meetLink,
    Long id,
    LocalDateTime createdAt,
    AppointmentStatus appointmentStatus)
    implements Serializable {}
