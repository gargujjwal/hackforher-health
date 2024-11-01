package com.ujjwalgarg.mainserver.entity.profile;

import com.ujjwalgarg.mainserver.entity.user.Doctor;
import jakarta.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "doctor_profile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorProfile implements Serializable {

  @Serial private static final long serialVersionUID = 1L;

  @Id private Long id;

  @OneToOne
  @MapsId
  @JoinColumn(name = "doctor_id")
  private Doctor doctor;

  @Column(name = "medical_certificate_path")
  private String medicalCertificatePath;

  @Column(name = "medical_license_number")
  private String medicalLicenseNumber;

  // Address fields
  @Column(name = "address")
  private String address;

  // Contact fields
  @Column(name = "phone_number")
  private String phoneNumber;

  @Column(name = "secondary_email")
  private String secondaryEmail;

  @Builder.Default
  @ElementCollection(fetch = FetchType.LAZY)
  @CollectionTable(
      name = "doctor_qualifications",
      joinColumns = @JoinColumn(name = "doctor_profile_id"))
  private Set<MedicalQualification> qualifications = new HashSet<>();

  @Builder.Default
  @ElementCollection(fetch = FetchType.LAZY)
  @CollectionTable(
      name = "doctor_publications",
      joinColumns = @JoinColumn(name = "doctor_profile_id"))
  private Set<MedicalPublication> publications = new HashSet<>();
}
