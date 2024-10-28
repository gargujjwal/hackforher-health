package com.ujjwalgarg.mainserver.service;

import com.ujjwalgarg.mainserver.dto.MedicalCaseCreationDto;
import com.ujjwalgarg.mainserver.dto.MedicalCaseResponseDto;
import com.ujjwalgarg.mainserver.dto.QuestionnaireSubmissionResponseDto;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

/**
 * Service interface for managing medical cases.
 */
public interface MedicalCaseService {

  /**
   * Creates a new medical case.
   *
   * @param medicalCaseCreationDto the DTO containing the details of the medical case to be created
   */
  void createNewMedicalCase(MedicalCaseCreationDto medicalCaseCreationDto);

  /**
   * Retrieves the current unresolved medical case for a specific patient.
   *
   * @param patientId the ID of the patient
   * @return the DTO containing the details of the unresolved medical case
   */
  MedicalCaseResponseDto getCurrentUnresolvedMedicalCaseByPatientId(Long patientId);

  /**
   * Retrieves a medical case by its ID.
   *
   * @param medicalCaseId the ID of the medical case
   * @return the DTO containing the details of the medical case
   */
  MedicalCaseResponseDto getMedicalCaseById(Long medicalCaseId);

  /**
   * Retrieves all medical cases for a specific patient with pagination.
   *
   * @param patientId   the ID of the patient
   * @param pageRequest the pagination information
   * @return a paginated list of medical case response DTOs
   */
  Page<MedicalCaseResponseDto> getAllMedicalCasesForPatient(Long patientId,
      PageRequest pageRequest);

  /**
   * Retrieves all medical cases for a specific doctor with pagination.
   *
   * @param doctorId    the ID of the doctor
   * @param pageRequest the pagination information
   * @return a paginated list of medical case response DTOs
   */
  Page<MedicalCaseResponseDto> getAllMedicalCasesForDoctor(Long doctorId, PageRequest pageRequest);

  /**
   * Marks a medical case as resolved.
   *
   * @param medicalCaseId the ID of the medical case to be marked as resolved
   */
  void markMedicalCaseAsResolved(Long medicalCaseId);

  /**
   * Assigns a new doctor to a medical case.
   *
   * @param medicalCaseId the ID of the medical case
   * @param doctorId      the ID of the new doctor to be assigned
   */
  void assignNewDoctorToMedicalCase(Long medicalCaseId, Long doctorId);

  /**
   * Retrieves all questionnaire submissions of a medical case under a specific doctor.
   *
   * @param medicalCaseId the ID of the medical case
   * @param doctorId      the ID of the doctor
   * @return a list of QuestionnaireSubmissionResponseDto representing the questionnaire submissions
   */
  List<QuestionnaireSubmissionResponseDto> getAllQuestionnaireSubmissionOfMedicalCaseUnderDoctor(
      Long medicalCaseId, Long doctorId);

}
