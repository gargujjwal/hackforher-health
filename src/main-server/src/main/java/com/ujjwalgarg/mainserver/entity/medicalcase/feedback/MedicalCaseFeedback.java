package com.ujjwalgarg.mainserver.entity.medicalcase.feedback;

import com.ujjwalgarg.mainserver.entity.medicalcase.MedicalCase;
import jakarta.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "medical_case_feedback")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalCaseFeedback implements Serializable {

  @Serial
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @ManyToOne
  @JoinColumn(name = "medical_case_id")
  private MedicalCase medicalCase;

  @Column(name = "submitted_at")
  private LocalDateTime submittedAt;

  @OneToMany(mappedBy = "feedback", cascade = CascadeType.ALL)
  private List<MedicalCaseFeedbackResponse> responses = new ArrayList<>();
}
