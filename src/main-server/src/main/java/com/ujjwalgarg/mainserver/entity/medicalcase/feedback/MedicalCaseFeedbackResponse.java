package com.ujjwalgarg.mainserver.entity.medicalcase.feedback;

import jakarta.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "medical_case_feedback_response")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalCaseFeedbackResponse implements Serializable {

  @Serial
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "feedback_id")
  private MedicalCaseFeedback feedback;

  @ManyToOne
  @JoinColumn(name = "question_id")
  private MedicalCaseFeedbackQuestion question;

  @Column(name = "selected_option")
  private String selectedOption;
}
