package com.ujjwalgarg.mainserver.entity.profile;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;
import org.hibernate.validator.constraints.URL;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Embeddable
public class MedicalQualification implements Serializable {

  @Serial
  private static final long serialVersionUID = 1L;

  @NotBlank
  @Column(name = "qualification_name", nullable = false)
  private String qualificationName;

  @NotBlank
  @Column(name = "institution_name", nullable = false)
  private String institutionName;

  @Range(min = 1947, max = 2100)
  @Column(name = "year", nullable = false)
  private Integer year;

  @URL(protocol = "https")
  @Column(name = "certificate_url", nullable = false)
  private String certificateUrl;
}
