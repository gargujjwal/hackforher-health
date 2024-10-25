package com.ujjwalgarg.mainserver.entity.profile;

import com.ujjwalgarg.mainserver.entity.user.Doctor;
import jakarta.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "consultation_timing")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConsultationTiming implements Serializable {

  @Serial
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "doctor_id")
  private Doctor doctor;

  @Column(name = "day", nullable = false)
  private String day;

  @Column(name = "start_time", nullable = false)
  private String startTime;

  @Column(name = "end_time", nullable = false)
  private String endTime;
}
