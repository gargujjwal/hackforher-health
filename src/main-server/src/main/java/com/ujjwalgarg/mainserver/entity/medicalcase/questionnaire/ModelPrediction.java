package com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

@Embeddable
@Getter
@Setter
public class ModelPrediction {

  @Column(name = "has_cervical_cancer", nullable = false)
  private Boolean hasCervicalCancer;

  @Column(name = "accuracy", nullable = false)
  private Double accuracy;

  @CreationTimestamp
  @Column(name = "predicted_at", nullable = false)
  private LocalDateTime predictedAt;
}
