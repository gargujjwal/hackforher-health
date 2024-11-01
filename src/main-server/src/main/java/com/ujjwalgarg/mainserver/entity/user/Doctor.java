package com.ujjwalgarg.mainserver.entity.user;

import com.ujjwalgarg.mainserver.entity.medicalcase.DoctorAssignment;
import com.ujjwalgarg.mainserver.entity.profile.ConsultationTiming;
import com.ujjwalgarg.mainserver.entity.profile.DoctorProfile;
import com.ujjwalgarg.mainserver.entity.profile.DoctorReview;
import jakarta.persistence.*;
import java.io.Serial;
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
@Table(name = "doctor")
@PrimaryKeyJoinColumn(name = "user_id")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Doctor extends User {

  @Serial private static final long serialVersionUID = 1L;

  @Column(name = "avg_rating")
  private Double avgRating;

  @Builder.Default
  @Column(name = "no_appointments_failed")
  private Integer noAppointmentsFailed = 0;

  @OneToOne(mappedBy = "doctor", cascade = CascadeType.ALL, optional = false)
  private DoctorProfile profile;

  @Builder.Default
  @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
  private List<DoctorReview> reviews = new ArrayList<>();

  @Builder.Default
  @ElementCollection
  @CollectionTable(
      name = "doctor_consultation_timings",
      joinColumns = @JoinColumn(name = "doctor_id"))
  private Set<ConsultationTiming> consultationTimings = new HashSet<>();

  @Builder.Default
  @OneToMany(
      mappedBy = "doctor",
      cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
  private List<DoctorAssignment> doctorAssignments = new ArrayList<>();
}
