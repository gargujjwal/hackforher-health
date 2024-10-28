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
@Slf4j
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
    // make sure that only patient can access this method
    if (!doctorAssignmentRepository.existsById(doctorAssignmentId)) {
      throw new ResourceNotFoundException("DoctorAssignment not found");
    }

    return appointmentRepository.findAllAppointmentByDoctorAssignment_Id(doctorAssignmentId,
            pageRequest)
        .map(appointmentMapper::toDto);
  }

  @Override
  @PreAuthorize("hasRole('ROLE_PATIENT') and #patientId == authentication.principal.id")
  public Page<AppointmentDto> getAllAppointmentsOfPatient(Long patientId, PageRequest pageRequest) {
    return appointmentRepository.findAllByDoctorAssignment_MedicalCase_PatientId(patientId,
        pageRequest).map(appointmentMapper::toDto);
  }

  @Override
  public AppointmentDto getAppointmentById(Long appointmentId) {
    User user = authService.getAuthenticatedUser();
    // only patient who created the appointment or doctor assigned to the appointment can access it
    if (user.getRole().equals(Role.PATIENT)
        && !appointmentRepository.existsByDoctorAssignment_MedicalCase_Patient_Id(user.getId())) {
      throw new AccessDeniedException("You are not authorized to access this appointment");
    }
    if (user.getRole().equals(Role.DOCTOR)
        && !appointmentRepository.existsByDoctorAssignment_Doctor_Id(user.getId())) {
      throw new AccessDeniedException("You are not authorized to access this appointment");
    }

    Appointment appointment = appointmentRepository.findById(appointmentId)
        .orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));
    return appointmentMapper.toDto(appointment);
  }

  @Override
  @PreAuthorize("hasAnyRole('ROLE_DOCTOR') and #doctorId == authentication.principal.id")
  public Page<AppointmentDto> getAllAppointmentsOfDoctor(Long doctorId, PageRequest pageRequest) {
    return appointmentRepository
        .findByDoctorAssignment_Doctor_IdOrderByStartTimeDesc(doctorId, pageRequest)
        .map(appointmentMapper::toDto);
  }

  @Override
  @PreAuthorize("hasRole('ROLE_PATIENT')")
  public void createAppointment(Long doctorAssignmentId,
      @Valid AppointmentDto appointmentCreationDto) {
    // check if the doctor slot is available in the given time slot for the doctor
    DoctorAssignment doctorAssignment = doctorAssignmentRepository.findById(doctorAssignmentId)
        .orElseThrow(() -> new ResourceNotFoundException("DoctorAssignment not found"));
    Doctor doctor = doctorAssignment.getDoctor();

    // validating new appointment
    LocalDateTime requestedStart = appointmentCreationDto.startTime();
    LocalDateTime requestedEnd = appointmentCreationDto.endTime();
    validateAppointmentTime(doctor, requestedStart, requestedEnd);

    // save appointment
    Appointment appointment = appointmentMapper.toEntity(appointmentCreationDto);
    appointment.setDoctorAssignment(doctorAssignment);
    doctorAssignment.getAppointments().add(appointment);
    appointment.setAppointmentStatus(AppointmentStatus.PENDING);
    appointment.setId(null);
    appointmentRepository.save(appointment);
  }

  @Override
  @PreAuthorize("hasRole('ROLE_PATIENT')")
  public void updateAppointment(Long appointmentId, @Valid AppointmentDto appointmentUpdateDto) {
    // check if the appointment belongs to the patient currently logged in
    User user = authService.getAuthenticatedUser();
    if (!appointmentRepository.existsByIdAndDoctorAssignment_MedicalCase_Patient_Id(appointmentId,
        user.getId())) {
      throw new AccessDeniedException("You are not authorized to update this appointment");
    }

    Appointment oldAppointment = appointmentRepository.findById(appointmentId)
        .orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));
    Doctor doctor = oldAppointment.getDoctorAssignment().getDoctor();
    validateAppointmentTime(doctor, appointmentUpdateDto.startTime(),
        appointmentUpdateDto.endTime());

    Appointment updatedAppointment = appointmentMapper.partialUpdate(appointmentUpdateDto,
        oldAppointment);
    // prevent dto from changing the id
    updatedAppointment.setId(appointmentId);
    updatedAppointment.setAppointmentStatus(oldAppointment.getAppointmentStatus());
    appointmentRepository.save(updatedAppointment);
  }

  @Override
  @PreAuthorize("hasAnyRole('ROLE_PATIENT', 'ROLE_DOCTOR')")
  public void changeStatusOfAppointment(Long appointmentId, AppointmentStatus newStatus) {
    // make sure that only patient who created the appointment or doctor assigned to the appointment can access it
    User user = authService.getAuthenticatedUser();

    Appointment oldAppointment = appointmentRepository.findById(appointmentId)
        .orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));

    // Prevent further changes if the appointment is already canceled
    if (oldAppointment.getAppointmentStatus().equals(AppointmentStatus.CANCELLED)) {
      throw new IllegalArgumentException("Cannot change the status of a canceled appointment.");
    }

    Doctor doctor = oldAppointment.getDoctorAssignment().getDoctor();
    Patient patient = oldAppointment.getDoctorAssignment().getMedicalCase().getPatient();

    if (user.getRole().equals(Role.PATIENT)) {
      if (!user.getId().equals(patient.getId())) {
        throw new AccessDeniedException(
            "You are not authorized to change the status of this appointment");
      }
      if (!newStatus.equals(AppointmentStatus.CANCELLED)) {
        throw new IllegalArgumentException("Patients can only change the status to CANCELLED.");
      }
    }

    // Check if the user is a doctor and ensure they can change the status to ACCEPTED, REJECTED, or CANCELLED
    if (user.getRole().equals(Role.DOCTOR)) {
      if (!user.getId().equals(doctor.getId())) {
        throw new AccessDeniedException(
            "You are not authorized to change the status of this appointment");
      }
      if (!newStatus.equals(AppointmentStatus.ACCEPTED) &&
          !newStatus.equals(AppointmentStatus.REJECTED) &&
          !newStatus.equals(AppointmentStatus.CANCELLED)) {
        throw new IllegalArgumentException(
            "Doctors can only change the status to ACCEPTED, REJECTED, or CANCELLED.");
      }
    }

    oldAppointment.setAppointmentStatus(newStatus);
    appointmentRepository.save(oldAppointment);
  }

  private void validateAppointmentTime(Doctor doctor, LocalDateTime requestedStart,
      LocalDateTime requestedEnd) {
    // Validation 1: Check if the appointment time is within the doctor's consultation timings
    boolean withinConsultationTiming = doctor.getConsultationTimings().stream().anyMatch(timing -> {
      DayOfWeek dayOfWeek = timing.getDay();
      LocalTime consultationStart = timing.getStartTime();
      LocalTime consultationEnd = timing.getEndTime();

      // Check if the appointment is on the same day and within the consultation time
      return requestedStart.toLocalDate().getDayOfWeek().equals(dayOfWeek) &&
          !requestedStart.toLocalTime().isBefore(consultationStart) &&
          !requestedEnd.toLocalTime().isAfter(consultationEnd);
    });

    if (!withinConsultationTiming) {
      throw new ResourceConflictException(
          "Appointment time is outside of doctor's consultation hours");
    }

    // Step 2: Check for conflicts with existing appointments, excluding canceled ones
    boolean hasConflict = appointmentRepository.findByDoctorAndTimeRange(doctor, requestedStart,
            requestedEnd)
        .stream()
        .filter(existingAppointment -> !existingAppointment.getAppointmentStatus()
            .equals(AppointmentStatus.CANCELLED)) // Exclude canceled appointments
        .anyMatch(existingAppointment ->
            existingAppointment.getEndTime().isAfter(requestedStart) &&
                existingAppointment.getStartTime().isBefore(requestedEnd)
        );

    if (hasConflict) {
      throw new ResourceConflictException(
          "The requested appointment time conflicts with another appointment.");
    }
  }
}
