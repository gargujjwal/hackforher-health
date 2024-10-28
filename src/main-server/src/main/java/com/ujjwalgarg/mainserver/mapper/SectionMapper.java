package com.ujjwalgarg.mainserver.mapper;

import com.ujjwalgarg.mainserver.dto.SectionCreationDto;
import com.ujjwalgarg.mainserver.dto.SectionResponseDto;
import com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.Section;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants.ComponentModel;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = ComponentModel.SPRING)
public interface SectionMapper {

  @AfterMapping
  default void linkQuestions(@MappingTarget Section section) {
    section.getQuestions().forEach(question -> question.setSection(section));
  }

  SectionResponseDto toDto(Section section);

  Section toEntity(SectionCreationDto sectionCreationDto);

}
