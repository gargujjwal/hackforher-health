package com.ujjwalgarg.mainserver.controller;

import com.ujjwalgarg.mainserver.dto.ApiResponse;
import com.ujjwalgarg.mainserver.dto.AppointmentDto;
import com.ujjwalgarg.mainserver.dto.PageResponse;
import com.ujjwalgarg.mainserver.entity.medicalcase.appointment.AppointmentStatus;
import com.ujjwalgarg.mainserver.service.AppointmentService;
import jakarta.validation.Valid;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/appointment", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class AppointmentController {

  private final AppointmentService appointmentService;

  @GetMapping(path = "/doctor-assignment/{doctorAssignmentId}", consumes = MediaType.ALL_VALUE)
  ResponseEntity<ApiResponse<PageResponse<AppointmentDto>>> getAllAppointmentsWithDoctorAssignmentId(
      @PathVariable("doctorAssignmentId") Long doctorAssignmentId,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    PageRequest pageRequest = PageRequest.of(page, size);
    Page<AppointmentDto> appointments = appointmentService.getAllAppointmentsWithDoctor(
        doctorAssignmentId, pageRequest);
    return ResponseEntity.ok(ApiResponse.success(PageResponse.from(appointments)));
  }

  @GetMapping(path = "/patient/{patientId}", consumes = MediaType.ALL_VALUE)
  ResponseEntity<ApiResponse<PageResponse<AppointmentDto>>> getAllAppointmentsOfPatient(
      @PathVariable("patientId") Long patientId,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    PageRequest pageRequest = PageRequest.of(page, size);
    Page<AppointmentDto> appointments = appointmentService.getAllAppointmentsOfPatient(
        patientId, pageRequest);
    return ResponseEntity.ok(ApiResponse.success(PageResponse.from(appointments)));
  }

  @GetMapping(path = "/{appointmentId}", consumes = MediaType.ALL_VALUE)
  ResponseEntity<ApiResponse<AppointmentDto>> getAppointmentById(
      @PathVariable("appointmentId") Long appointmentId) {
    AppointmentDto appointment = appointmentService.getAppointmentById(appointmentId);
    return ResponseEntity.ok(ApiResponse.success(appointment));
  }

  @GetMapping(path = "/doctor/{doctorId}", consumes = MediaType.ALL_VALUE)
  ResponseEntity<ApiResponse<PageResponse<AppointmentDto>>> getAllAppointmentsOfDoctor(
      @PathVariable("doctorId") Long doctorId,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    PageRequest pageRequest = PageRequest.of(page, size);
    Page<AppointmentDto> appointments = appointmentService.getAllAppointmentsOfDoctor(
        doctorId, pageRequest);
    return ResponseEntity.ok(ApiResponse.success(PageResponse.from(appointments)));
  }

  @PostMapping("/create/{doctorAssignmentId}")
  ResponseEntity<ApiResponse<Void>> createAppointment(
      @PathVariable("doctorAssignmentId") Long doctorAssignmentId,
      @Valid @RequestBody AppointmentDto appointmentCreationDto) {
    appointmentService.createAppointment(doctorAssignmentId, appointmentCreationDto);
    return ResponseEntity.ok(ApiResponse.success(null));
  }

  @PostMapping("/update/{appointmentId}")
  ResponseEntity<ApiResponse<Void>> updateAppointment(
      @PathVariable("appointmentId") Long appointmentId,
      @Valid @RequestBody AppointmentDto appointmentUpdateDto) {
    appointmentService.updateAppointment(appointmentId, appointmentUpdateDto);
    return ResponseEntity.ok(ApiResponse.success(null));
  }

  @PatchMapping("/change-status/{appointmentId}")
  ResponseEntity<ApiResponse<Void>> changeStatusOfAppointment(
      @PathVariable("appointmentId") Long appointmentId,
      @RequestBody Map<String, String> payload) {
    appointmentService.changeStatusOfAppointment(appointmentId,
        AppointmentStatus.valueOf(payload.get("appointmentStatus")));
    return ResponseEntity.ok(ApiResponse.success(null));
  }
}
