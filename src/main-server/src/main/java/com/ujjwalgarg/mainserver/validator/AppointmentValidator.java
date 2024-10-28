package com.ujjwalgarg.mainserver.validator;

import com.ujjwalgarg.mainserver.annotation.ValidAppointment;
import com.ujjwalgarg.mainserver.dto.AppointmentDto;
import com.ujjwalgarg.mainserver.entity.medicalcase.appointment.AppointmentType;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class AppointmentValidator implements ConstraintValidator<ValidAppointment, AppointmentDto> {

  @Override
  public boolean isValid(AppointmentDto appointmentDto, ConstraintValidatorContext context) {
    if (appointmentDto == null) {
      return true; // Skip validation if appointmentDto is null
    }

    context.disableDefaultConstraintViolation();

    LocalDateTime startTime = appointmentDto.startTime();
    LocalDateTime endTime = appointmentDto.endTime();

    if (startTime == null || endTime == null) {
      context.buildConstraintViolationWithTemplate("Start and end time must be provided")
          .addPropertyNode("startTime").addConstraintViolation();
      context.buildConstraintViolationWithTemplate("Start and end time must be provided")
          .addPropertyNode("endTime").addConstraintViolation();
      return false;
    }
    // Check that the appointment is scheduled in the future
    if (startTime.isBefore(LocalDateTime.now())) {
      context.buildConstraintViolationWithTemplate("Appointment must be scheduled in the future")
          .addPropertyNode("startTime").addConstraintViolation();
      return false;
    }

    // Check that the appointment is scheduled at least 48 hours from now
    if (startTime.isBefore(LocalDateTime.now().plusHours(48))) {
      context.buildConstraintViolationWithTemplate(
              "Appointments must be scheduled at least 48 hours in advance")
          .addPropertyNode("startTime").addConstraintViolation();
      return false;
    }

    // Check appointment duration (20-60 minutes)
    Duration duration = Duration.between(startTime, endTime);
    if (duration.toMinutes() < 20 || duration.toMinutes() > 60) {
      context.buildConstraintViolationWithTemplate(
              "Appointment duration must be between 20 and 60 minutes").addPropertyNode("endTime")
          .addConstraintViolation();
      return false;
    }

    // Ensure appointment is not scheduled during absurd hours (10 PM - 6 AM)
    LocalTime startHour = startTime.toLocalTime();
    if (startHour.isAfter(LocalTime.of(22, 0)) || startHour.isBefore(LocalTime.of(7, 0))) {
      context.buildConstraintViolationWithTemplate(
              "Appointments cannot be scheduled between 10 PM and 7 AM").addPropertyNode("startTime")
          .addConstraintViolation();
      return false;
    }

    // If appointment type is online, validate the meet link
    if (appointmentDto.appointmentType() == AppointmentType.ONLINE) {
      String meetLink = appointmentDto.meetLink();
      if (meetLink == null || meetLink.isBlank()) {
        context.buildConstraintViolationWithTemplate(
                "Meet link is required for online appointments").addPropertyNode("meetLink")
            .addConstraintViolation();
        return false;
      }

      try {
        new URI(meetLink); // Validate URI format
      } catch (URISyntaxException e) {
        context.buildConstraintViolationWithTemplate("Meet link must be a valid URL")
            .addPropertyNode("meetLink").addConstraintViolation();
        return false;
      }
    }

    return true;
  }
}
