package com.ujjwalgarg.mainserver.service;

import com.ujjwalgarg.mainserver.dto.ChatMessageResponseDto;
import com.ujjwalgarg.mainserver.entity.medicalcase.ChatMessage;
import java.util.List;

/** ChatService */
public interface ChatService {

  List<ChatMessageResponseDto> getChatMessages(Long doctorAssignmentId);

  void saveMessage(Long doctorAssignmentId, ChatMessage chatMessage);
}
