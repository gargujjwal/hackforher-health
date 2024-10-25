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
@Table(name = "emergency_contact")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmergencyContact implements Serializable {

  @Serial
  private static final long serialVersionUID = 1L;

  @Id
  private Long id;

  @OneToOne
  @MapsId
  @JoinColumn(name = "patient_profile_id")
  private PatientProfile patientProfile;

  @Column(name = "email", nullable = false)
  private String email;

  @Column(name = "phone_number", nullable = false)
  private String phoneNumber;
}
