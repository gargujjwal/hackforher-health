package com.ujjwalgarg.mainserver.entity.profile;

import com.ujjwalgarg.mainserver.entity.user.Doctor;
import com.ujjwalgarg.mainserver.entity.user.Patient;
import jakarta.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "doctor_review")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorReview implements Serializable {

  @Serial
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "doctor_id")
  private Doctor doctor;

  @ManyToOne
  @JoinColumn(name = "patient_id")
  private Patient patient;

  @Column(name = "rating", nullable = false)
  private Short rating;

  @Column(name = "comment")
  private String comment;

}
