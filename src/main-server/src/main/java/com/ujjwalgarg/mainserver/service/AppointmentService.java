package com.ujjwalgarg.mainserver.service;


import com.ujjwalgarg.mainserver.dto.AppointmentDto;
import com.ujjwalgarg.mainserver.entity.medicalcase.appointment.AppointmentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface AppointmentService {

  Page<AppointmentDto> getAllAppointmentsWithDoctor(Long doctorAssignmentId,
      PageRequest pageRequest);

  Page<AppointmentDto> getAllAppointmentsOfPatient(Long patientId, PageRequest pageRequest);

  AppointmentDto getAppointmentById(Long appointmentId);

  Page<AppointmentDto> getAllAppointmentsOfDoctor(Long doctorId, PageRequest pageRequest);

  void createAppointment(Long doctorAssignmentId, AppointmentDto appointmentCreationDto);

  void updateAppointment(Long appointmentId, AppointmentDto appointmentUpdateDto);

  void changeStatusOfAppointment(Long appointmentId, AppointmentStatus newStatus);
}
