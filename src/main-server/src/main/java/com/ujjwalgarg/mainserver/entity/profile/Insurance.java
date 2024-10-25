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
@Table(name = "insurance_detail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Insurance implements Serializable {

  @Serial
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "patient_profile_id")
  private PatientProfile patientProfile;

  @Column(name = "policy_number", nullable = false, unique = true)
  private String policyNumber;

  @Column(name = "insurance_provider", nullable = false)
  private String insuranceProvider;

  @Column(name = "coverage_detail")
  private String coverageDetail;
}
