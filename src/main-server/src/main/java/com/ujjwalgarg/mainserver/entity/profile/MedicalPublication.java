package com.ujjwalgarg.mainserver.entity.profile;

import jakarta.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Embeddable
public class MedicalPublication implements Serializable {

  @Serial
  private static final long serialVersionUID = 1L;

  @Column(name = "publication_name")
  private String publicationName;

  @Column(name = "publication_year")
  private Integer publicationYear;

  @Column(name = "publication_url")
  private String publicationUrl;
}
