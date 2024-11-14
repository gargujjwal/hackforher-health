package com.ujjwalgarg.mainserver.repository;

import com.ujjwalgarg.mainserver.entity.profile.PatientProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientProfileRepository extends JpaRepository<PatientProfile, Long> {

}
