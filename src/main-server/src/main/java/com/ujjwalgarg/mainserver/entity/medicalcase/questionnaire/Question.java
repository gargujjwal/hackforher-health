package com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.HashSet;
import java.util.Set;
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
  private Set<String> options = new HashSet<>();

  @ManyToOne
  @JoinColumn(name = "section_id", nullable = false)
  private Section section;
}
