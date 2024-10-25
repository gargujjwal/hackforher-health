package com.ujjwalgarg.mainserver.entity.profile;

import jakarta.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "medical_qualification")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalQualification implements Serializable {

  @Serial
  private static final long serialVersionUID = 1L;

  @Column(name = "qualification_name", nullable = false)
  private String qualificationName;

  @Column(name = "institution_name", nullable = false)
  private String institutionName;

  @Column(name = "year", nullable = false)
  private Integer year;

  @Column(name = "certificate_url", nullable = false)
  private String certificateUrl;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "doctor_profile_id")
  private DoctorProfile doctorProfile;
}
