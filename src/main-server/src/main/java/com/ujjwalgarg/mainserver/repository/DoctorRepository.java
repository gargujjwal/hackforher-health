package com.ujjwalgarg.mainserver.repository;

import com.ujjwalgarg.mainserver.entity.user.Doctor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

  Page<Doctor> findAllByOrderByAvgRatingDesc(Pageable pageable);
}
