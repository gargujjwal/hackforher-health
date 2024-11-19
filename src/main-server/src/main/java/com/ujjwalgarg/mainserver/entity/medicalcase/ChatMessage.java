package com.ujjwalgarg.mainserver.entity.medicalcase;

import com.ujjwalgarg.mainserver.entity.user.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

// ChatMessage.java
@Entity
@Table(name = "chat_messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage implements Serializable {

  @Serial
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  @Column(name = "sender_role", nullable = false)
  @Enumerated(EnumType.STRING)
  private Role senderRole;

  @NotBlank
  @Column(name = "message", nullable = false)
  private String message;

  @CreationTimestamp
  @Column(name = "sent_at")
  private LocalDateTime sentAt;

  @ManyToOne
  @JoinColumn(name = "doctor_assignment_id")
  private DoctorAssignment doctorAssignment;
}
