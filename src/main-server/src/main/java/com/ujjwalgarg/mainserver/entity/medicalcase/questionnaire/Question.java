package com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "question")
@Getter
@Setter
public class Question {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "text", nullable = false, unique = true)
  private String text;

  @Enumerated(EnumType.STRING)
  @Column(name = "type", nullable = false)
  private QuestionType type;

  @ElementCollection
  @Column(name = "options")
  private List<String> options = new ArrayList<>();

  @ManyToOne
  @JoinColumn(name = "section_id", nullable = false)
  private Section section;
}
