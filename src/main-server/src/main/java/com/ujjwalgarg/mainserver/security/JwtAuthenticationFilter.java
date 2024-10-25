package com.ujjwalgarg.mainserver.security;

import com.ujjwalgarg.mainserver.service.JwtService;
import com.ujjwalgarg.mainserver.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * Filter that handles JWT authentication for incoming HTTP requests.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtService jwtService;
  private final UserService userService;

  /**
   * Filters incoming requests to authenticate users based on JWT tokens.
   *
   * @param request     the HTTP request
   * @param response    the HTTP response
   * @param filterChain the filter chain
   * @throws ServletException if an error occurs during filtering
   * @throws IOException      if an I/O error occurs during filtering
   */
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {

    try {
      String jwt = getJwtFromRequest(request);

      if (StringUtils.hasText(jwt) && jwtService.validateToken(jwt)
          && SecurityContextHolder.getContext().getAuthentication() == null) {
        String email = jwtService.getEmailFromToken(jwt);
        UserDetails userDetails = userService.loadUserByUsername(email);

        var authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
            userDetails.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        log.info("User authenticated successfully, email: {}", userDetails.getUsername());
      }
    } catch (Exception ex) {
      log.error("Authentication failed, ex: {}", ex.getClass().getSimpleName());
    }

    filterChain.doFilter(request, response);
  }

  /**
   * Retrieves the JWT token from the request cookies.
   *
   * @param request the HTTP request
   * @return the JWT token if present, otherwise null
   */
  private String getJwtFromRequest(HttpServletRequest request) {
    Cookie[] cookies = request.getCookies();
    if (cookies != null) {
      for (Cookie cookie : cookies) {
        if ("access-token".equals(cookie.getName())) {
          return cookie.getValue();
        }
      }
    }
    return null;
  }
}
