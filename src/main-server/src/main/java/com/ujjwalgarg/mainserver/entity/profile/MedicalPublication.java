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
@Table(name = "medical_publication")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalPublication implements Serializable {

  @Serial
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "doctor_profile_id")
  private DoctorProfile doctorProfile;

  @Column(name = "publication_name")
  private String publicationName;

  @Column(name = "publication_year")
  private Integer publicationYear;

  @Column(name = "publication_url")
  private String publicationUrl;
}
