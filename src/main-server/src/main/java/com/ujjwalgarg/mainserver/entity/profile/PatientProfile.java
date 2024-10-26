package com.ujjwalgarg.mainserver.entity.profile;

import com.ujjwalgarg.mainserver.entity.user.Patient;
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
import lombok.ToString;

@Entity
@Table(name = "patient_profile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
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
  @CollectionTable(name = "patient_phone_numbers", joinColumns = @JoinColumn(name = "patient_id"))
  @Column(name = "phone_number")
  private Set<String> phoneNumber = new HashSet<>();

  @Column(name = "secondary_email")
  private String secondaryEmail;

  @Column(name = "emergency_contact_name")
  private String emergencyContactName;

  @Column(name = "emergency_contact_number")
  private String emergencyContactNumber;

  @Column(name = "emergency_contact_email")
  private String emergencyContactEmail;

  @ElementCollection
  @CollectionTable(name = "patient_insurance_details", joinColumns = @JoinColumn(name = "patient_id"))
  private Set<Insurance> insuranceDetails = new HashSet<>();

  @ElementCollection
  @CollectionTable(name = "patient_current_medications", joinColumns = @JoinColumn(name = "patient_id"))
  @Column(name = "medication")
  private Set<String> currentMedications = new HashSet<>();

  @ElementCollection
  @CollectionTable(name = "patient_allergies", joinColumns = @JoinColumn(name = "patient_id"))
  @Column(name = "allergy")
  private Set<String> allergies = new HashSet<>();
}
