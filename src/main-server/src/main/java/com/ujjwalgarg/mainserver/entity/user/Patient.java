package com.ujjwalgarg.mainserver.entity.user;

import com.ujjwalgarg.mainserver.entity.medicalcase.MedicalCase;
import com.ujjwalgarg.mainserver.entity.profile.DoctorReview;
import com.ujjwalgarg.mainserver.entity.profile.PatientProfile;
import jakarta.persistence.*;
import java.io.Serial;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "patient")
@PrimaryKeyJoinColumn(name = "user_id")
public class Patient extends User {

  @Serial private static final long serialVersionUID = 1L;

  @OneToOne(mappedBy = "patient", cascade = CascadeType.ALL, optional = false)
  private PatientProfile profile;

  @Builder.Default
  @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
  private List<MedicalCase> medicalCases = new ArrayList<>();

  @Builder.Default
  @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
  private List<DoctorReview> doctorReviews = new ArrayList<>();
}
