package com.ujjwalgarg.mainserver.entity.profile;

import com.ujjwalgarg.mainserver.entity.user.Patient;
import jakarta.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "patient_profile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientProfile implements Serializable {

  @Serial
  private static final long serialVersionUID = 1L;

  @Id
  private Long id;

  @OneToOne
  @MapsId
  @JoinColumn(name = "patient_id")
  private Patient patient;

  @Column(name = "gender")
  private String gender;

  @Column(name = "is_smoker")
  private Boolean isSmoker;

  @Column(name = "drinks_alcohol")
  private Boolean drinksAlcohol;

  @Column(name = "blood_type")
  private String bloodType;

  @Column(name = "medical_history")
  private String medicalHistory;

  @Column(name = "food_preference")
  private String foodPreference;

  @Column(name = "family_medical_history")
  private String familyMedicalHistory;

  @Column(name = "address")
  private String address;

  @ElementCollection
  @Column(name = "phone_numbers")
  private Set<String> phoneNumber = new HashSet<>();

  @Column(name = "secondary_email")
  private String secondaryEmail;

  @OneToMany(mappedBy = "patientProfile", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Insurance> insuranceDetails = new ArrayList<>();

  @OneToMany(mappedBy = "patientProfile", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<CurrentMedication> currentMedications = new ArrayList<>();

  @OneToMany(mappedBy = "patientProfile", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Allergy> allergies = new ArrayList<>();

  @OneToOne(mappedBy = "patientProfile", cascade = CascadeType.ALL, orphanRemoval = true)
  private EmergencyContact emergencyContact;
}
