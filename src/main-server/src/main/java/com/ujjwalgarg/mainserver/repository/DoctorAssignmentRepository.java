package com.ujjwalgarg.mainserver.repository;

import com.ujjwalgarg.mainserver.entity.medicalcase.DoctorAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorAssignmentRepository extends JpaRepository<DoctorAssignment, Long> {

}
