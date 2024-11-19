package com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire;


import com.ujjwalgarg.mainserver.entity.medicalcase.DoctorAssignment;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

@Getter
@Setter
@Entity
@Table(name = "questionnaire_submission")
public class QuestionnaireSubmission {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @CreationTimestamp
  @Column(name = "submitted_at", nullable = false, updatable = false)
  private LocalDateTime submittedAt;

  @ElementCollection
  @CollectionTable(name = "questionnaire_submission_answers")
  @MapKeyColumn(name = "question_id")
  @Column(name = "answer_text")
  private Map<Long, String> questionResponses = new HashMap<>(); // Question ID -> Response

  @Embedded
  private ModelPrediction modelPrediction;

  @Enumerated(EnumType.STRING)
  private ReviewStatus reviewStatus;

  @Column(name = "doctor_notes")
  private String doctorNotes;

  @ManyToOne
  @JoinColumn(name = "doctor_assignment_id", nullable = false)
  private DoctorAssignment doctorAssignment;
}
