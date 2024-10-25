package com.ujjwalgarg.mainserver.entity.medicalcase.appointment;

import jakarta.persistence.*;
import java.io.Serial;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// OnlineAppointment.java
@Entity
@DiscriminatorValue("ONLINE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OnlineAppointment extends Appointment {

  @Serial
  private static final long serialVersionUID = 1L;
  @Column(name = "meet_link")
  private String meetLink;
}
