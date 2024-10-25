package com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire;

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
@Table(name = "questionnaire_submissions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionnaireSubmission implements Serializable {

  @Serial
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "submitted_at")
  private LocalDateTime submittedAt;

  @ManyToOne
  @JoinColumn(name = "medical_case_id")
  private MedicalCase medicalCase;

  @ManyToOne
  @JoinColumn(name = "questionnaire_id")
  private Questionnaire questionnaire;

  @OneToMany(mappedBy = "questionnaireSubmission", cascade = CascadeType.ALL)
  private List<Answer> answers = new ArrayList<>();
}
