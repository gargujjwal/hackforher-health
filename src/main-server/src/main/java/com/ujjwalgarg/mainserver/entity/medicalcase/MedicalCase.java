package com.ujjwalgarg.mainserver.entity.medicalcase;

import com.ujjwalgarg.mainserver.entity.medicalcase.feedback.MedicalCaseFeedback;
import com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.QuestionnaireSubmission;
import com.ujjwalgarg.mainserver.entity.user.Patient;
import jakarta.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "medical_case")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalCase implements Serializable {

  @Serial
  private static final long serialVersionUID = 1L;
  @OneToMany(mappedBy = "medicalCase", cascade = CascadeType.ALL, orphanRemoval = true)
  @OrderBy("assignedAt DESC")
  private List<DoctorAssignment> doctorAssignments = new ArrayList<>();

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "patient_id")
  private Patient patient;

  @Column(name = "case_description")
  private String caseDescription;

  @OneToMany(mappedBy = "medicalCase", cascade = CascadeType.ALL)
  private List<QuestionnaireSubmission> questionnaireSubmissions = new ArrayList<>();

  @OneToMany(mappedBy = "medicalCase", cascade = CascadeType.ALL)
  private List<MedicalCaseFeedback> feedbacks = new ArrayList<>();
}
