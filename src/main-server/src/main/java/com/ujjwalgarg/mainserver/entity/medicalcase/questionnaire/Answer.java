package com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire;

import jakarta.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "answer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Answer implements Serializable {

  @Serial
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "value")
  private String value;

  @ManyToOne
  @JoinColumn(name = "question_id")
  private Question question;

  @ManyToOne
  @JoinColumn(name = "questionnaire_submission_id")
  private QuestionnaireSubmission questionnaireSubmission;
}
