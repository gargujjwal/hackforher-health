package com.ujjwalgarg.mainserver.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
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
public class WebSecurityConfiguration {

  private static final String[] fullyWhiteListUrls = {
      "/api/auth/**"
  };
  private final JwtAuthenticationFilter jwtAuthenticationFilter;

  /**
   * Configures the security filter chain.
   *
   * @param httpSecurity the HttpSecurity to modify
   * @return the configured SecurityFilterChain
   * @throws Exception if an error occurs during configuration
   */
  @Bean
  public SecurityFilterChain securityFilterChain(
      HttpSecurity httpSecurity) throws Exception {
    // disable csrf attack
    httpSecurity.csrf(AbstractHttpConfigurer::disable);
    // disable sessions
    httpSecurity.sessionManagement(
        config -> config.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
    // allowlist certain urls
    httpSecurity.authorizeHttpRequests(
        config -> config.requestMatchers(fullyWhiteListUrls)
            .permitAll()
            .anyRequest()
            .authenticated());
    // add authentication filter
    httpSecurity.addFilterBefore(jwtAuthenticationFilter,
        UsernamePasswordAuthenticationFilter.class);
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
      AuthenticationConfiguration authenticationConfiguration)
      throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }
}
