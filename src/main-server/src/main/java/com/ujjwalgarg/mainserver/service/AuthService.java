package com.ujjwalgarg.mainserver.service;

import com.ujjwalgarg.mainserver.dto.LoginRequest;
import com.ujjwalgarg.mainserver.dto.LoginResponse;
import com.ujjwalgarg.mainserver.dto.SignupRequest;
import com.ujjwalgarg.mainserver.entity.user.Role;
import com.ujjwalgarg.mainserver.entity.user.User;

/**
 * Service interface for handling authentication-related operations.
 */
public interface AuthService {

  /**
   * Authenticates a user based on the provided login request.
   *
   * @param loginRequest the login request containing user credentials
   * @return the login response containing authentication details
   */
  LoginResponse loginUser(LoginRequest loginRequest);

  /**
   * Registers a new user with the specified signup request and role.
   *
   * @param signupRequest the signup request containing user details
   * @param role          the role to be assigned to the new user
   */
  void signUpUser(SignupRequest signupRequest, Role role);

  /**
   * Refreshes the user session based on the provided refresh token.
   *
   * @param refreshToken the refresh token used to refresh the session
   * @return the login response containing new authentication details
   */
  LoginResponse refreshSession(String refreshToken);

  /**
   * Retrieves the currently authenticated user.
   *
   * @return the authenticated user
   */
  User getAuthenticatedUser();
}
