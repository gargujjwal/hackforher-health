package com.ujjwalgarg.mainserver.repository;

import com.ujjwalgarg.mainserver.entity.user.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {

}
