package com.ujjwalgarg.mainserver.service;

import com.ujjwalgarg.mainserver.entity.user.Admin;
import com.ujjwalgarg.mainserver.entity.user.Doctor;
import com.ujjwalgarg.mainserver.entity.user.Patient;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * Service interface for handling user-related operations.
 */
public interface UserService extends UserDetailsService {

  /**
   * Checks if a user exists by their email.
   *
   * @param email the email to check
   * @return true if a user with the given email exists, false otherwise
   */
  boolean existsByEmail(String email);

  /**
   * Saves a patient entity.
   *
   * @param patient the patient entity to save
   */
  void savePatient(Patient patient);

  /**
   * Saves a doctor entity.
   *
   * @param doctor the doctor entity to save
   */
  void saveDoctor(Doctor doctor);

  /**
   * Saves an admin entity.
   *
   * @param admin the admin entity to save
   */
  void saveAdmin(Admin admin);
}
