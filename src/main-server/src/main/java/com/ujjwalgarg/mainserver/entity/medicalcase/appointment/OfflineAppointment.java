package com.ujjwalgarg.mainserver.entity.medicalcase.appointment;

import jakarta.persistence.*;
import java.io.Serial;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("OFFLINE")
@Getter
@Setter
@AllArgsConstructor
@Builder
public class OfflineAppointment extends Appointment {

  @Serial
  private static final long serialVersionUID = 1L;

}
