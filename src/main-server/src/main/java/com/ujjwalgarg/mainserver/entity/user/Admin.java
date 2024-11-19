package com.ujjwalgarg.mainserver.entity.user;

import jakarta.persistence.*;
import java.io.Serial;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "admin")
@PrimaryKeyJoinColumn(name = "user_id")
@Getter
@Setter
@AllArgsConstructor
@Builder
public class Admin extends User {

  @Serial
  private static final long serialVersionUID = 1L;
}
