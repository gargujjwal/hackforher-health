package com.ujjwalgarg.mainserver.service.impl;

import com.ujjwalgarg.mainserver.dto.AppointmentDto;
import com.ujjwalgarg.mainserver.entity.medicalcase.DoctorAssignment;
import com.ujjwalgarg.mainserver.entity.medicalcase.appointment.Appointment;
import com.ujjwalgarg.mainserver.entity.medicalcase.appointment.AppointmentStatus;
import com.ujjwalgarg.mainserver.entity.user.Doctor;
import com.ujjwalgarg.mainserver.entity.user.Patient;
import com.ujjwalgarg.mainserver.entity.user.Role;
import com.ujjwalgarg.mainserver.entity.user.User;
import com.ujjwalgarg.mainserver.exception.ResourceConflictException;
import com.ujjwalgarg.mainserver.exception.ResourceNotFoundException;
import com.ujjwalgarg.mainserver.mapper.AppointmentMapper;
import com.ujjwalgarg.mainserver.repository.AppointmentRepository;
import com.ujjwalgarg.mainserver.repository.DoctorAssignmentRepository;
import com.ujjwalgarg.mainserver.service.AppointmentService;
import com.ujjwalgarg.mainserver.service.AuthService;
import jakarta.validation.Valid;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
@Slf4j(topic = "APPOINTMENT_SERVICE")
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

  private final AppointmentMapper appointmentMapper;
  private final AppointmentRepository appointmentRepository;
  private final DoctorAssignmentRepository doctorAssignmentRepository;
  private final AuthService authService;

  @Override
  @PreAuthorize("hasRole('ROLE_PATIENT')")
  public Page<AppointmentDto> getAllAppointmentsWithDoctor(Long doctorAssignmentId,
      PageRequest pageRequest) {
    log.info("Fetching all appointments for doctor assignment ID: {}", doctorAssignmentId);
    validateDoctorAssignmentExists(doctorAssignmentId);

    return appointmentRepository.findAllAppointmentByDoctorAssignment_Id(doctorAssignmentId,
            pageRequest)
        .map(appointmentMapper::toDto);
  }

  @Override
  @PreAuthorize("hasRole('ROLE_PATIENT') and #patientId == authentication.principal.id")
  public Page<AppointmentDto> getAllAppointmentsOfPatient(Long patientId, PageRequest pageRequest) {
    log.info("Fetching all appointments for patient ID: {}", patientId);
    return appointmentRepository.findAllByDoctorAssignment_MedicalCase_PatientId(patientId,
        pageRequest).map(appointmentMapper::toDto);
  }

  @Override
  public AppointmentDto getAppointmentById(Long appointmentId) {
    log.info("Fetching appointment by ID: {}", appointmentId);
    User user = authService.getAuthenticatedUser();
    validateUserAccessToAppointment(user, appointmentId);

    Appointment appointment = getAppointment(appointmentId);
    return appointmentMapper.toDto(appointment);
  }

  @Override
  @PreAuthorize("hasAnyRole('ROLE_DOCTOR') and #doctorId == authentication.principal.id")
  public Page<AppointmentDto> getAllAppointmentsOfDoctor(Long doctorId, PageRequest pageRequest) {
    log.info("Fetching all appointments for doctor ID: {}", doctorId);
    return appointmentRepository
        .findByDoctorAssignment_Doctor_IdOrderByStartTimeDesc(doctorId, pageRequest)
        .map(appointmentMapper::toDto);
  }

  @Override
  @PreAuthorize("hasRole('ROLE_PATIENT')")
  public void createAppointment(Long doctorAssignmentId,
      @Valid AppointmentDto appointmentCreationDto) {
    log.info("Creating appointment for doctor assignment ID: {}", doctorAssignmentId);
    DoctorAssignment doctorAssignment = getDoctorAssignment(doctorAssignmentId);
    Doctor doctor = doctorAssignment.getDoctor();

    LocalDateTime requestedStart = appointmentCreationDto.startTime();
    LocalDateTime requestedEnd = appointmentCreationDto.endTime();
    validateAppointmentTime(doctor, requestedStart, requestedEnd);

    Appointment appointment = appointmentMapper.toEntity(appointmentCreationDto);
    appointment.setDoctorAssignment(doctorAssignment);
    doctorAssignment.getAppointments().add(appointment);
    appointment.setAppointmentStatus(AppointmentStatus.PENDING);
    appointment.setId(null);
    appointmentRepository.save(appointment);
    log.info("Appointment created successfully for doctor assignment ID: {}", doctorAssignmentId);
  }

  @Override
  @PreAuthorize("hasRole('ROLE_PATIENT')")
  public void updateAppointment(Long appointmentId, @Valid AppointmentDto appointmentUpdateDto) {
    log.info("Updating appointment ID: {}", appointmentId);
    User user = authService.getAuthenticatedUser();
    validateUserAccessToUpdateAppointment(user, appointmentId);

    Appointment oldAppointment = getAppointment(appointmentId);
    Doctor doctor = oldAppointment.getDoctorAssignment().getDoctor();
    validateAppointmentTime(doctor, appointmentUpdateDto.startTime(),
        appointmentUpdateDto.endTime());

    Appointment updatedAppointment = appointmentMapper.partialUpdate(appointmentUpdateDto,
        oldAppointment);
    updatedAppointment.setId(appointmentId);
    updatedAppointment.setAppointmentStatus(oldAppointment.getAppointmentStatus());
    appointmentRepository.save(updatedAppointment);
    log.info("Appointment updated successfully for ID: {}", appointmentId);
  }

  @Override
  @PreAuthorize("hasAnyRole('ROLE_PATIENT', 'ROLE_DOCTOR')")
  public void changeStatusOfAppointment(Long appointmentId, AppointmentStatus newStatus) {
    log.info("Changing status of appointment ID: {} to {}", appointmentId, newStatus);
    User user = authService.getAuthenticatedUser();

    Appointment oldAppointment = getAppointment(appointmentId);
    validateStatusChange(user, oldAppointment, newStatus);

    oldAppointment.setAppointmentStatus(newStatus);
    appointmentRepository.save(oldAppointment);
    log.info("Status of appointment ID: {} changed to {}", appointmentId, newStatus);
  }

  private void validateDoctorAssignmentExists(Long doctorAssignmentId) {
    if (!doctorAssignmentRepository.existsById(doctorAssignmentId)) {
      log.error("DoctorAssignment does not exist for ID: {}", doctorAssignmentId);
      throw new ResourceNotFoundException("DoctorAssignment not found");
    }
  }

  private DoctorAssignment getDoctorAssignment(Long doctorAssignmentId) {
    return doctorAssignmentRepository.findById(doctorAssignmentId)
        .orElseThrow(() -> {
          log.error("DoctorAssignment not found for ID: {}", doctorAssignmentId);
          return new ResourceNotFoundException("DoctorAssignment not found");
        });
  }

  private Appointment getAppointment(Long appointmentId) {
    return appointmentRepository.findById(appointmentId)
        .orElseThrow(() -> {
          log.error("Appointment not found for ID: {}", appointmentId);
          return new ResourceNotFoundException("Appointment not found");
        });
  }

  private void validateUserAccessToAppointment(User user, Long appointmentId) {
    if (user.getRole().equals(Role.PATIENT)
        && !appointmentRepository.existsByDoctorAssignment_MedicalCase_Patient_Id(user.getId())) {
      log.error("Access denied for user ID: {} to appointment ID: {}", user.getId(), appointmentId);
      throw new AccessDeniedException("You are not authorized to access this appointment");
    }
    if (user.getRole().equals(Role.DOCTOR)
        && !appointmentRepository.existsByDoctorAssignment_Doctor_Id(user.getId())) {
      log.error("Access denied for user ID: {} to appointment ID: {}", user.getId(), appointmentId);
      throw new AccessDeniedException("You are not authorized to access this appointment");
    }
  }

  private void validateUserAccessToUpdateAppointment(User user, Long appointmentId) {
    if (!appointmentRepository.existsByIdAndDoctorAssignment_MedicalCase_Patient_Id(appointmentId,
        user.getId())) {
      log.error("Access denied for user ID: {} to update appointment ID: {}", user.getId(),
          appointmentId);
      throw new AccessDeniedException("You are not authorized to update this appointment");
    }
  }

  private void validateStatusChange(User user, Appointment oldAppointment,
      AppointmentStatus newStatus) {
    if (oldAppointment.getAppointmentStatus().equals(AppointmentStatus.CANCELLED)) {
      log.error("Cannot change the status of a canceled appointment ID: {}",
          oldAppointment.getId());
      throw new IllegalArgumentException("Cannot change the status of a canceled appointment.");
    }

    Doctor doctor = oldAppointment.getDoctorAssignment().getDoctor();
    Patient patient = oldAppointment.getDoctorAssignment().getMedicalCase().getPatient();

    if (user.getRole().equals(Role.PATIENT)) {
      if (!user.getId().equals(patient.getId())) {
        log.error("Access denied for patient ID: {} to change status of appointment ID: {}",
            user.getId(), oldAppointment.getId());
        throw new AccessDeniedException(
            "You are not authorized to change the status of this appointment");
      }
      if (!newStatus.equals(AppointmentStatus.CANCELLED)) {
        log.error("Patients can only change the status to CANCELLED for appointment ID: {}",
            oldAppointment.getId());
        throw new IllegalArgumentException("Patients can only change the status to CANCELLED.");
      }
    }

    if (user.getRole().equals(Role.DOCTOR)) {
      if (!user.getId().equals(doctor.getId())) {
        log.error("Access denied for doctor ID: {} to change status of appointment ID: {}",
            user.getId(), oldAppointment.getId());
        throw new AccessDeniedException(
            "You are not authorized to change the status of this appointment");
      }
      if (!newStatus.equals(AppointmentStatus.ACCEPTED) &&
          !newStatus.equals(AppointmentStatus.REJECTED) &&
          !newStatus.equals(AppointmentStatus.CANCELLED)) {
        log.error(
            "Doctors can only change the status to ACCEPTED, REJECTED, or CANCELLED for appointment ID: {}",
            oldAppointment.getId());
        throw new IllegalArgumentException(
            "Doctors can only change the status to ACCEPTED, REJECTED, or CANCELLED.");
      }
    }
  }

  private void validateAppointmentTime(Doctor doctor, LocalDateTime requestedStart,
      LocalDateTime requestedEnd) {
    log.info("Validating appointment time for doctor ID: {}", doctor.getId());
    boolean withinConsultationTiming = doctor.getConsultationTimings().stream().anyMatch(timing -> {
      DayOfWeek dayOfWeek = timing.getDay();
      LocalTime consultationStart = timing.getStartTime();
      LocalTime consultationEnd = timing.getEndTime();

      return requestedStart.toLocalDate().getDayOfWeek().equals(dayOfWeek) &&
          !requestedStart.toLocalTime().isBefore(consultationStart) &&
          !requestedEnd.toLocalTime().isAfter(consultationEnd);
    });

    if (!withinConsultationTiming) {
      log.error("Appointment time is outside of doctor's consultation hours for doctor ID: {}",
          doctor.getId());
      throw new ResourceConflictException(
          "Appointment time is outside of doctor's consultation hours");
    }

    boolean hasConflict = appointmentRepository.findByDoctorAndTimeRange(doctor, requestedStart,
            requestedEnd)
        .stream()
        .filter(existingAppointment -> !existingAppointment.getAppointmentStatus()
            .equals(AppointmentStatus.CANCELLED))
        .anyMatch(existingAppointment ->
            existingAppointment.getEndTime().isAfter(requestedStart) &&
                existingAppointment.getStartTime().isBefore(requestedEnd)
        );

    if (hasConflict) {
      log.error(
          "The requested appointment time conflicts with another appointment for doctor ID: {}",
          doctor.getId());
      throw new ResourceConflictException(
          "The requested appointment time conflicts with another appointment.");
    }
  }
}
