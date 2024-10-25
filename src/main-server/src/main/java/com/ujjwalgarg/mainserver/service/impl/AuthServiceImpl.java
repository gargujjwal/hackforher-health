package com.ujjwalgarg.mainserver.service.impl;

import com.ujjwalgarg.mainserver.dto.LoginRequest;
import com.ujjwalgarg.mainserver.dto.LoginResponse;
import com.ujjwalgarg.mainserver.dto.SignupRequest;
import com.ujjwalgarg.mainserver.entity.user.Admin;
import com.ujjwalgarg.mainserver.entity.user.Doctor;
import com.ujjwalgarg.mainserver.entity.user.Patient;
import com.ujjwalgarg.mainserver.entity.user.Role;
import com.ujjwalgarg.mainserver.entity.user.User;
import com.ujjwalgarg.mainserver.exception.UserAlreadyExistsException;
import com.ujjwalgarg.mainserver.mapper.UserMapper;
import com.ujjwalgarg.mainserver.service.AuthService;
import com.ujjwalgarg.mainserver.service.JwtService;
import com.ujjwalgarg.mainserver.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;
  private final UserMapper userMapper;
  private final UserService userService;
  private final PasswordEncoder passwordEncoder;

  @Override
  public LoginResponse loginUser(@Valid LoginRequest loginRequest) {
    // Authenticate the user
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

    log.info("User logged in successfully: {}", loginRequest.email());
    return userMapper.toDto(authenticatedUser, accessToken, refreshToken);
  }

  @Override
  public void signUpUser(@Valid SignupRequest signupRequest, Role role) {
    // check if user already exists in db
    if (userService.existsByEmail(signupRequest.email())) {
      throw new UserAlreadyExistsException(
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
    String email = jwtService.getEmailFromToken(refreshToken);
    User user = (User) userService.loadUserByUsername(email);
    String accessToken = jwtService.generateAccessToken(user);
    String newRefreshToken = jwtService.generateRefreshToken(user);

    LoginResponse loginResponse = new LoginResponse();
    loginResponse.setRefreshToken(newRefreshToken);
    loginResponse.setAccessToken(accessToken);
    return loginResponse;
  }

  /**
   * Updates the user entity with the details from the signup request.
   *
   * @param user          the user entity to update
   * @param signupRequest the signup request containing user details
   */
  private void updateUserFromSignupRequest(User user, SignupRequest signupRequest) {
    user.setEmail(signupRequest.email());
    user.setFirstName(signupRequest.firstName());
    user.setLastName(signupRequest.lastName());
    user.setDob(signupRequest.dob());
    user.setPasswordHash(passwordEncoder.encode(signupRequest.password()));
  }
}
