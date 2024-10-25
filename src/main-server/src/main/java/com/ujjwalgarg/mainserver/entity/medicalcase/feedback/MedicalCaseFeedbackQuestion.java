package com.ujjwalgarg.mainserver.entity.medicalcase.feedback;

import com.ujjwalgarg.mainserver.entity.user.Role;
import jakarta.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "medical_case_feedback_question")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalCaseFeedbackQuestion implements Serializable {

  @Serial
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "question_text")
  private String questionText;

  @Column(name = "intended_for")
  @Enumerated(EnumType.STRING)
  private Role intendedFor;

  @Column(name = "options")
  @ElementCollection
  private Set<String> options = new HashSet<>();

  @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
  private List<MedicalCaseFeedbackResponse> responses = new ArrayList<>();
}
