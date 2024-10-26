package com.ujjwalgarg.mainserver.repository;

import com.ujjwalgarg.mainserver.entity.profile.DoctorProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorProfileRepository extends JpaRepository<DoctorProfile, Long> {

}
