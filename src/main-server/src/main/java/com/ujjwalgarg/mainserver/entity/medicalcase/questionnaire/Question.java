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
@Table(name = "question")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question implements Serializable {

  @Serial
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "section_id")
  private Section section;

  @Column(name = "label")
  private String label;

  @Column(name = "placeholder")
  private String placeholder;

  @Column(name = "type")
  @Enumerated(EnumType.STRING)
  private QuestionType type;
}
