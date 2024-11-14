package com.ujjwalgarg.mainserver.service;

import com.ujjwalgarg.mainserver.dto.AppointmentDto;
import com.ujjwalgarg.mainserver.entity.medicalcase.appointment.AppointmentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

/**
 * Service interface for managing appointments.
 */
public interface AppointmentService {

  /**
   * Retrieves all appointments associated with a specific doctor assignment.
   *
   * @param doctorAssignmentId the ID of the doctor assignment
   * @param pageRequest        the pagination information
   * @return a paginated list of AppointmentDto
   */
  Page<AppointmentDto> getAllAppointmentsWithDoctor(Long doctorAssignmentId,
      PageRequest pageRequest);

  /**
   * Retrieves all appointments for a specific patient.
   *
   * @param patientId the ID of the patient
   * @param pageRequest the pagination information
   * @return a paginated list of AppointmentDto
   */
  Page<AppointmentDto> getAllAppointmentsOfPatient(Long patientId, PageRequest pageRequest);

  /**
   * Retrieves an appointment by its ID.
   *
   * @param appointmentId the ID of the appointment
   * @return the AppointmentDto
   */
  AppointmentDto getAppointmentById(Long appointmentId);

  /**
   * Retrieves all appointments for a specific doctor.
   *
   * @param doctorId the ID of the doctor
   * @param pageRequest the pagination information
   * @return a paginated list of AppointmentDto
   */
  Page<AppointmentDto> getAllAppointmentsOfDoctor(Long doctorId, PageRequest pageRequest);

  /**
   * Creates a new appointment for a specific doctor assignment.
   *
   * @param doctorAssignmentId the ID of the doctor assignment
   * @param appointmentCreationDto the DTO containing the details of the appointment to be created
   */
  void createAppointment(Long doctorAssignmentId, AppointmentDto appointmentCreationDto);

  /**
   * Updates an existing appointment.
   *
   * @param appointmentId the ID of the appointment to be updated
   * @param appointmentUpdateDto the DTO containing the updated details of the appointment
   */
  void updateAppointment(Long appointmentId, AppointmentDto appointmentUpdateDto);

  /**
   * Changes the status of an appointment.
   *
   * @param appointmentId the ID of the appointment
   * @param newStatus the new status of the appointment
   */
  void changeStatusOfAppointment(Long appointmentId, AppointmentStatus newStatus);
}
