package com.ujjwalgarg.mainserver.mapper;

import com.ujjwalgarg.mainserver.dto.QuestionnaireReviewDto;
import com.ujjwalgarg.mainserver.dto.QuestionnaireSubmissionCreationDto;
import com.ujjwalgarg.mainserver.dto.QuestionnaireSubmissionResponseDto;
import com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.QuestionnaireSubmission;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants.ComponentModel;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = ComponentModel.SPRING)
public interface QuestionnaireSubmissionMapper {

  QuestionnaireSubmissionResponseDto toDto(QuestionnaireSubmission questionnaireSubmission);

  QuestionnaireSubmission toEntity(
      QuestionnaireSubmissionCreationDto questionnaireSubmissionCreationDto);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  QuestionnaireSubmission partialUpdate(
      QuestionnaireReviewDto questionnaireReviewDto,
      @MappingTarget QuestionnaireSubmission questionnaireSubmission);
}
