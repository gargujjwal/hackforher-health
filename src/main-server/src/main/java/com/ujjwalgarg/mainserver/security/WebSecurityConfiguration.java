package com.ujjwalgarg.mainserver.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ujjwalgarg.mainserver.dto.ApiError;
import com.ujjwalgarg.mainserver.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Configuration class for setting up web security.
 */
@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity
public class WebSecurityConfiguration {

  private static final String[] fullyWhiteListUrls = {"/api/auth/**", "/error", "/**"};
  private final JwtAuthenticationFilter jwtAuthenticationFilter;

  /**
   * Configures the security filter chain.
   *
   * @param httpSecurity the HttpSecurity to modify
   * @return the configured SecurityFilterChain
   * @throws Exception if an error occurs during configuration
   */
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
    // disable csrf attack
    httpSecurity.csrf(AbstractHttpConfigurer::disable);
    // disable sessions
    httpSecurity.sessionManagement(
        config -> config.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
    // allowlist certain urls
    httpSecurity.authorizeHttpRequests(
        config ->
            config
                .requestMatchers(fullyWhiteListUrls)
                .permitAll()
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/profile/DOCTOR/**",
                    "/api/profile/DOCTOR",
                    "/api/questionnaire")
                .permitAll()
                .requestMatchers(HttpMethod.POST, "/api/questionnaire/predict")
                .permitAll()
                .requestMatchers("/api/**")
                .authenticated()
                .anyRequest()
                .authenticated());
    httpSecurity.exceptionHandling(
        exception ->
            exception
                // Return 401 Unauthorized for unauthenticated users
                .authenticationEntryPoint(
                    (request, response, authException) -> {
                      ApiError error =
                          new ApiError(
                              "SECURITY_ERROR_008", "Unauthorized Exception", "Please Login first");
                      ApiResponse<Void> res = ApiResponse.error(error);
                      response.setStatus(HttpStatus.UNAUTHORIZED.value());
                      response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                      ObjectMapper mapper = new ObjectMapper();
                      mapper.writeValue(response.getWriter(), res);
                    }));
    httpSecurity.addFilterBefore(
        jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    return httpSecurity.build();
  }

  /**
   * Provides a PasswordEncoder bean.
   *
   * @return a BCryptPasswordEncoder
   */
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  /**
   * Provides an AuthenticationManager bean.
   *
   * @param authenticationConfiguration the AuthenticationConfiguration to use
   * @return the configured AuthenticationManager
   * @throws Exception if an error occurs during configuration
   */
  @Bean
  public AuthenticationManager authenticationManager(
      AuthenticationConfiguration authenticationConfiguration) throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }
}
