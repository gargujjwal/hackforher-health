package com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire;

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
@Table(name = "questionnaires")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Questionnaire implements Serializable {

  @Serial
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "questionnaire_name")
  private String questionnaireName;

  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  @OneToMany(mappedBy = "questionnaire", cascade = CascadeType.ALL)
  private List<Section> sections = new ArrayList<>();
}
