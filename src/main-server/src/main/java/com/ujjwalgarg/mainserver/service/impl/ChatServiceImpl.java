package com.ujjwalgarg.mainserver.service.impl;

import com.ujjwalgarg.mainserver.dto.ChatMessageResponseDto;
import com.ujjwalgarg.mainserver.entity.medicalcase.ChatMessage;
import com.ujjwalgarg.mainserver.entity.medicalcase.DoctorAssignment;
import com.ujjwalgarg.mainserver.mapper.ChatMessageMapper;
import com.ujjwalgarg.mainserver.repository.ChatMessageRepository;
import com.ujjwalgarg.mainserver.repository.DoctorAssignmentRepository;
import com.ujjwalgarg.mainserver.service.ChatService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

/** ChatServiceImpl */
@Service
@Slf4j(topic = "CHAT_SERVICE")
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

  private final DoctorAssignmentRepository doctorAssignmentRepository;
  private final ChatMessageRepository chatMessageRepository;
  private final ChatMessageMapper chatMessageMapper;

  @Override
  @PreAuthorize(
      "(hasRole('DOCTOR') or hasRole('PATIENT')) and"
          + " @chatServiceImpl.hasCRUDAccessToChatMessage(#doctorAssignmentId,"
          + " authentication.principal.id)")
  public List<ChatMessageResponseDto> getChatMessages(Long doctorAssignmentId) {
    log.info("Retrieving chat messages for doctor assignment ID: {}", doctorAssignmentId);
    List<ChatMessageResponseDto> messages =
        chatMessageRepository.findByDoctorAssignment_IdOrderBySentAtAsc(doctorAssignmentId).stream()
            .map(chatMessageMapper::toDto)
            .toList()
            .reversed();
    log.info(
        "Retrieved {} chat messages for doctor assignment ID: {}",
        messages.size(),
        doctorAssignmentId);
    return messages;
  }

  @Override
  @PreAuthorize(
      "(hasRole('DOCTOR') or hasRole('PATIENT')) and"
          + " @chatServiceImpl.hasCRUDAccessToChatMessage(#doctorAssignmentId,"
          + " authentication.principal.id)")
  public void saveMessage(Long doctorAssignmentId, @Valid ChatMessage chatMessage) {
    log.info("Saving chat message for doctor assignment ID: {}", doctorAssignmentId);
    DoctorAssignment da =
        doctorAssignmentRepository
            .findById(doctorAssignmentId)
            .orElseThrow(
                () -> {
                  log.error("DoctorAssignment not found for ID: {}", doctorAssignmentId);
                  return new IllegalArgumentException("DoctorAssignment not found");
                });
    chatMessage.setDoctorAssignment(da);
    chatMessageRepository.save(chatMessage);
    log.info(
        "Saved chat message with ID: {} for doctor assignment ID: {}",
        chatMessage.getId(),
        doctorAssignmentId);
  }

  public boolean hasCRUDAccessToChatMessage(Long doctorAssignmentId, Long userId) {
    log.info(
        "Checking CRUD access for user ID: {} on doctor assignment ID: {}",
        userId,
        doctorAssignmentId);
    DoctorAssignment da =
        doctorAssignmentRepository
            .findById(doctorAssignmentId)
            .orElseThrow(
                () -> {
                  log.error("Doctor Assignment not found for ID: {}", doctorAssignmentId);
                  return new IllegalArgumentException("DoctorAssignment not found");
                });
    boolean hasAccess =
        da.getMedicalCase().getPatient().getId().equals(userId)
            || da.getDoctor().getId().equals(userId);
    log.info(
        "User ID: {} has CRUD access to doctor assignment ID: {}: {}",
        userId,
        doctorAssignmentId,
        hasAccess);
    return hasAccess;
  }
}
