package com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

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

  @Column(name = "placeholder_text", nullable = false)
  private String placeholderText;

  @Column(name = "description_text", nullable = false)
  private String descriptionText;

  @Column(name = "attribute", nullable = false)
  private String attribute;

  @Enumerated(EnumType.STRING)
  @Column(name = "type", nullable = false)
  private QuestionType type;

  @ElementCollection
  @Column(name = "options")
  private Set<String> options = new HashSet<>();

  @ToString.Exclude
  @ManyToOne
  @JoinColumn(name = "section_id", nullable = false)
  private Section section;
}
