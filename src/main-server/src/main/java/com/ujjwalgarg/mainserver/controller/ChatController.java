package com.ujjwalgarg.mainserver.controller;

import com.ujjwalgarg.mainserver.dto.ApiResponse;
import com.ujjwalgarg.mainserver.dto.ChatMessageResponseDto;
import com.ujjwalgarg.mainserver.entity.medicalcase.ChatMessage;
import com.ujjwalgarg.mainserver.service.ChatService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** ChatController */
@RestController
@RequestMapping(
    path = "/api/{doctorAssignmentId}/chat/message",
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class ChatController {

  private final ChatService chatService;

  @GetMapping(consumes = MediaType.ALL_VALUE)
  ResponseEntity<ApiResponse<List<ChatMessageResponseDto>>> getChatMessages(
      @PathVariable("doctorAssignmentId") Long doctorAssignmentId) {
    List<ChatMessageResponseDto> chatMessages = chatService.getChatMessages(doctorAssignmentId);

    return ResponseEntity.ok(ApiResponse.success(chatMessages));
  }

  @PostMapping
  ResponseEntity<ApiResponse<Void>> saveMessage(
      @PathVariable("doctorAssignmentId") Long doctorAssignmentId,
      @RequestBody ChatMessage chatMessage) {
    chatService.saveMessage(doctorAssignmentId, chatMessage);
    return ResponseEntity.ok(ApiResponse.success(null));
  }
}
