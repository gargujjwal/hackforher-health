package com.ujjwalgarg.mainserver.entity.medicalcase.appointment;

import com.ujjwalgarg.mainserver.entity.medicalcase.DoctorAssignment;
import jakarta.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "appointment")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "appointmentType", discriminatorType = DiscriminatorType.STRING)
@Getter
@Setter
public abstract class Appointment implements Serializable {

  @Serial
  private static final long serialVersionUID = 1L;

  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "start_time")
  private LocalDateTime startTime;

  @Column(name = "end_time")
  private LocalDateTime endTime;

  @ManyToOne
  @JoinColumn(name = "doctor_assignment_id")
  private DoctorAssignment doctorAssignment;
}
