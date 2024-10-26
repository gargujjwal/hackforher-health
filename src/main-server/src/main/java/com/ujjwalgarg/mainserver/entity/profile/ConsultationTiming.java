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
public class ConsultationTiming implements Serializable {

  @Serial
  private static final long serialVersionUID = 1L;

  @Column(name = "day", nullable = false)
  private String day;

  @Column(name = "start_time", nullable = false)
  private String startTime;

  @Column(name = "end_time", nullable = false)
  private String endTime;
}
