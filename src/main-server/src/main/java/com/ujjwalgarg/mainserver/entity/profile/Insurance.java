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

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Embeddable
public class Insurance implements Serializable {

  @Serial
  private static final long serialVersionUID = 1L;

  @NotBlank
  @Column(name = "policy_number", nullable = false, unique = true)
  private String policyNumber;

  @NotBlank
  @Column(name = "insurance_provider", nullable = false)
  private String insuranceProvider;

  @NotBlank
  @Column(name = "coverage_detail")
  private String coverageDetail;
}
