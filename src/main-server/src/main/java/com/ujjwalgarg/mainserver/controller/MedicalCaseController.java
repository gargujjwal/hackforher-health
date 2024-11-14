package com.ujjwalgarg.mainserver.controller;

import com.ujjwalgarg.mainserver.dto.ApiResponse;
import com.ujjwalgarg.mainserver.dto.DoctorAssignmentCreationDto;
import com.ujjwalgarg.mainserver.dto.MedicalCaseCreationDto;
import com.ujjwalgarg.mainserver.dto.MedicalCaseResponseDto;
import com.ujjwalgarg.mainserver.dto.PageResponse;
import com.ujjwalgarg.mainserver.dto.QuestionnaireSubmissionResponseDto;
import com.ujjwalgarg.mainserver.service.MedicalCaseService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
@RequestMapping(path = "/medical-case", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class MedicalCaseController {

  private final MedicalCaseService medicalCaseService;

  @PostMapping
  ResponseEntity<ApiResponse<Void>> createNewMedicalCase(
      @Valid @RequestBody MedicalCaseCreationDto medicalCaseCreationDto) {
    medicalCaseService.createNewMedicalCase(medicalCaseCreationDto);
    return ResponseEntity.ok(ApiResponse.success(null));
  }

  @GetMapping(value = "/unresolved/{patientId}", consumes = MediaType.ALL_VALUE)
  ResponseEntity<ApiResponse<MedicalCaseResponseDto>> getCurrentUnresolvedMedicalCaseByPatientId(
      @PathVariable("patientId") Long patientId) {
    MedicalCaseResponseDto medicalCaseResponseDto = medicalCaseService
        .getCurrentUnresolvedMedicalCaseByPatientId(patientId);
    return ResponseEntity.ok(ApiResponse.success(medicalCaseResponseDto));
  }

  @GetMapping(value = "/{medicalCaseId}", consumes = MediaType.ALL_VALUE)
  ResponseEntity<ApiResponse<MedicalCaseResponseDto>> getMedicalCaseById(
      @PathVariable("medicalCaseId") Long medicalCaseId) {
    MedicalCaseResponseDto medicalCaseResponseDto = medicalCaseService.getMedicalCaseById(
        medicalCaseId);
    return ResponseEntity.ok(ApiResponse.success(medicalCaseResponseDto));
  }

  @GetMapping(value = "/patient/{patientId}", consumes = MediaType.ALL_VALUE)
  ResponseEntity<ApiResponse<PageResponse<MedicalCaseResponseDto>>> getAllMedicalCasesByPatientId(
      @PathVariable("patientId") Long patientId,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      @RequestParam(defaultValue = "createdAt") String sortBy,
      @RequestParam(defaultValue = "desc") String direction) {
    PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.fromString(direction),
        sortBy);
    Page<MedicalCaseResponseDto> pageResponse = medicalCaseService
        .getAllMedicalCasesForPatient(patientId, pageRequest);

    return ResponseEntity.ok(ApiResponse.success(PageResponse.from(pageResponse)));
  }

  @GetMapping(value = "/doctor/{doctorId}", consumes = MediaType.ALL_VALUE)
  ResponseEntity<ApiResponse<PageResponse<MedicalCaseResponseDto>>> getAllMedicalCasesByDoctorId(
      @PathVariable("doctorId") Long doctorId,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      @RequestParam(defaultValue = "createdAt") String sortBy,
      @RequestParam(defaultValue = "desc") String direction) {
    PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.fromString(direction),
        sortBy);
    Page<MedicalCaseResponseDto> pageResponse = medicalCaseService
        .getAllMedicalCasesForDoctor(doctorId, pageRequest);

    return ResponseEntity.ok(ApiResponse.success(PageResponse.from(pageResponse)));
  }

  @PatchMapping("/{medicalCaseId}/resolve")
  ResponseEntity<ApiResponse<Void>> markMedicalCaseAsResolved(
      @PathVariable("medicalCaseId") Long medicalCaseId) {
    medicalCaseService.markMedicalCaseAsResolved(medicalCaseId);
    return ResponseEntity.ok(ApiResponse.success(null));
  }

  @PostMapping("/{medicalCaseId}/assign-doctor")
  ResponseEntity<ApiResponse<Void>> assignDoctorToMedicalCase(
      @PathVariable("medicalCaseId") Long medicalCaseId,
      @RequestBody @Valid DoctorAssignmentCreationDto creationDto) {
    medicalCaseService.assignNewDoctorToMedicalCase(medicalCaseId, creationDto.doctorId());
    return ResponseEntity.ok(ApiResponse.success(null));
  }

  @GetMapping(path = "/{medicalCaseId}/questionnaire-submission/doctor/{doctorId}", consumes = MediaType.ALL_VALUE)
  ResponseEntity<ApiResponse<List<QuestionnaireSubmissionResponseDto>>> getAllQuestionnaireSubmissionsOfMedicalCaseUnderDoctor(
      @PathVariable("medicalCaseId") Long medicalCaseId, @PathVariable("doctorId") Long doctorId) {
    List<QuestionnaireSubmissionResponseDto> questionnaireSubmissionResponses = medicalCaseService.getAllQuestionnaireSubmissionOfMedicalCaseUnderDoctor(
        medicalCaseId, doctorId);
    return ResponseEntity.ok(ApiResponse.success(questionnaireSubmissionResponses));
  }
}
