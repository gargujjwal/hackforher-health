package com.ujjwalgarg.mainserver.mapper;

import com.ujjwalgarg.mainserver.dto.ChatMessageResponseDto;
import com.ujjwalgarg.mainserver.entity.medicalcase.ChatMessage;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants.ComponentModel;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = ComponentModel.SPRING)
public interface ChatMessageMapper {

  ChatMessageResponseDto toDto(ChatMessage chatMessage);
}
