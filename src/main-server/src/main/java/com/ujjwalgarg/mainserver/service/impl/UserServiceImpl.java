package com.ujjwalgarg.mainserver.service.impl;

import com.ujjwalgarg.mainserver.entity.profile.DoctorProfile;
import com.ujjwalgarg.mainserver.entity.profile.PatientProfile;
import com.ujjwalgarg.mainserver.entity.user.Admin;
import com.ujjwalgarg.mainserver.entity.user.Doctor;
import com.ujjwalgarg.mainserver.entity.user.Patient;
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

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final PatientRepository patientRepository;
  private final DoctorRepository doctorRepository;
  private final AdminRepository adminRepository;

  @Override
  public boolean existsByEmail(String email) {
    return userRepository.existsByEmail(email);
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return userRepository.findByEmail(username)
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
  }

  @Override
  public void savePatient(Patient patient) {
    PatientProfile profile = new PatientProfile();
    profile.setPatient(patient);
    patient.setProfile(profile);
    patientRepository.save(patient);
  }

  @Override
  public void saveDoctor(Doctor doctor) {
    DoctorProfile profile = new DoctorProfile();
    profile.setDoctor(doctor);
    doctor.setProfile(profile);
    doctorRepository.save(doctor);
  }

  @Override
  public void saveAdmin(Admin admin) {
    adminRepository.save(admin);
  }
}
