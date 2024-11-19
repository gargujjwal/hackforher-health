package com.ujjwalgarg.mainserver.repository;

import com.ujjwalgarg.mainserver.entity.medicalcase.ChatMessage;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/** ChatMessageRepository */
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

  List<ChatMessage> findByDoctorAssignment_IdOrderBySentAtAsc(Long id);
}
