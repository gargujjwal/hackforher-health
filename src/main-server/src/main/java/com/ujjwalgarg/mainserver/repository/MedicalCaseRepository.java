package com.ujjwalgarg.mainserver.repository;

import com.ujjwalgarg.mainserver.entity.medicalcase.MedicalCase;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalCaseRepository extends JpaRepository<MedicalCase, Long> {

  Optional<MedicalCase> findByIsResolvedIsFalse();

  Page<MedicalCase> findAllByPatient_IdOrderByCreatedAtDesc(Long id, Pageable pageable);

  Page<MedicalCase> findAllByDoctorAssignments_Doctor_IdOrderByCreatedAtDesc(Long doctorId,
      Pageable pageable);

  Optional<MedicalCase> findByPatient_IdAndIsResolvedFalse(Long id);
}
