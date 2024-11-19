package com.ujjwalgarg.mainserver.entity.medicalcase.appointment;

import com.ujjwalgarg.mainserver.entity.medicalcase.DoctorAssignment;
import jakarta.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "appointment")
@Getter
@Setter
public class Appointment implements Serializable {

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

  @Enumerated(EnumType.STRING)
  private AppointmentType appointmentType;

  @Enumerated(EnumType.STRING)
  private AppointmentStatus appointmentStatus;

  @Column(name = "meet_link")
  private String meetLink;

  @Column(name = "created_at")
  @CreationTimestamp
  private LocalDateTime createdAt;

  @ManyToOne
  @JoinColumn(name = "doctor_assignment_id")
  private DoctorAssignment doctorAssignment;
}
