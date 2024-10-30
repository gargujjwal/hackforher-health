package com.ujjwalgarg.mainserver.controller;

import com.ujjwalgarg.mainserver.dto.ApiResponse;
import com.ujjwalgarg.mainserver.dto.LoginRequest;
import com.ujjwalgarg.mainserver.dto.LoginResponse;
import com.ujjwalgarg.mainserver.dto.SignupRequest;
import com.ujjwalgarg.mainserver.entity.user.Role;
import com.ujjwalgarg.mainserver.entity.user.User;
import com.ujjwalgarg.mainserver.exception.InvalidRoleException;
import com.ujjwalgarg.mainserver.exception.TokenValidationException;
import com.ujjwalgarg.mainserver.mapper.UserMapper;
import com.ujjwalgarg.mainserver.service.AuthService;
import com.ujjwalgarg.mainserver.service.JwtService;
import com.ujjwalgarg.mainserver.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(
    path = "/auth",
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;
  private final UserService userService;
  private final UserMapper userMapper;

  @PostMapping("/login")
  public ResponseEntity<ApiResponse<LoginResponse>> login(
      @Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {
    LoginResponse loginResponse = authService.loginUser(loginRequest);
    // put both tokens generated in cookies
    addTokenCookie(response, loginResponse.getRefreshToken(), true);
    // remove the tokens from the response body
    loginResponse.setRefreshToken(null);

    return ResponseEntity.ok(ApiResponse.success(loginResponse));
  }

  @PostMapping("/logout")
  public ResponseEntity<ApiResponse<Void>> logout(HttpServletResponse response) {
    addTokenCookie(response, "", false);
    authService.logoutUser();
    return ResponseEntity.ok(ApiResponse.success(null));
  }

  @PostMapping("/signup/{role}")
  public ResponseEntity<ApiResponse<Void>> signup(
      @PathVariable("role") Role role, @Valid @RequestBody SignupRequest signupRequest) {
    authService.signUpUser(signupRequest, role);
    return ResponseEntity.status(201).body(ApiResponse.success(null));
  }

  @GetMapping(value = "/refresh", consumes = MediaType.ALL_VALUE)
  public ResponseEntity<ApiResponse<Map<String, String>>> refreshToken(
      @CookieValue(value = "refresh-token", defaultValue = "invalid") String refreshToken,
      HttpServletResponse response) {
    if (refreshToken.equals("invalid")) {
      throw new TokenValidationException("Expired or absent refresh token");
    }
    LoginResponse loginResponse = authService.refreshSession(refreshToken);
    // put both tokens generated in cookies
    addTokenCookie(response, loginResponse.getRefreshToken(), true);
    return ResponseEntity.ok(
        ApiResponse.success(Map.of("accessToken", loginResponse.getAccessToken())));
  }

  @GetMapping(path = "/me", consumes = MediaType.ALL_VALUE)
  public ResponseEntity<ApiResponse<?>> getAuthenticatedUser() {
    User user = authService.getAuthenticatedUser();
    return switch (user.getRole()) {
      case PATIENT -> ResponseEntity.ok(
          ApiResponse.success(userMapper.toDto(userService.findPatientById(user.getId()))));
      case DOCTOR -> ResponseEntity.ok(
          ApiResponse.success(userMapper.toDto(userService.findDoctorById(user.getId()))));
      default -> throw new InvalidRoleException("Invalid role: " + user.getRole());
    };
  }

  /**
   * Sets/Unsets the access and refresh token cookies in the HTTP response.
   *
   * @param response the HTTP response to which the cookies will be added
   */
  private void addTokenCookie(HttpServletResponse response, String refreshToken, boolean willSet) {
    Cookie refreshTokenCookie = new Cookie("refresh-token", refreshToken);
    refreshTokenCookie.setMaxAge(willSet ? JwtService.REFRESH_TOKEN_VALIDITY_IN_SECS : 0);
    refreshTokenCookie.setPath("/");
    refreshTokenCookie.setHttpOnly(true);
    refreshTokenCookie.setSecure(false);

    response.addCookie(refreshTokenCookie);
  }
}
