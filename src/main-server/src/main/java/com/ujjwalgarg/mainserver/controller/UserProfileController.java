package com.ujjwalgarg.mainserver.controller;

import com.ujjwalgarg.mainserver.dto.ApiResponse;
import com.ujjwalgarg.mainserver.dto.DoctorProfileDto;
import com.ujjwalgarg.mainserver.dto.PageResponse;
import com.ujjwalgarg.mainserver.dto.PatientProfileDto;
import com.ujjwalgarg.mainserver.entity.user.Role;
import com.ujjwalgarg.mainserver.exception.InvalidRoleException;
import com.ujjwalgarg.mainserver.service.UserProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for handling user profile related requests.
 */
@RestController
@RequestMapping(
    path = "/api/profile",
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class UserProfileController {

  private final UserProfileService userProfileService;

  /**
   * Retrieves the user profile based on the role and user ID.
   *
   * @param role the role of the user (PATIENT or DOCTOR)
   * @param userId the ID of the user
   * @return the user profile wrapped in an ApiResponse
   */
  @GetMapping(path = "/{role}/{id}", consumes = MediaType.ALL_VALUE)
  public ResponseEntity<ApiResponse<?>> getUserProfile(
      @PathVariable("role") Role role, @PathVariable("id") Long userId) {
    ApiResponse<?> response;
    switch (role) {
      case PATIENT -> {
        PatientProfileDto responseDto = userProfileService.getPatientProfile(userId);
        response = ApiResponse.success(responseDto);
      }
      case DOCTOR -> {
        DoctorProfileDto responseDto = userProfileService.getDoctorProfile(userId);
        response = ApiResponse.success(responseDto);
      }
      default -> throw new InvalidRoleException("Invalid role for profile request");
    }

    return ResponseEntity.ok(response);
  }

  /**
   * Updates the patient profile.
   *
   * @param userId the ID of the patient
   * @param profileUpdateRequest the updated patient profile data
   * @return the updated patient profile wrapped in an ApiResponse
   */
  @PatchMapping("/PATIENT/{id}")
  public ResponseEntity<ApiResponse<PatientProfileDto>> updatePatientProfile(
      @PathVariable("id") Long userId, @Valid @RequestBody PatientProfileDto profileUpdateRequest) {
    PatientProfileDto responseDto =
        userProfileService.updatePatientProfile(userId, profileUpdateRequest);
    return ResponseEntity.ok(ApiResponse.success(responseDto));
  }

  /**
   * Updates the doctor profile.
   *
   * @param userId the ID of the doctor
   * @param profileUpdateRequest the updated doctor profile data
   * @return the updated doctor profile wrapped in an ApiResponse
   */
  @PatchMapping("/DOCTOR/{id}")
  public ResponseEntity<ApiResponse<DoctorProfileDto>> updateDoctorProfile(
      @PathVariable("id") Long userId, @Valid @RequestBody DoctorProfileDto profileUpdateRequest) {
    DoctorProfileDto responseDto =
        userProfileService.updateDoctorProfile(userId, profileUpdateRequest);
    return ResponseEntity.ok(ApiResponse.success(responseDto));
  }

  @GetMapping(value = "/DOCTOR", consumes = MediaType.ALL_VALUE)
  ResponseEntity<ApiResponse<PageResponse<DoctorProfileDto>>> getAllDoctors(
      @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
    PageRequest pageRequest = PageRequest.of(page, size);
    Page<DoctorProfileDto> pageResponse = userProfileService.getAllDoctors(pageRequest);
    return ResponseEntity.ok(ApiResponse.success(PageResponse.from(pageResponse)));
  }
}
