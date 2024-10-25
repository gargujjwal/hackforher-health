package com.ujjwalgarg.mainserver.controller;

import com.ujjwalgarg.mainserver.dto.LoginRequest;
import com.ujjwalgarg.mainserver.dto.LoginResponse;
import com.ujjwalgarg.mainserver.dto.SignupRequest;
import com.ujjwalgarg.mainserver.entity.user.Role;
import com.ujjwalgarg.mainserver.exception.TokenValidationException;
import com.ujjwalgarg.mainserver.service.AuthService;
import com.ujjwalgarg.mainserver.service.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import java.net.URI;
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
@RequestMapping(path = "/api/auth", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest,
      HttpServletResponse response) {
    LoginResponse loginResponse = authService.loginUser(loginRequest);
    // put both tokens generated in cookies
    setTokenCookies(response, loginResponse);
    // remove the tokens from the response body
    loginResponse.setAccessToken(null);
    loginResponse.setRefreshToken(null);

    return ResponseEntity.ok(loginResponse);
  }

  @PostMapping("/signup/{role}")
  public ResponseEntity<Void> signup(@PathVariable("role") Role role,
      @Valid @RequestBody SignupRequest signupRequest) {
    authService.signUpUser(signupRequest, role);
    return ResponseEntity.created(URI.create("/")).build();
  }

  @GetMapping(value = "/refresh", consumes = MediaType.ALL_VALUE)
  public ResponseEntity<Void> refreshToken(
      @CookieValue(value = "refresh-token", defaultValue = "invalid") String refreshToken,
      HttpServletResponse response) {
    if (refreshToken.equals("invalid")) {
      throw new TokenValidationException("Expired or absent refresh token");
    }
    LoginResponse loginResponse = authService.refreshSession(refreshToken);
    // put both tokens generated in cookies
    setTokenCookies(response, loginResponse);
    return ResponseEntity.ok().build();
  }

  /**
   * Sets the access and refresh token cookies in the HTTP response.
   *
   * @param response      the HTTP response to which the cookies will be added
   * @param loginResponse the login response containing the tokens
   */
  private void setTokenCookies(HttpServletResponse response, LoginResponse loginResponse) {
    Cookie accessTokenCookie = new Cookie("access-token", loginResponse.getAccessToken());
    accessTokenCookie.setMaxAge(JwtService.ACCESS_TOKEN_VALIDITY_IN_SECS);
    accessTokenCookie.setPath("/");
    accessTokenCookie.setHttpOnly(true);
    accessTokenCookie.setSecure(false);
    Cookie refreshTokenCookie = new Cookie("refresh-token", loginResponse.getRefreshToken());
    refreshTokenCookie.setMaxAge(JwtService.REFRESH_TOKEN_VALIDITY_IN_SECS);
    refreshTokenCookie.setPath("/");
    refreshTokenCookie.setHttpOnly(true);
    refreshTokenCookie.setSecure(false);

    response.addCookie(accessTokenCookie);
    response.addCookie(refreshTokenCookie);
  }
}
