package com.ujjwalgarg.mainserver.repository;

import com.ujjwalgarg.mainserver.entity.medicalcase.appointment.Appointment;
import com.ujjwalgarg.mainserver.entity.user.Doctor;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

  Page<Appointment> findAllAppointmentByDoctorAssignment_Id(Long doctorAssignmentId,
      Pageable pageable);

  Page<Appointment> findAllByDoctorAssignment_MedicalCase_PatientId(Long patientId,
      Pageable pageable);

  boolean existsByDoctorAssignment_MedicalCase_Patient_Id(Long id);

  boolean existsByDoctorAssignment_Doctor_Id(Long id);

  Page<Appointment> findByDoctorAssignment_Doctor_IdOrderByStartTimeDesc(Long id,
      Pageable pageable);

  @Query("SELECT a FROM Appointment a WHERE a.doctorAssignment.doctor = :doctor " +
      "AND a.startTime < :endTime AND a.endTime > :startTime")
  List<Appointment> findByDoctorAndTimeRange(
      @Param("doctor") Doctor doctor,
      @Param("startTime") LocalDateTime startTime,
      @Param("endTime") LocalDateTime endTime);

  boolean existsByIdAndDoctorAssignment_MedicalCase_Patient_Id(Long id, Long id1);
}
