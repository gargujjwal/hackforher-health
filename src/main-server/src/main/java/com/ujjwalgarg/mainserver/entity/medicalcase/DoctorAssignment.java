package com.ujjwalgarg.mainserver.entity.medicalcase;

import com.ujjwalgarg.mainserver.entity.medicalcase.appointment.Appointment;
import com.ujjwalgarg.mainserver.entity.user.Doctor;
import jakarta.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

@Getter
@Setter
@Entity
@Table(name = "doctor_assignment")
public class DoctorAssignment implements Serializable {

  @Serial
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @CreationTimestamp
  @Column(name = "assigned_at", nullable = false, updatable = false)
  private LocalDateTime assignedAt;

  @Column(name = "unassigned_at", nullable = false)
  private LocalDateTime unassignedAt;

  @ManyToOne
  @JoinColumn(name = "doctor_id")
  private Doctor doctor;

  @ManyToOne
  @JoinColumn(name = "medical_case_id")
  private MedicalCase medicalCase;

  @OneToMany(mappedBy = "doctorAssignment", cascade = CascadeType.ALL)
  private List<Appointment> appointments = new ArrayList<>();

  @OneToMany(mappedBy = "doctorAssignment", cascade = CascadeType.ALL)
  private List<ChatMessage> chatMessages = new ArrayList<>();
}
