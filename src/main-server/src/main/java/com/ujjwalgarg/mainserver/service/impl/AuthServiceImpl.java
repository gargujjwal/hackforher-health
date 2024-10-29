package com.ujjwalgarg.mainserver.service.impl;

import com.ujjwalgarg.mainserver.dto.LoginRequest;
import com.ujjwalgarg.mainserver.dto.LoginResponse;
import com.ujjwalgarg.mainserver.dto.SignupRequest;
import com.ujjwalgarg.mainserver.entity.profile.ConsultationTiming;
import com.ujjwalgarg.mainserver.entity.user.Admin;
import com.ujjwalgarg.mainserver.entity.user.Doctor;
import com.ujjwalgarg.mainserver.entity.user.Patient;
import com.ujjwalgarg.mainserver.entity.user.Role;
import com.ujjwalgarg.mainserver.entity.user.User;
import com.ujjwalgarg.mainserver.exception.ResourceConflictException;
import com.ujjwalgarg.mainserver.mapper.UserMapper;
import com.ujjwalgarg.mainserver.service.AuthService;
import com.ujjwalgarg.mainserver.service.JwtService;
import com.ujjwalgarg.mainserver.service.UserService;
import jakarta.validation.Valid;
import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j(topic = "AUTH_SERVICE")
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;
  private final UserMapper userMapper;
  private final UserService userService;
  private final PasswordEncoder passwordEncoder;

  @Override
  public LoginResponse loginUser(@Valid LoginRequest loginRequest) {
    log.info("Attempting to authenticate user with email: {}", loginRequest.email());
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            loginRequest.email(),
            loginRequest.password()
        )
    );
    User authenticatedUser = (User) authentication.getPrincipal();

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String accessToken = jwtService.generateAccessToken(authenticatedUser);
    String refreshToken = jwtService.generateRefreshToken(authenticatedUser);

    log.info("User authenticated successfully: {}", loginRequest.email());
    return userMapper.toDto(authenticatedUser, accessToken, refreshToken);
  }

  @Override
  public void signUpUser(@Valid SignupRequest signupRequest, Role role) {
    log.info("Attempting to sign up user with email: {}", signupRequest.email());
    if (userService.existsByEmail(signupRequest.email())) {
      log.error("User with email {} already exists", signupRequest.email());
      throw new ResourceConflictException(
          "User with email " + signupRequest.email() + " already exists");
    }
    switch (role) {
      case PATIENT -> {
        Patient patient = new Patient();
        updateUserFromSignupRequest(patient, signupRequest);
        patient.setRole(Role.PATIENT);
        userService.savePatient(patient);
        log.info("Patient signed up successfully: {}", signupRequest.email());
      }
      case DOCTOR -> {
        Doctor doctor = new Doctor();
        updateUserFromSignupRequest(doctor, signupRequest);
        doctor.setRole(Role.DOCTOR);
        doctor.setConsultationTimings(getDefaultConsultationTimings());
        userService.saveDoctor(doctor);
        log.info("Doctor signed up successfully: {}", signupRequest.email());
      }
      case ADMIN -> {
        Admin admin = new Admin();
        updateUserFromSignupRequest(admin, signupRequest);
        admin.setRole(Role.ADMIN);
        userService.saveAdmin(admin);
        log.info("Admin signed up successfully: {}", signupRequest.email());
      }
    }
  }

  @Override
  public LoginResponse refreshSession(String refreshToken) {
    log.info("Attempting to refresh session with refresh token");
    String email = jwtService.getEmailFromToken(refreshToken);
    User user = (User) userService.loadUserByUsername(email);
    String accessToken = jwtService.generateAccessToken(user);
    String newRefreshToken = jwtService.generateRefreshToken(user);

    log.info("Session refreshed successfully for user: {}", email);
    LoginResponse loginResponse = new LoginResponse();
    loginResponse.setRefreshToken(newRefreshToken);
    loginResponse.setAccessToken(accessToken);
    return loginResponse;
  }

  @Override
  public User getAuthenticatedUser() {
    User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    log.info("Retrieved authenticated user: {}", user.getEmail());
    return user;
  }

  private void updateUserFromSignupRequest(User user, SignupRequest signupRequest) {
    user.setEmail(signupRequest.email());
    user.setFirstName(signupRequest.firstName());
    user.setLastName(signupRequest.lastName());
    user.setDob(signupRequest.dob());
    user.setPasswordHash(passwordEncoder.encode(signupRequest.password()));
  }

  private Set<ConsultationTiming> getDefaultConsultationTimings() {
    Set<ConsultationTiming> consultationTimings = new HashSet<>();

    for (DayOfWeek day : DayOfWeek.values()) {
      if (day == DayOfWeek.SATURDAY || day == DayOfWeek.SUNDAY) {
        continue;  // Skip weekends
      }

      // Morning session: 9:00 AM to 1:00 PM
      consultationTimings.add(
          ConsultationTiming.builder()
              .day(day)
              .startTime(LocalTime.of(9, 0))
              .endTime(LocalTime.of(13, 0))
              .build()
      );

      // Afternoon session: 2:30 PM to 6:00 PM
      consultationTimings.add(
          ConsultationTiming.builder()
              .day(day)
              .startTime(LocalTime.of(14, 30))
              .endTime(LocalTime.of(18, 0))
              .build()
      );

      // Evening session: 6:30 PM to 8:00 PM
      consultationTimings.add(
          ConsultationTiming.builder()
              .day(day)
              .startTime(LocalTime.of(18, 30))
              .endTime(LocalTime.of(20, 0))
              .build()
      );
    }

    return consultationTimings;
  }
}
