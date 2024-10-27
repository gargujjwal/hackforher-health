package com.ujjwalgarg.mainserver.mapper;

import com.ujjwalgarg.mainserver.dto.MedicalCaseCreationDto;
import com.ujjwalgarg.mainserver.dto.MedicalCaseResponseDto;
import com.ujjwalgarg.mainserver.entity.medicalcase.MedicalCase;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants.ComponentModel;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = ComponentModel.SPRING)
public interface MedicalCaseMapper {

  MedicalCase toEntity(MedicalCaseCreationDto medicalCaseCreationDto);

  MedicalCaseResponseDto toDto(MedicalCase medicalCase);

}
