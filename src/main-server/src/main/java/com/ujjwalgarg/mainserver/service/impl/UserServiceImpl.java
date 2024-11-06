package com.ujjwalgarg.mainserver.service.impl;

import com.ujjwalgarg.mainserver.entity.profile.DoctorProfile;
import com.ujjwalgarg.mainserver.entity.profile.PatientProfile;
import com.ujjwalgarg.mainserver.entity.user.Admin;
import com.ujjwalgarg.mainserver.entity.user.Doctor;
import com.ujjwalgarg.mainserver.entity.user.Patient;
import com.ujjwalgarg.mainserver.exception.ResourceNotFoundException;
import com.ujjwalgarg.mainserver.repository.AdminRepository;
import com.ujjwalgarg.mainserver.repository.DoctorRepository;
import com.ujjwalgarg.mainserver.repository.PatientRepository;
import com.ujjwalgarg.mainserver.repository.UserRepository;
import com.ujjwalgarg.mainserver.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j(topic = "USER_SERVICE")
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final PatientRepository patientRepository;
  private final DoctorRepository doctorRepository;
  private final AdminRepository adminRepository;

  @Override
  public boolean existsByEmail(String email) {
    log.info("Checking if user exists with email: {}", email);
    boolean exists = userRepository.existsByEmail(email);
    log.info("User exists with email {}: {}", email, exists);
    return exists;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    log.info("Loading user by username: {}", username);
    return userRepository
        .findByEmail(username)
        .orElseThrow(
            () -> {
              log.error("User not found with username: {}", username);
              return new UsernameNotFoundException("User not found");
            });
  }

  @Override
  public void savePatient(Patient patient) {
    log.info("Saving new patient with email: {}", patient.getEmail());
    PatientProfile profile = new PatientProfile();
    profile.setPatient(patient);
    patient.setProfile(profile);
    patientRepository.save(patient);
    log.info("Patient saved with ID: {}", patient.getId());
  }

  @Override
  public void saveDoctor(Doctor doctor) {
    log.info("Saving new doctor with email: {}", doctor.getEmail());
    DoctorProfile profile = new DoctorProfile();
    profile.setDoctor(doctor);
    doctor.setProfile(profile);
    doctor.setAvgRating(0.0);
    doctorRepository.save(doctor);
    log.info("Doctor saved with ID: {}", doctor.getId());
  }

  @Override
  public void saveAdmin(Admin admin) {
    log.info("Saving new admin with email: {}", admin.getEmail());
    adminRepository.save(admin);
    log.info("Admin saved with ID: {}", admin.getId());
  }

  @Override
  public Doctor findDoctorById(Long doctorId) {
    log.info("Finding doctor by ID: {}", doctorId);
    return doctorRepository
        .findById(doctorId)
        .orElseThrow(
            () -> {
              log.error("Doctor not found with ID: {}", doctorId);
              return new ResourceNotFoundException("Doctor not found");
            });
  }

  @Override
  public Patient findPatientById(Long patientId) {
    log.info("Finding patient by ID: {}", patientId);
    return patientRepository
        .findById(patientId)
        .orElseThrow(
            () -> {
              log.error("Patient not found with ID: {}", patientId);
              return new ResourceNotFoundException("Patient not found");
            });
  }
}
